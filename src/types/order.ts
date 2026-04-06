export type OrderItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type CustomerType = "residencial" | "restaurante" | "mercado" | "padaria";
