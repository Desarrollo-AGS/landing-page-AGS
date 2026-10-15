import type { Diccionario } from "./tipos";

/**
 * Texto en chino tradicional. Traducción del español publicado: no agrega
 * afirmaciones que el sitio no haga ya en español.
 *
 * QUÉ NO SE TRADUCE
 * -----------------
 * Los nombres propios se quedan en su escritura original —AGS Soluciones
 * Industriales Aéreas, SmartField, SmartLayout, SmartLix, los clientes y la
 * DGAC—: son marcas y entidades, y traducirlas haría imposible reconocerlas o
 * buscarlas. Los topónimos chilenos llevan su transcripción habitual al chino
 * (安托法加斯塔 = Antofagasta, 阿塔卡馬 = Atacama) porque sí tienen una forma
 * asentada y un lector chino no puede pronunciar la castellana.
 *
 * VARIANTE
 * --------
 * Tradicional, con la terminología que se usa en Taiwán y Hong Kong y no la de
 * China continental, que es la otra escritura: 鷹架 y no 腳手架, 太陽能 y no
 * 光伏, 無人機 para dron. El `hreflang` es `zh-Hant` justamente por eso.
 */
export const zh: Diccionario = {
  ui: {
    saltarContenido: "跳至主要內容",
    irAlInicio: "AGS Soluciones，回到首頁",
    inicio: "首頁",
    abrirMenu: "開啟選單",
    cerrarMenu: "關閉選單",
    menuPrincipal: "主選單",
    menuPrincipalMovil: "主選單，行動版",
    contactanos: "聯絡我們",
    avisoProvisional: "暫定內容，待 AGS 確認。",
    rutaNavegacion: "導覽路徑",
    conjuncion: "與",
    separador: "、",
    paises: { Chile: "智利", Perú: "秘魯", Argentina: "阿根廷" },
    instagram: "AGS Soluciones 的 Instagram，另開新視窗",
    linkedin: "AGS Soluciones 的 LinkedIn，另開新視窗",
    nuevaPestana: "另開新視窗",
    nav: {
      nosotros: "關於我們",
      servicios: "服務",
      software: "軟體",
      casos: "專案實績",
      noticias: "最新消息",
      descNosotros: "我們是誰、如何作業，以及在什麼規範之下。",
      descServicios: "為能源、礦業與營建提供的七項空中作業。",
      descSoftware: "我們用來交付各項服務資料的平台。",
      verTodosServicios: "查看所有服務",
      quienesSomos: "關於我們",
      misionVision: "使命與願景",
      nuestraHistoria: "我們的歷程",
      brochure: "電子型錄",
      certificaciones: "許可與認證",
      casosDeExito: "專案實績",
    },
    footer: {
      intro: "為能源、礦業與營建提供工業空中作業。以技術與創新提升安全與效率。",
      servicios: "服務",
      empresa: "公司",
      software: "軟體",
      apoyadoPor: "支持單位",
      derechos: "版權所有",
    },
  },

  inicio: {
    portada: {
      antetitulo: "自 2015 年起的工業空中作業",
      titulo: ["我們讓高處", "成為安全的作業面"],
      bajada: "為礦業、能源與營建提供無人機熱影像檢測、測繪與清洗。不需鷹架，也不必停產。",
      ctaPrimario: "索取報價",
      ctaSecundario: "查看服務",
      altPoster: "沙漠丘陵自雲海之上升起的空拍畫面",
      ariaVideo:
        "AGS 企業形象影片：沙漠上空的飛行、工業場域、團隊在現場操作無人機，以及自家軟體平台",
      pausar: "暫停背景影片",
      reproducir: "播放背景影片",
    },
    clientes: { capitulo: "合作夥伴" },
    servicios: {
      capitulo: "服務項目",
      titulo: ["七項作業，同一個原則：", "不必有人爬上去"],
      parrafo:
        "每一項服務都取代一件今天還得靠鷹架、吊籃或停產才能完成的工作。採集只要數小時，設施照常運轉。",
      pieFoto: "具地理坐標的正射影像：測繪成果的交付物。",
      altFoto: "航空攝影測量的正射影像，含 UTM 坐標網格、等高線、地面控制點與測區邊界",
    },
    faena: {
      capitulo: "現場實錄",
      registroReal: "真實影像",
      titulo: ["礦場外牆，", "以飛行完成清洗"],
      parrafo: "運轉中工業結構物的真實作業影像。沒有人爬上去，工廠也沒有停機。",
      altFoto: "礦業設施外牆的無人機清洗作業",
      ariaVideo: "運轉中礦場的無人機外牆清洗作業影像",
      razones: [
        {
          titulo: "免除高處作業",
          detalle: "沒有人爬上去，同時免除人員墜落風險與隨之而來的許可作業流程。",
        },
        {
          titulo: "不必停產",
          detalle: "在運轉中的結構物上作業，無須搭設鷹架，也不必協調長時間停產。",
        },
        {
          titulo: "沒有進入限制",
          detalle: "可觸及鷹架與吊車無法涵蓋的表面，包含屋頂與高聳結構物。",
        },
      ],
    },
    nosotros: {
      capitulo: "關於我們",
      titulo: ["在工業場域操作無人機", "已邁入第 {anios} 年"],
      altFoto: "AGS Soluciones 團隊在辦公室企業招牌前的合影",
      extension: "今日我們的服務已延伸至{paises}，基地設於安托法加斯塔。",
      cta: "認識 AGS",
    },
    casos: {
      capitulo: "實績佐證",
      titulo: "已完成的專案",
      parrafo: "一整排客戶標誌能在第一眼建立信任。而這是它背後的內容：電廠、地點與實測面積。",
      trayectoria: {
        experiencia: { etiqueta: "無人機作業經驗", unidad: "年" },
        lavado: { etiqueta: "以無人機清洗的表面積", unidad: "m²" },
        topografia: { etiqueta: "測繪面積（公頃）" },
        termografia: { etiqueta: "太陽能電廠熱影像檢測容量", unidad: "GW" },
      },
      cta: "查看所有專案",
    },
    software: {
      capitulo: "從飛行到資料",
      titulo: ["飛行結束之處，", "正是資料開始之時"],
      parrafo:
        "我們的平台是飛行結束後仍然留下的那部分服務：每一項發現都定位在真實資產上，維護團隊直接據此作業。",
      verPlataforma: "查看平台",
      anterior: "查看上一個平台",
      siguiente: "查看下一個平台",
    },
  },

  contacto: {
    titulo: "告訴我們需要檢測什麼",
    parrafo: "我們會評估案件並提出技術與商務方案。若作業有需要，我們會安排現場勘查。",
    llamarDirecto: "直接撥打",
    whatsappNota: "開啟時訊息已預先填好",
    emailNota: "於上班時間回覆",
    region: "智利，安托法加斯塔大區",
  },

  formulario: {
    nombre: "姓名",
    empresa: "公司",
    email: "公司電子信箱",
    telefono: "電話",
    opcional: "選填",
    obligatorio: "（必填）",
    operacion: "所需作業",
    selecciona: "請選擇",
    otraOperacion: "其他作業",
    detalle: "場域說明",
    detallePlaceholder: "地點、設施類型、預估面積與時程。",
    trampa: "請勿填寫此欄位",
    enviar: "送出需求",
    enviando: "傳送中",
    enviarOtra: "再送出一筆需求",
    exitoTitulo: "已收到需求",
    exitoParrafo: "我們會評估案件並寄給您技術與商務方案。若作業有需要，我們會安排現場勘查。",
    enviarPorCorreo: "以電子郵件寄至 {email}",
    nota: "您的資料僅用於回覆這筆需求。您也可以直接來信 {email}。",
    resumenErrores: "表單中有 {n} 個欄位需要修正。",
    errores: {
      sinConfigurar:
        "此環境尚未啟用自動寄送。您的訊息沒有遺失：請用下方按鈕以電子郵件寄出，內文已預先填好。",
      envio: "需求未能送達。請稍後再試，或直接以電子郵件與我們聯絡。",
      red: "無法連線至伺服器。請檢查網路後再試一次。",
    },
    validacion: {
      nombre: "請告訴我們您的姓名。",
      nombreLargo: "這個姓名太長了。",
      empresa: "請告訴我們您的公司名稱。",
      empresaLarga: "這個公司名稱太長了。",
      email: "我們需要一個電子信箱才能回覆您。",
      emailFormato: "請檢查電子信箱的格式。",
      telefonoLargo: "這個電話號碼太長了。",
      telefonoFormato: "請檢查電話號碼的格式。",
      operacion: "請選擇所需的作業。",
      mensajeCorto: "至少告訴我們最基本的資訊：場域在哪裡、需要檢查什麼。",
      mensajeLargo: "說明內容太長了。請摘要重點，我們會再以電子郵件跟進。",
      rechazada: "需求已被拒絕。",
    },
    correo: {
      asunto: "報價需求",
      web: "網站",
      nombre: "姓名",
      empresa: "公司",
      telefono: "電話",
      noIndicado: "未填寫",
      operacion: "所需作業",
      porDefinir: "待確認",
    },
  },

  noticias: {
    titulo: "最新動態",
    verTodas: "查看所有消息",
    leer: "閱讀全文",
    tags: { noticia: "消息", comunidad: "社區參與" },
    fuenteEtiqueta: "來源",
    verOriginal: "在 {medio} 查看原文",
    publicadoPor: "由 {autor} 發布",
    sinTraducir: "本篇文章目前僅提供西班牙文版本。",
  },

  seo: {
    paginas: {
      "/": {
        titulo: "安托法加斯塔工業無人機服務：礦業、能源與營建",
        descripcion:
          "AGS Soluciones 在智利、秘魯與阿根廷操作工業無人機：太陽能電廠熱影像檢測、輸電線路檢測、測繪與航空攝影測量、外牆清洗與工業設施檢測。",
      },
      "/servicios": {
        titulo: "礦業、能源與營建的無人機服務",
        descripcion:
          "七項工業空中作業：太陽能電廠熱影像檢測、輸電線路檢測、測繪與航空攝影測量、外牆清洗、工業設施檢測、堆浸場灑水控制與影像製作。",
      },
      "/casos": {
        titulo: "已完成專案與成功案例",
        descripcion:
          "礦業與能源領域的成功案例：在智利完成的太陽能電廠熱影像檢測、輸電線路檢視與地形測繪。",
      },
      "/nosotros": {
        titulo: "關於我們：我們是誰、使命、願景與歷程",
        descripcion:
          "AGS Soluciones 自 {anio} 年起從安托法加斯塔出發操作工業無人機，服務智利、秘魯與阿根廷的礦業、能源與營建產業。",
      },
      "/nosotros/brochure": {
        titulo: "AGS 2026 電子型錄",
        descripcion:
          "翻閱 AGS Soluciones 的商務型錄：作業能力、無人機服務、數位平台，以及選擇我們的理由。",
      },
      "/nosotros/certificaciones": {
        titulo: "許可、法規與認證",
        descripcion:
          "AGS Soluciones 在智利飛行所依循的法規架構，符合 DGAC 現行版本的 DAN 151。",
      },
      "/noticias": {
        titulo: "最新消息與動態",
        descripcion:
          "AGS Soluciones 的動態：檢測專案、新服務、展會參與，以及公司在安托法加斯塔的活動。",
      },
      "/contacto": {
        titulo: "聯絡與報價",
        descripcion: "在安托法加斯塔索取無人機服務報價。電話 {telefono}，電子信箱 {email}。",
      },
    },
    servicioTitulo: "{servicio}（無人機作業）",
    softwareTitulo: "{producto}，服務背後的平台",
  },

  servicios: {
    "inspecciones-fotovoltaicas": {
      titulo: "太陽能電廠檢測",
      tituloCorto: "太陽能電廠檢測",
      resumen: "快速、精確、可直接執行。",
      descripcion:
        "我們是智利太陽能電廠熱影像檢測的領導者。我們處理熱影像資料，辨識、分類並排序全部異常，並將每一項指派到數位孿生上。我們提供快速且可信的報告、細緻的異常分級、標示精確位置的互動式地理空間平台，以及既往檢測的數位化，讓您握有完整的歷史紀錄。",
      entregables: [
        "偵測到的異常全數完成分類與優先排序",
        "地理空間數位孿生，標示每一項發現的精確位置",
        "各次檢測之間可相互比對的歷史紀錄",
      ],
      imagenAlt: "AGS 無人機飛越太陽能電廠的模組陣列，太陽自面板後方升起",
    },
    "inspeccion-lineas-electricas": {
      titulo: "輸電線路檢測",
      tituloCorto: "輸電線路檢測",
      resumen: "預先掌握風險，維持供電不中斷。",
      descripcion:
        "我們讓電力設施維持最佳狀態且不中斷運轉。我們提供可偵測熱點的熱影像檢測、可辨識損傷與鏽蝕的目視檢測、可繪製植生與干擾風險的 LiDAR 雷射掃描、可偵測磨耗與斷股的導線檢測，以及附具體建議的詳細報告。",
      entregables: [
        "逐塔逐檔的熱點熱影像",
        "含植生與干擾風險的 LiDAR 點雲",
        "依嚴重程度排序建議事項的報告",
      ],
      imagenAlt: "AGS 無人機檢測高壓電塔的礙子，線路沿山谷延伸",
    },
    "topografia-aerofotogrametria": {
      titulo: "無人機測繪與航空攝影測量",
      tituloCorto: "測繪與航空攝影測量",
      resumen: "快速、精確、安全。",
      descripcion:
        "我們以高解析度相機產製精確的 3D 模型與地形圖。我們提供優於傳統方法的公分級精度、以小時而非數日或數週完成的資料採集、可進入偏遠或難以到達的地形，以及供專案規劃使用的 3D 視覺化與進階互動分析。",
      entregables: [
        "測區的 3D 模型與具地理坐標的正射影像",
        "公分級精度的等高線與堆料方量",
        "以小時交付，而非數日或數週",
      ],
      imagenAlt: "AGS 無人機飛越露天採石場，可見階段與運輸坡道",
    },
    "limpieza-fachadas-maquinarias": {
      titulo: "無人機外牆與機具清洗",
      tituloCorto: "外牆與機具清洗",
      resumen: "快速、精確、安全。",
      descripcion:
        "我們以先進技術清除污垢、粉塵與污染物，安全地完成外牆清洗，免除搭設鷹架或人員懸吊的需求。其效益包含：降低風險以提升安全、縮短停機時間以提高作業效率，以及可處理傳統方法無法觸及的區域。",
      entregables: [
        "作業不需鷹架、不需人員懸吊，也不必停產",
        "施作前後的影像紀錄",
        "可觸及吊車與鷹架無法涵蓋的表面",
      ],
      imagenAlt: "AGS 無人機以高壓水柱清洗工業廠房外牆，供水管線垂掛於機身下方",
    },
    "inspeccion-instalaciones-industriales": {
      titulo: "工業設施檢測",
      tituloCorto: "工業設施檢測",
      resumen: "快速、精確、安全。",
      descripcion:
        "我們在不讓人員暴露於危險的情況下完成檢測，並具備在侷限空間與高聳結構物中飛行的能力。我們擷取高解析度影像與影片，呈現損傷、撕裂與鏽蝕。其效益包含無與倫比的精確度、縮短停機時間的效率與速度，以及可進入傳統方法無法到達或具危險性的區域。",
      entregables: [
        "可在侷限空間與高聳結構物中飛行",
        "損傷、撕裂與鏽蝕的高解析度紀錄",
        "縮短設施的停機時間",
      ],
      imagenAlt: "裝有螺旋槳護罩的 AGS 無人機，在工業廠房內近距離檢測金屬槽體的鏽蝕",
    },
    "control-riego-pilas-lixiviacion": {
      titulo: "堆浸場灑水分布控制",
      tituloCorto: "堆浸場灑水控制",
      resumen: "精確的資料，快速、安全，成本更低。",
      descripcion:
        "我們以搭載高解析度相機與感測器的無人機擷取堆浸場的詳細資料。我們產製灑水分布圖、含效率分析的客製化報告，並與既有的控制系統整合。其效益包含減少資源浪費、提升灑水均勻度以提高金屬回收率，以及節省水與化學藥劑的成本。",
      entregables: [
        "涵蓋整座堆浸場的灑水分布圖",
        "效率分析與既有控制系統的整合",
        "修正灑水不足區域所節省的水與藥劑",
      ],
      imagenAlt: "黃昏時分，AGS 無人機飛越堆浸場，可見灑水管線與堆體階段",
    },
    "produccion-audiovisual": {
      titulo: "影像製作",
      tituloCorto: "影像製作",
      resumen: "能傳達客戶核心訊息的企業影像內容。",
      descripcion:
        "我們專精於製作具影響力的影像內容。我們提供能呈現企業形象的宣傳影片，可用於簡報、行銷與內部溝通。我們的優勢在於專業經驗、創意發想與對品質的堅持。服務包含比傳統方式更精準的影像擷取、以小時而非數日或數週完成的資料採集，以及可進入偏遠或限制進入的區域。",
      entregables: [
        "可用於簡報與內部溝通的企業影片成品",
        "偏遠或限制進入區域的空拍畫面",
        "可直接用於行銷的高解析度素材",
      ],
      imagenAlt: "黃昏時分，AGS 操作員手持遙控器操作無人機，面向礦場",
    },
  },

  industrias: {
    Energía: "能源",
    Minería: "礦業",
    Industria: "工業",
    Construcción: "營建",
    Multimedia: "多媒體",
  },

  casos: {
    servicios: {
      "acciona-pfv-el-romero": "太陽能電廠熱影像檢測",
      "acciona-pfv-malgarida": "太陽能電廠熱影像檢測",
      "colbun-pfv-diego-de-almagro": "太陽能電廠熱影像檢測",
      "enel-pfv-finis-terrae": "太陽能電廠熱影像檢測",
      "minera-guanaco-topografia": "測繪與航空攝影測量",
      "antofagasta-minerals-topografia": "航空攝影測量",
      "minera-guanaco-ll-ee": "輸電線路檢測",
      "enel-pfv-pampa-norte": "太陽能電廠熱影像檢測",
      "enel-pfv-lalackama": "太陽能電廠熱影像檢測",
      "acciona-pfv-usya": "太陽能電廠熱影像檢測",
      "acciona-pfv-almeyda": "太陽能電廠熱影像檢測",
      "colbun-pfv-ovejeria": "太陽能電廠熱影像檢測",
      "colbun-pfv-machicura": "太陽能電廠熱影像檢測",
      "enel-pfv-la-silla": "太陽能電廠熱影像檢測",
      "sqm-topografia-x6-sectores": "航空攝影測量",
      "minera-guanaco-modelamiento-3d": "3D 建模",
      "norte-aridos-cubicacion-de-stock": "測繪與堆料方量計算",
      "minera-valle-central-ll-ee": "輸電線路檢測",
      "megatraction-modelado-3d": "3D 建模",
    },
    fichas: {
      "acciona-pfv-el-romero": {
        planta: "El Romero 太陽能電廠",
        ubicacion: "阿塔卡馬沙漠",
        nota: "拉丁美洲最大的太陽能電廠，供應 24 萬戶家庭用電。",
      },
      "acciona-pfv-malgarida": {
        planta: "Malgarida 太陽能電廠",
        ubicacion: "阿塔卡馬大區，Diego de Almagro",
        nota: "供應 28 萬戶家庭用電，每年減少 51.2 萬公噸二氧化碳。",
      },
      "colbun-pfv-diego-de-almagro": {
        planta: "Diego de Almagro 太陽能電廠",
        ubicacion: "阿塔卡馬大區，Diego de Almagro",
        nota: "連續第二年在這座太陽能園區作業。",
      },
      "enel-pfv-finis-terrae": {
        planta: "Finis Terrae 太陽能電廠",
        ubicacion: "安托法加斯塔大區，María Elena",
        nota: "年發電量超過 400 GWh。",
      },
      "minera-guanaco-topografia": {
        planta: "航空攝影測量",
        ubicacion: "安托法加斯塔大區，Taltal",
        nota: "金銀礦業者，位於安托法加斯塔東南方 220 公里。",
      },
      "antofagasta-minerals-topografia": {
        planta: "Polo Sur 專案",
        ubicacion: "安托法加斯塔",
        nota: "探勘專案，完成 520 公頃的測繪。",
      },
      "minera-guanaco-ll-ee": {
        planta: "33 kV 輸電線路",
        ubicacion: "安托法加斯塔大區，Taltal",
        nota: "涵蓋 34 平方公里範圍的電力設施評估。",
        cifraAlterna: { valor: "301", unidad: "座檢測電塔" },
      },
      "enel-pfv-pampa-norte": {
        planta: "Pampa Norte 太陽能電廠",
        ubicacion: "安托法加斯塔大區，Taltal",
        nota: "25.8 萬片模組，足以供應約 10 萬戶家庭用電。",
      },
      "enel-pfv-lalackama": {
        planta: "Lalackama 太陽能電廠",
        ubicacion: "安托法加斯塔大區，Taltal",
        nota: "年發電量 160 GWh，約可供應 9 萬戶家庭。",
      },
      "acciona-pfv-usya": {
        planta: "Usya 太陽能電廠",
        ubicacion: "安托法加斯塔大區，Calama",
        nota: "Acciona 第三大的太陽能電廠，共 187,200 片模組。",
      },
      "acciona-pfv-almeyda": {
        planta: "Almeyda 太陽能電廠",
        ubicacion: "阿塔卡馬大區，Diego de Almagro",
        nota: "安裝 187,620 片模組，連續第四年合作。",
      },
      "colbun-pfv-ovejeria": {
        planta: "Ovejería 太陽能電廠",
        ubicacion: "首都大區，Tiltil",
        nota: "位於 Tiltil 以東 15 公里處。",
      },
      "colbun-pfv-machicura": {
        planta: "Machicura 太陽能電廠",
        ubicacion: "馬烏萊大區，Colbún",
        nota: "電廠位於 Colbún 鎮外 6 公里處。",
      },
      "enel-pfv-la-silla": {
        planta: "La Silla 太陽能電廠",
        ubicacion: "科金博大區，La Higuera",
        nota: "這座設施同時使用 3 種不同型號的太陽能模組。",
      },
      "sqm-topografia-x6-sectores": {
        planta: "6 個區域的測繪",
        ubicacion: "安托法加斯塔大區，María Elena",
        nota: "全球硝酸鉀生產的領導者，距安托法加斯塔 205 公里。",
      },
      "minera-guanaco-modelamiento-3d": {
        planta: "工業防護周界",
        ubicacion: "安托法加斯塔大區，Taltal",
        nota: "周界圍籬出入口與缺口的脆弱性評估。",
      },
      "norte-aridos-cubicacion-de-stock": {
        planta: "堆料方量計算",
        ubicacion: "安托法加斯塔",
        nota: "砂石業者，位於安托法加斯塔東南方 40 公里。",
      },
      "minera-valle-central-ll-ee": {
        planta: "154 kV 輸電線路",
        ubicacion: "奧希金斯大區，Requínoa",
        nota: "每日處理 13.5 萬公噸新鮮尾礦的作業。",
        cifraAlterna: { valor: "3.4", unidad: "公里線路" },
      },
      "megatraction-modelado-3d": {
        planta: "Radomiro Tomic 斗輪挖掘機",
        ubicacion: "安托法加斯塔大區，Calama",
        nota: "南美洲最大斗輪挖掘機的 3D 模型，位於露天礦坑。",
        cifraAlterna: { valor: "3,000", unidad: "公尺海拔" },
      },
    },
    mw: "MW",
    hectareas: "公頃",
  },

  software: {
    smartfield: {
      resuelve: "用於礦業作業檢測與發現事項智慧管理的地理空間平台。",
      descripcion:
        "它把高解析度正射影像、區域視覺化與觀察事項的追蹤整合在同一個環境中。每一項發現都附有影像、位置、日期、嚴重程度與負責人，並依地理區劃推進直到結案。",
      claves: [
        "在具地理坐標的正射影像上呈現發現事項地圖",
        "依地理區劃指派，並追蹤至結案",
        "供業主與承攬商使用的指標面板與報表",
      ],
      capturaAlt: "SmartField 介面：地圖、發現事項、儀表板與管理選單，旁邊是作業區域的空拍影像",
      dispositivos: {
        escritorioAlt:
          "SmartField 桌面版：正射影像上的場域地圖，左側為地圖、發現事項、儀表板與管理選單，以及設施選擇器",
        movilAlt:
          "SmartField 手機版：同一張場域地圖以全螢幕呈現，含檢視選擇器與地圖、發現事項、指標與個人檔案的工具列",
      },
    },
    smartlayout: {
      resuelve: "在單一平台上設計、控管並發布場域的作業配置圖。",
      descripcion:
        "配置圖直接以圖層方式繪製在作業現場具地理坐標的正射影像上。每一次變更都須經審查與核准才會發布，並記錄作者、審查者與事由。現行版本透過 QR 碼發送，可在現場以手機查閱，甚至能以 GPS 定位使用者，顯示其所在位置的配置圖。",
      claves: [
        "單一官方版本，現場即時生效",
        "完整的歷史紀錄與版本比對",
        "礦業、工業廠區、能源與港口",
      ],
      capturaAlt:
        "SmartLayout 編輯器：在場域正射影像上繪製的作業配置圖，左側為隔離、通行、緊急、機具與風險的圖層面板",
      dispositivos: {
        escritorioAlt:
          "SmartLayout 桌面版：編輯器含圖層面板，正射影像上繪製作業配置圖，並附圖例與文件頁尾",
        movilAlt: "SmartLayout 手機版：初級破碎區的現行配置圖，以及可收合的圖層面板",
        qrAlt: "可在行動裝置上開啟現行配置圖版本的 QR 碼",
        qrPie: "掃描 · 查看現行版本",
      },
    },
    smartlix: {
      resuelve: "在單一平台上監看、分析並優化堆浸場的灑水作業。",
      descripcion:
        "SmartLix 整合灑水區域與模組的視覺化、熱影像分析、正射影像與 3D 模型，協助現場做出更快、更精準的作業決策。",
      claves: [
        "熱影像圖與分區控制",
        "2D 檢視器、3D 檢視器與模組追蹤",
        "輔助聊天機器人與作業可追溯性",
      ],
      capturaAlt: "SmartLix 介面：堆浸場的熱影像監看，模組網格依溫度著色並附溫標",
      dispositivos: {
        escritorioAlt:
          "SmartLix 桌面版：堆浸場北區的熱影像監看，模組網格依溫度著色，並含色階與 RGB、熱影像、疊合三種檢視的切換",
      },
    },
  },

  nosotros: {
    extracto:
      "AGS Soluciones Industriales Aéreas 是一家位於安托法加斯塔的公司，專精於為礦業、能源與營建等產業提供空中服務與無人機資料智能。",
    quienesSomos:
      "AGS Soluciones Industriales Aéreas 是一家位於安托法加斯塔的公司，專精於為礦業、能源與營建等產業提供空中服務與無人機資料智能。憑藉在智利北部超過 9 年的經驗，我們把技術檢測與現場採集轉化為端到端的解決方案，為客戶的安全與作業效率帶來最大效益。",
    mision:
      "透過無人機技術、軟體開發與人工智慧，提供整合性的空中與工業解決方案，優化作業連續性、降低人員風險，並把現場資料轉化為高價值的策略決策。",
    vision:
      "成為智利在工業檢測、維護與資料分析領域的領導企業與端到端技術夥伴標竿，以持續創新、流程自動化，以及對作業安全的正面影響著稱。",
    metodologia:
      "我們所有的分析與資料處理流程，都以最新世代的無人機技術與專業軟體完成。這些成果由各項服務的專業人員背書與審核，確保交付給客戶的結果既精確又安全。",
    ventajas: [
      {
        titulo: "經驗與資歷",
        detalle: "超過 9 年為礦業、能源與工業部門提供技術解決方案。",
      },
      {
        titulo: "應用創新",
        detalle: "我們結合空中技術、人工智慧與自研軟體，解決真實的難題。",
      },
      {
        titulo: "對卓越的堅持",
        detalle: "每一個專案都以技術嚴謹、注重細節與結果可靠為出發點。",
      },
    ],
    historia: {
      "2015": {
        titulo: "AGS Soluciones 成立",
        detalle:
          "AGS Soluciones Industriales Aéreas 成立於智利北部礦業核心的安托法加斯塔，將無人機技術帶進工業現場。",
      },
      "2019": {
        titulo: "新的階段：整合性解決方案",
        detalle:
          "公司邁入新的階段，聚焦於運用無人飛行技術，為能源與礦業部門提供整合性的解決方案。",
      },
      "2025": {
        titulo: "創新企業獎",
        detalle:
          "AGS 於 Escondida | BHP 推動的 Proveedores & Futuro 計畫中，獲頒創新企業類別獎項。",
      },
      "2026": {
        titulo: "入選 Open Aster",
        detalle:
          "AGS 自六個國家、超過 600 件申請中脫穎而出，入選 Escondida | BHP 的 Open Aster 第八屆，將解決方案帶進現場。",
      },
    },
    altEquipo: "AGS Soluciones 三位團隊成員在頒獎典禮上手持 Escondida、BHP 的 Open Aster 獎座",
  },

  certificaciones: {
    edicion: "第 4 版",
    vigenteDesde: "2026 年 3 月",
    entidad: "智利民航總局（Dirección General de Aeronáutica Civil, DGAC）",
    descripcion:
      "規範遙控航空器操作的智利法規。第 4 版以風險管理模式取代舊有架構，授權效期更短，並依作業類別訂定要求。",
  },

  paginas: {
    migas: {
      "/servicios": "服務",
      "/casos": "專案實績",
      "/nosotros": "關於我們",
      "/nosotros/brochure": "電子型錄",
      "/nosotros/certificaciones": "認證",
      "/noticias": "最新消息",
      "/contacto": "聯絡",
    },

    servicios: {
      titulo: "以空中技術打造更聰明的產業",
      bajada:
        "我們運用無人機、先進感測器與專業技術，把礦業、能源與工業的作業難題轉化為精準而高效的解決方案。",
      todos: "全部",
      filtrarPor: "依產業篩選服務",
      contador: "{n} 項服務適用於您的作業",
      contadorUno: "{n} 項服務適用於您的作業",
      porSector: "依產業分類的專業解決方案",
      conocerServicio: "了解這項服務",
      sinResultados: "這個產業目前沒有對應的服務。",
    },
    servicioDetalle: {
      tituloSeo: "{servicio}（無人機作業）",
      queSeEntrega: "交付內容",
      industrias: "適用產業",
      proyectosConEste: "以這項服務完成的專案",
      otrosServicios: "其他服務",
    },

    casos: {
      titulo: "成功案例",
      bajada: "電廠、地點與實測面積。所列數字皆為各專案已公開的資料。",
      confian: "合作夥伴",
      grupos: {
        "inspecciones-fotovoltaicas": "太陽能電廠熱影像檢測",
        "topografia-aerofotogrametria": "測繪、攝影測量與 3D 建模",
        "inspeccion-lineas-electricas": "輸電線路檢測",
      },
    },

    software: {
      irAlSitio: "前往 {producto} 官方網站",
    },

    noticias: {
      titulo: "最新消息",
      bajada: "檢測專案、新服務、公司動態，以及我們與安托法加斯塔的連結。",
      vacioTitulo: "目前尚未發布消息",
      vacioTexto:
        "第一則消息發布後會出現在這裡，首頁也會同步顯示。在此之前，我們已完成的工作都在專案實績裡。",
    },
    noticiaDetalle: { volver: "回到最新消息" },

    contacto: {
      titulo: "告訴我們需要檢測什麼",
      bajada: "我們會評估案件並提出技術與商務方案。若作業有需要，我們會安排現場勘查。",
    },

    nosotros: {
      titulo: "{anios} 年來，我們讓高處成為安全的作業面",
      bajada: "自安托法加斯塔出發，服務範圍涵蓋{paises}。",
      secciones: {
        quienesSomos: "關於我們",
        mision: "使命與願景",
        historia: "我們的歷程",
        brochure: "電子型錄",
        certificaciones: "認證",
      },
      navSecciones: "本頁章節",
      quienesSomos: "關於我們",
      mision: "使命",
      vision: "願景",
      misionAhora: "我們做的事",
      visionHacia: "我們要去的方向",
      misionResultados: ["優化作業連續性", "降低人員風險", "把現場資料轉化為決策"],
      visionRasgos: ["持續創新", "流程自動化", "作業安全"],
      metodologiaTitulo: "我們如何處理資訊",
      metodologiaPasos: ["無人機採集", "專業人員"],
      historiaTitulo: "我們的歷程",
      brochureEtiqueta: "電子型錄",
      brochurePresentacion: "商務簡介",
      brochureTitulo: "AGS 2026 電子型錄",
      brochureParrafo:
        "作業能力、服務、平台，以及選擇 AGS 的理由，整理成一本可在網頁上翻閱的小冊子。",
      brochureCta: "翻閱電子型錄",
      certTitulo: "許可、法規與認證",
      certParrafo: "AGS 作業所依循的法規架構，以及支持它的文件。",
      certCta: "查看詳細內容",
    },

    brochure: {
      bajada: "AGS 的商務簡介：作業能力、服務、平台，以及選擇我們的理由。",
      instruccion: "拖曳頁角或使用方向鍵翻頁。",
      pagina: "頁",
      anterior: "上一頁",
      siguiente: "下一頁",
      ampliar: "放大",
      pantallaCompleta: "全螢幕",
      salirPantallaCompleta: "離開全螢幕",
      cerrar: "關閉",
      irAPagina: "前往第 {n} 頁：{titulo}",
      irAContratapa: "前往第 {n} 頁：封底",
      ampliada: "{titulo}，第 {pagina} 頁放大檢視",
      contratapa: "封底",
      paginas: {
        "1": {
          titulo: "封面",
          alt: "型錄封面：AGS Soluciones Industriales Aéreas。作業效率、零風險，以及即時的現場資訊。",
        },
        "2": {
          titulo: "關於我們",
          alt: "關於我們：一家智利公司，專精於為礦業、能源與營建提供空中服務與無人機資料智能。",
        },
        "3": {
          titulo: "作業能力",
          alt: "我們的作業能力：現場服務、在數位平台上交付的資料智能，以及 HSEC 安全管理。",
        },
        "4": {
          titulo: "服務",
          alt: "服務：航空測繪與攝影測量、太陽能電廠熱影像與目視檢測、輸電線路檢測、工業設施檢測，以及無人機外牆與機具清洗。",
        },
        "5": {
          titulo: "軟體",
          alt: "軟體與差異化優勢：Smart Field、Smart Layout 與 Smart Inspections 平台。",
        },
        "6": {
          titulo: "為什麼選擇 AGS",
          alt: "為什麼選擇 AGS：在地服務、法規遵循、作業安全與持續創新。",
        },
        "7": {
          titulo: "聯絡",
          alt: "型錄最後一頁：邀請安排試作，並附聯絡資訊。",
        },
      },
    },

    certificaciones: {
      titulo: "許可、法規與認證",
      bajada: "AGS 作業所依循的架構，以及每一次飛行背後的文件。",
      aocAntetitulo: "作業許可",
      aocTitulo: "我們持有 DGAC 認可的 AOC",
      aocParrafo:
        "AGS Soluciones 持有航空業者證書（AOC），並登記於智利民航總局（DGAC）公開的遙控航空器業者名冊中。這是一家公司在智利以遙控航空器執行營業性空中作業所需的許可。",
      aocVerificar: "前往 DGAC 名冊查證",
      aocInsigniaAlt: "智利 DGAC 認證 AGS Soluciones 為 AOC 航空業者的標章",
      aocLogoAlt: "智利民航總局標誌",
      aocFotoAlt: "AGS Soluciones 的工業無人機在現場，機身上可見註冊編號與公司標誌",
      normaTitulo: "現行法規",
      normaParrafo:
        "智利境內所有無人機作業皆受 DGAC 法規規範。任何進入現場的供應商都必須證明其合規。",
      entidad: "主管機關",
      vigenteDesde: "生效日期",
      docTitulo: "AGS 文件",
      tabla: ["文件", "核發機關", "編號", "有效期限"],
      indefinida: "無期限",
    },

    noEncontrado: {
      titulo: "這個頁面不存在",
      parrafo: "連結可能隨著新網站改版而異動。以下是您可能想找的章節。",
      ctaServicios: "查看服務",
      ctaContacto: "聯絡我們",
      todosLosServicios: "所有服務",
    },
  },
};
