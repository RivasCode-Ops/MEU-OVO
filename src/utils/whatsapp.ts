import type { CustomerType, OrderItem } from "../types/order";
import { formatPriceBRL } from "./formatCurrency";

/**
 * Número internacional só com dígitos (ex.: 5511999999999).
 * Defina VITE_WHATSAPP_NUMBER no .env (Vite: https://vite.dev/guide/env-and-mode)
 */
function whatsappDigits(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER;
  // Fallback só para dev/local — troque no .env antes de publicar
  const fallback = "5511999999999";
  if (!raw || String(raw).trim() === "") {
    return fallback;
  }
  const digits = String(raw).replace(/\D/g, "");
  return digits.length > 0 ? digits : fallback;
}

const customerTypeLabel: Record<CustomerType, string> = {
  residencial: "Residencial",
  restaurante: "Restaurante",
  mercado: "Mercado",
  padaria: "Padaria",
};

/**
 * Pedido com vários itens — mensagem única para wa.me
 */
export function linkOrderWhatsApp(params: {
  items: OrderItem[];
  customerName: string;
  customerType: CustomerType;
  total: number;
}): string {
  const { items, customerName, customerType, total } = params;
  const nome =
    customerName.trim() || "(não informado — pode informar no chat)";
  const lines = items.map((i) => {
    const sub = i.unitPrice * i.quantity;
    return `• ${i.quantity}x ${i.name} — ${formatPriceBRL(i.unitPrice)} / un. → ${formatPriceBRL(sub)}`;
  });
  const text = [
    "Olá! Pedido pelo site BIFEDOOLHAO:",
    "",
    `Nome / estabelecimento: ${nome}`,
    `Tipo de cliente: ${customerTypeLabel[customerType]}`,
    "",
    "Itens:",
    ...lines,
    "",
    `Total estimado: ${formatPriceBRL(total)}`,
    "",
    "Pode confirmar disponibilidade, entrega e forma de pagamento?",
    "Obrigado!",
  ].join("\n");

  return `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(text)}`;
}
