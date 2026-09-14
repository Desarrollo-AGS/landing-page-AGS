export interface Cliente {
  nombre: string;
  logo: string;
  alt: string;
}

/**
 * Los 4 logos reales listados en la sección 0.5 del spec (franja de clientes, ticket 4.1).
 */
export const clientes: Cliente[] = [
  {
    nombre: "Colbún",
    logo: "/images/logo-cliente-colbun.webp",
    alt: "Logo cliente Colbún — proyecto de inspección con drones",
  },
  {
    nombre: "Acciona",
    logo: "/images/logo-cliente-acciona.webp",
    alt: "Logo cliente Acciona — proyecto de inspección con drones",
  },
  {
    nombre: "BHP",
    logo: "/images/logo-cliente-bhp.webp",
    alt: "Logo cliente BHP — proyecto de inspección con drones",
  },
  {
    nombre: "Enel",
    logo: "/images/logo-cliente-enel.webp",
    alt: "Logo cliente Enel — proyecto de inspección con drones",
  },
];
