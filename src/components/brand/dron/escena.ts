/**
 * Escena 3D del dron acompañante.
 *
 * El fuselaje es el modelo real del DJI Matrice 400 que opera AGS, exportado
 * del CAD oficial de DJI. El archivo original pesaba 1,29 MB con 113k
 * triángulos: acá se simplificó al 30% y se recomprimió con meshopt hasta
 * 505 KB, conservando la jerarquía de nodos (los cuatro `rotor_N` y el `body`)
 * porque los rotores se animan por separado. A los ~260px que ocupa en
 * pantalla la silueta es indistinguible del original.
 *
 * Este módulo es imperativo y vive fuera del ciclo de render de React: la
 * coreografía le pasa una postura y él dibuja. No conoce el scroll ni el DOM
 * de la página, solo su propio canvas.
 */

import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BackSide,
  Box3,
  BoxGeometry,
  CircleGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  type Intersection,
  Matrix3,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Raycaster,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

/** Colores corporativos del manual de normas gráficas (2.1). */
const NARANJA = 0xff5500;
const NAVY = 0x00263e;

const RUTA_MODELO = "/models/matrice400.glb";
const RUTA_MARCA = "/models/ags-marca.png";

/**
 * Calcomanía de marca en los dos laterales del fuselaje.
 *
 * En el equipo real (ver AGS-36.jpg) el logotipo va en el panel lateral, en
 * naranja sobre la carcasa oscura. Acá se reproduce en AMBOS costados, que es
 * como va rotulado un equipo de flota. No se pega en ningún otro sitio.
 *
 * NO es una textura del modelo: el .glb viene del CAD sin coordenadas UV, así
 * que no hay dónde mapear una imagen sobre la carcasa. Cada calcomanía es
 * geometría aparte, colocada sobre la superficie.
 *
 * OJO CON EL EJE. Los costados son las caras +Z y -Z, no +X y -X: el pod es un
 * bloque alargado a lo largo de X, así que +X y -X son el morro y la cola. El
 * panel plano del costado, medido con rayos sobre el modelo, va de x -0,2 a
 * 0,2 y de y 0,16 a 0,28.
 */
const MARCA = {
  miraX: 0,
  miraY: 0.19,
  /** Ancho en unidades del modelo. El alto sale de la proporción del PNG. */
  ancho: 0.3,
  /** Despegue de la superficie, para que no pelee en profundidad con ella. */
  despegue: 0.006,
  /** Proporción del PNG (1024 x 228). */
  proporcion: 1024 / 228,
};

export interface Postura {
  /** Alabeo en radianes: inclinación lateral al desplazarse. */
  alabeo: number;
  /** Cabeceo en radianes: morro abajo al avanzar, arriba al frenar. */
  cabeceo: number;
  /** Guiñada en radianes: hacia dónde apunta el morro. */
  guinada: number;
  /** 0 = rotores al ralentí, 1 = a régimen. */
  regimen: number;
  /** 0 = sensor apagado, 1 = inspeccionando. */
  sensor: number;
}

export interface Escena {
  render(dt: number): void;
  setPostura(p: Postura): void;
  /** Punto del canvas, en píxeles CSS, del que sale el haz del sensor. */
  puntoSensor(): { x: number; y: number };
  resize(): void;
  dispose(): void;
}

/**
 * Estudio virtual para la iluminación basada en imagen.
 *
 * Un entorno genérico da reflejos planos y el modelo se ve como un render de
 * CAD. Esto imita un set real: caja oscura, softbox cenital como luz
 * principal, panel frío de relleno y una franja naranja detrás que devuelve el
 * acento de marca en los cantos metálicos. Es lo que hace que el aluminio del
 * tren de aterrizaje tenga brillos con forma en vez de un gris uniforme.
 */
function estudio(): Scene {
  const env = new Scene();
  const panel = (w: number, h: number, color: number, intensidad: number) =>
    new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({ color: new Color(color).multiplyScalar(intensidad) }),
    );

  const sala = new Mesh(
    new BoxGeometry(26, 20, 26),
    new MeshBasicMaterial({ color: new Color(NAVY).multiplyScalar(0.35), side: BackSide }),
  );
  env.add(sala);

  const principal = panel(16, 16, 0xffffff, 2.4);
  principal.position.set(-2, 9, 2);
  principal.rotation.x = Math.PI / 2;
  env.add(principal);

  const relleno = panel(12, 10, 0x9fc4ff, 0.55);
  relleno.position.set(-9, 1, 3);
  relleno.rotation.y = Math.PI / 2;
  env.add(relleno);

  const contra = panel(14, 7, NARANJA, 1.7);
  contra.position.set(4, 1.5, -9);
  env.add(contra);

  const rebote = panel(14, 14, NAVY, 0.9);
  rebote.position.set(0, -7, 0);
  rebote.rotation.x = -Math.PI / 2;
  env.add(rebote);

  return env;
}

export async function crearEscena(
  canvas: HTMLCanvasElement,
  {
    /**
     * Techo de densidad de píxeles. El acompañante usa 2; el dron del brochure
     * baja a 1,5 en pantallas táctiles, donde el canvas es grande respecto de
     * la GPU y el coste sube al cuadrado.
     */
    dprMaximo = 2,
    /**
     * Amplitud de la flotación propia del modelo. 1 en el acompañante, donde
     * el dron nunca está quieto. 0 en la coreografía del inicio, que tiene que
     * ser función exacta del scroll: con flotación, el mismo punto de scroll
     * se vería distinto según el momento.
     */
    flotacion: amplitudFlotacion = 1,
  }: { dprMaximo?: number; flotacion?: number } = {},
): Promise<Escena> {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: window.devicePixelRatio < 2,
    powerPreference: "low-power",
  });
  renderer.setClearAlpha(0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const escena = new Scene();
  const camara = new PerspectiveCamera(30, 1, 0.1, 100);
  camara.position.set(0.6, 1.15, 7.4);
  camara.lookAt(0, 0, 0);

  // Luces directas por encima del entorno: el IBL da el volumen y estas dos
  // marcan el contorno para que el dron se separe del fondo de la página.
  const clave = new DirectionalLight(0xffffff, 1.6);
  clave.position.set(-3, 6, 4);
  escena.add(clave);

  const contra = new DirectionalLight(NARANJA, 1.1);
  contra.position.set(4, 1, -5);
  escena.add(contra);

  escena.add(new HemisphereLight(0xbcd4ff, NAVY, 0.5));

  const pmrem = new PMREMGenerator(renderer);
  const entorno = pmrem.fromScene(estudio(), 0.04);
  escena.environment = entorno.texture;

  /* ---------------------------------------------------------------- */
  /* Modelo                                                            */
  /* ---------------------------------------------------------------- */

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(RUTA_MODELO);

  const nave = new Group();
  const dron = gltf.scene;
  // 0,92 deja aire dentro del canvas para que al alabear no se recorten las
  // puntas de los brazos, y da el tamaño de acompañante que se buscaba: el
  // dron va con el lector, no protagoniza la pantalla.
  dron.scale.setScalar(0.92);
  nave.add(dron);
  escena.add(nave);

  const rotores: Object3D[] = [];
  dron.traverse((o) => {
    if (/^rotor_\d+$/.test(o.name)) rotores.push(o);

    const malla = o as Mesh;
    if (!malla.isMesh || !malla.material) return;
    const m = malla.material as MeshStandardMaterial;
    m.envMapIntensity = 1.5;

    // El CAD no traía materiales. Los cuatro que definió el pipeline de Blender
    // se afinan acá, que es donde se ve el resultado contra la luz real.
    if (m.name === "ags_shell") {
      // Composite mate. Dejarla metálica es lo que delata un render de CAD:
      // la carcasa de un Matrice es plástico técnico, no metal pintado.
      m.color.setHex(0x424a55);
      m.roughness = 0.62;
      m.metalness = 0.08;
    } else if (m.name === "ags_metal") {
      m.color.setHex(0xc2cad3);
      m.roughness = 0.22;
      m.metalness = 0.95;
    } else if (m.name === "ags_accent") {
      m.color.setHex(NARANJA);
      m.roughness = 0.35;
      m.metalness = 0.1;
      m.emissive = new Color(NARANJA);
      m.emissiveIntensity = 0.25;
    } else if (m.name === "ags_prop") {
      // Fibra de carbono: oscura, satinada, nada metálica.
      m.color.setHex(0x1c2127);
      m.roughness = 0.44;
      m.metalness = 0.15;
    }
  });

  rotores.sort((a, b) => a.name.localeCompare(b.name));
  // Giro alterno, que es lo que cancela el par en un multirrotor real.
  rotores.forEach((r, i) => {
    r.userData.dir = i % 2 === 0 ? 1 : -1;
  });

  /**
   * Disco de desenfoque sobre cada hélice. Unas palas nítidas y quietas leen
   * como dron estacionado; a régimen una hélice es un disco translúcido, y
   * esto es lo que hace que se vea volando y no posando.
   */
  const materialDisco = new MeshBasicMaterial({
    color: 0x9fb0c4,
    transparent: true,
    opacity: 0.06,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
  });
  for (const r of rotores) {
    const caja = new Box3().setFromObject(r);
    const radio = Math.max(caja.max.x - caja.min.x, caja.max.z - caja.min.z) / 2;
    const disco = new Mesh(new CircleGeometry(radio * 0.97, 36), materialDisco);
    disco.rotation.x = -Math.PI / 2;
    disco.renderOrder = 2;
    r.add(disco);
  }

  const fuselaje = dron.getObjectByName("body") ?? dron;

  /**
   * De dónde sale el haz del sensor.
   *
   * En el equipo real el sensor va en el morro del fuselaje, así que acá va
   * debajo de la panza, en el extremo delantero y centrado entre los dos
   * costados. El morro es +X: es el extremo que la coreografía orienta hacia
   * el rumbo y hacia el titular que se inspecciona, así que el haz tiene que
   * salir de ahí y no de la cola.
   *
   * La altura no está escrita a mano: se lanza un rayo hacia arriba desde
   * debajo del dron y la baliza queda 3 cm por debajo del primer impacto
   * contra la carcasa. Filtrar por material descarta el tren de aterrizaje. Si
   * el rayo no encuentra panza, se usa una altura razonable.
   */
  const anclaSensor = new Vector3(0.28, -0.07, 0);
  nave.updateMatrixWorld(true);
  const panza = new Raycaster(new Vector3(anclaSensor.x, -4, 0), new Vector3(0, 1, 0))
    .intersectObject(fuselaje, true)
    .find(
      (i) =>
        ((i.object as Mesh).material as MeshStandardMaterial)?.name === "ags_shell" &&
        i.point.y > -0.4 &&
        i.point.y < 0.3,
    );
  if (panza) anclaSensor.y = panza.point.y - 0.03;

  const materialBaliza = new MeshBasicMaterial({
    color: NARANJA,
    transparent: true,
    opacity: 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const baliza = new Mesh(new SphereGeometry(0.075, 14, 10), materialBaliza);
  baliza.position.copy(anclaSensor);
  baliza.renderOrder = 3;
  nave.add(baliza);

  /* ---------------------------------------------------------------- */
  /* Calcomanías de marca                                              */
  /* ---------------------------------------------------------------- */

  try {
    const textura = await new TextureLoader().loadAsync(RUTA_MARCA);
    // La textura es color, no datos: sin esto el naranja sale lavado, porque
    // three la interpretaría en espacio lineal.
    textura.colorSpace = SRGBColorSpace;
    textura.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const matrizNormal = new Matrix3();
    const normalDe = (i: Intersection) =>
      i
        .face!.normal.clone()
        .applyNormalMatrix(matrizNormal.getNormalMatrix(i.object.matrixWorld))
        .normalize();

    // Geometría y material se crean una vez y los comparten los dos costados:
    // son la misma calcomanía puesta dos veces, no dos objetos distintos.
    const geometriaMarca = new PlaneGeometry(MARCA.ancho, MARCA.ancho / MARCA.proporcion);
    const materialMarca = new MeshStandardMaterial({
      map: textura,
      transparent: true,
      roughness: 0.5,
      metalness: 0,
      envMapIntensity: 1.1,
      // El vinilo de marca mantiene el naranja incluso del lado en sombra. El
      // mapa emisivo hace que brillen solo las letras y no el recorte.
      emissive: new Color(NARANJA),
      emissiveMap: textura,
      emissiveIntensity: 0.15,
      // La calcomanía queda a menos de un milímetro de la carcasa: sin este
      // sesgo de profundidad las dos superficies parpadean entre sí al girar.
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
      depthWrite: false,
    });

    /**
     * DÓNDE SE PEGA: se busca la superficie, no se adivina.
     *
     * El .glb salió del pipeline con las mallas agrupadas por material y no
     * por pieza, así que no hay un nodo "fuselaje" cuya caja se pueda medir:
     * el nodo `body` abarca 1,66 x 0,95 x 2,41, o sea casi el dron entero.
     *
     * Tres filtros hacen el trabajo fino:
     *   · por subárbol, lanzando el rayo solo contra el fuselaje, porque los
     *     brazos comparten material con la carcasa;
     *   · por material, para descartar el tren de aterrizaje y los discos de
     *     hélice que cuelgan dentro de ese mismo subárbol;
     *   · por normal, porque el pod está facetado y el primer triángulo que
     *     encuentra el rayo suele ser un chaflán inclinado. Pegar ahí deja el
     *     logotipo casi de canto. Exigiendo que la cara mire hacia afuera se
     *     aterriza en el panel plano del costado.
     *
     * @param lado  +1 = costado local +Z, -1 = costado -Z.
     * @returns     true si encontró panel y pegó la marca.
     */
    function pegarMarca(lado: 1 | -1): boolean {
      const rayo = new Raycaster();
      rayo.set(new Vector3(MARCA.miraX, MARCA.miraY, lado * 4), new Vector3(0, 0, -lado));

      const impacto = rayo
        .intersectObject(fuselaje, true)
        .find(
          (i) =>
            ((i.object as Mesh).material as MeshStandardMaterial)?.name === "ags_shell" &&
            i.face != null &&
            normalDe(i).z * lado > 0.7,
        );

      if (!impacto?.face) return false;

      const calcomania = new Mesh(geometriaMarca, materialMarca);
      const normal = normalDe(impacto);
      calcomania.position.copy(impacto.point).addScaledVector(normal, MARCA.despegue);

      /**
       * Orientación por base explícita, y no con `setFromUnitVectors`.
       *
       * Alinear el eje +Z del plano con la normal deja libre el giro alrededor
       * de esa normal, así que la rotación resultante depende de por dónde
       * apunte la cara concreta que tocó el rayo: el logotipo puede salir
       * inclinado o de costado. Construyendo la base con el "arriba" del
       * mundo, el texto queda a nivel siempre.
       *
       * La base sale dextrógira en los dos costados, así que el logotipo se
       * lee en su sentido correcto mirando el dron desde fuera, a cada lado.
       * No hay que espejar la textura a mano.
       */
      const arribaMundo = new Vector3(0, 1, 0);
      const derecha = new Vector3().crossVectors(arribaMundo, normal).normalize();
      const arriba = new Vector3().crossVectors(normal, derecha).normalize();
      calcomania.quaternion.setFromRotationMatrix(
        new Matrix4().makeBasis(derecha, arriba, normal),
      );
      calcomania.renderOrder = 2;
      nave.add(calcomania);
      return true;
    }

    const pegadas = [pegarMarca(1), pegarMarca(-1)].filter(Boolean).length;
    if (pegadas === 0) throw new Error("no se encontró panel plano en ningún costado");
    if (pegadas === 1) {
      console.warn("[ags] la marca del dron solo se pudo pegar en un costado");
    }
  } catch (error) {
    // Sin la calcomanía el dron se ve igual de bien. No es motivo para dejar
    // la escena sin montar.
    console.warn("[ags] no se pudo cargar la marca del dron", error);
  }

  /* ---------------------------------------------------------------- */
  /* Estado y bucle                                                    */
  /* ---------------------------------------------------------------- */

  let postura: Postura = { alabeo: 0, cabeceo: 0, guinada: 0, regimen: 1, sensor: 0 };
  let giro = 0;
  let flotacion = 0;

  const proyeccion = new Vector3();

  function resize() {
    const ancho = canvas.clientWidth || 1;
    const alto = canvas.clientHeight || 1;
    // DPR limitado a 2: por encima de eso el coste sube al cuadrado y no se
    // distingue nada en un objeto de este tamaño.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprMaximo));
    renderer.setSize(ancho, alto, false);
    camara.aspect = ancho / alto;
    camara.updateProjectionMatrix();
  }

  resize();

  return {
    setPostura(p) {
      postura = p;
    },

    render(dt) {
      // Flotación propia: el dron nunca está perfectamente quieto, ni siquiera
      // parado. Dos senos de período distinto para que no se lea como bucle.
      flotacion += dt;
      const bobY =
        (Math.sin(flotacion * 1.7) * 0.055 + Math.sin(flotacion * 0.63) * 0.03) *
        amplitudFlotacion;
      const bobZ = Math.sin(flotacion * 1.11 + 1.2) * 0.04 * amplitudFlotacion;

      nave.position.set(0, bobY, bobZ);
      nave.rotation.set(
        postura.cabeceo + Math.sin(flotacion * 0.9) * 0.012 * amplitudFlotacion,
        postura.guinada,
        postura.alabeo,
      );

      // Las hélices giran a ~14 rad/s a régimen. Como el disco de desenfoque
      // tapa las palas, no hace falta más para que se lea como vuelo.
      giro += dt * (3 + postura.regimen * 11);
      for (const r of rotores) r.rotation.y = giro * (r.userData.dir as number);
      materialDisco.opacity = 0.03 + postura.regimen * 0.05;

      materialBaliza.opacity = postura.sensor * 0.95;
      baliza.scale.setScalar(
        1 + postura.sensor * 0.5 + Math.sin(flotacion * 9) * 0.08 * postura.sensor,
      );

      renderer.render(escena, camara);
    },

    puntoSensor() {
      // De coordenadas de mundo a píxeles CSS del canvas, para que el haz SVG
      // arranque exactamente en la baliza aunque el dron esté inclinado.
      baliza.updateWorldMatrix(true, false);
      proyeccion.setFromMatrixPosition(baliza.matrixWorld).project(camara);
      const ancho = canvas.clientWidth;
      const alto = canvas.clientHeight;
      return {
        x: (proyeccion.x * 0.5 + 0.5) * ancho,
        y: (-proyeccion.y * 0.5 + 0.5) * alto,
      };
    },

    resize,

    dispose() {
      entorno.dispose();
      pmrem.dispose();
      escena.traverse((o) => {
        const m = o as Mesh;
        if (!m.isMesh) return;
        m.geometry?.dispose();
        const mat = m.material;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
    },
  };
}
