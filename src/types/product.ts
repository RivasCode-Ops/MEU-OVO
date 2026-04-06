/** Catálogo BIFEDOOLHAO — campos para MVP e evolução (imagens opcionais). */
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  /** URL da imagem; ausente = placeholder visual no card */
  image?: string;
  /** Texto alternativo para acessibilidade */
  imageAlt: string;
  featured: boolean;
};
