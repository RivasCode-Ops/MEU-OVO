import type { Product } from "../types/product";
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

/**
 * Monta texto comercial para "Click to chat" (https://faq.whatsapp.com/5913398998672934)
 * e URL wa.me — toda a lógica de pedido fica aqui, fora dos componentes.
 */
export function linkPedidoWhatsApp(product: Product): string {
  const preco = formatPriceBRL(product.price);
  const text = [
    "Olá! Vim pelo site Meu Ovo e quero pedir:",
    "",
    `• ${product.name}`,
    `• ${preco} (${product.unit})`,
    `• Ref.: ${product.id}`,
    "",
    "Pode confirmar disponibilidade, entrega e forma de pagamento?",
    "Obrigado!",
  ].join("\n");

  return `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(text)}`;
}
