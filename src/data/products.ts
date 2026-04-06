import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "cartela-30-brancos",
    name: "Cartela com 30 ovos brancos",
    description: "Ovos brancos, embalagem prática para o dia a dia.",
    price: 22.9,
    unit: "cartela com 30 unidades",
    category: "Cartelas",
    imageAlt: "Cartela de ovos brancos BIFEDOOLHAO",
    featured: true,
  },
  {
    id: "cartela-30-vermelhos",
    name: "Cartela com 30 ovos vermelhos",
    description: "Ovos vermelhos, sabor e versatilidade na cozinha.",
    price: 24.9,
    unit: "cartela com 30 unidades",
    category: "Cartelas",
    imageAlt: "Cartela de ovos vermelhos BIFEDOOLHAO",
    featured: false,
  },
  {
    id: "cartela-30-caipiras",
    name: "Cartela com 30 ovos caipiras",
    description: "Ovos caipiras, qualidade que faz diferença na mesa.",
    price: 29.9,
    unit: "cartela com 30 unidades",
    category: "Cartelas",
    imageAlt: "Cartela de ovos caipiras BIFEDOOLHAO",
    featured: false,
  },
];
