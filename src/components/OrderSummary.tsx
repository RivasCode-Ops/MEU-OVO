import type { CustomerType, OrderItem } from "../types/order";
import { formatPriceBRL } from "../utils/formatCurrency";
import { linkOrderWhatsApp } from "../utils/whatsapp";

type Props = {
  items: OrderItem[];
  total: number;
  customerName: string;
  customerType: CustomerType;
  setCustomerName: (v: string) => void;
  setCustomerType: (v: CustomerType) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearOrder: () => void;
};

const customerOptions: { value: CustomerType; label: string }[] = [
  { value: "residencial", label: "Residencial" },
  { value: "restaurante", label: "Restaurante" },
  { value: "mercado", label: "Mercado" },
  { value: "padaria", label: "Padaria" },
];

export function OrderSummary({
  items,
  total,
  customerName,
  customerType,
  setCustomerName,
  setCustomerType,
  updateQuantity,
  clearOrder,
}: Props) {
  const waHref =
    items.length > 0
      ? linkOrderWhatsApp({
          items,
          customerName,
          customerType,
          total,
        })
      : undefined;

  if (items.length === 0) {
    return (
      <section className="order-summary order-summary--empty" aria-label="Resumo do pedido">
        <p className="order-summary-empty-text">
          Nenhum item no pedido. Use &quot;Adicionar ao pedido&quot; nos produtos acima.
        </p>
      </section>
    );
  }

  return (
    <section className="order-summary" aria-label="Resumo do pedido">
      <h2 className="order-summary-title">Seu pedido</h2>
      <ul className="order-summary-list">
        {items.map((i) => (
          <li key={i.id} className="order-summary-item">
            <div className="order-summary-item-main">
              <span className="order-summary-item-name">{i.name}</span>
              <span className="order-summary-item-line">
                {formatPriceBRL(i.unitPrice * i.quantity)}
              </span>
            </div>
            <div className="order-summary-qty">
              <button
                type="button"
                className="order-summary-qty-btn"
                aria-label={`Menos ${i.name}`}
                onClick={() => updateQuantity(i.id, i.quantity - 1)}
              >
                −
              </button>
              <span className="order-summary-qty-val">{i.quantity}</span>
              <button
                type="button"
                className="order-summary-qty-btn"
                aria-label={`Mais ${i.name}`}
                onClick={() => updateQuantity(i.id, i.quantity + 1)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="order-summary-total">
        Total estimado: <strong>{formatPriceBRL(total)}</strong>
      </p>
      <label className="order-summary-label">
        Nome ou estabelecimento
        <input
          type="text"
          className="order-summary-input"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Opcional"
          autoComplete="name"
        />
      </label>
      <label className="order-summary-label">
        Tipo de cliente
        <select
          className="order-summary-select"
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value as CustomerType)}
        >
          {customerOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <div className="order-summary-actions">
        <a
          href={waHref}
          className="btn btn-primary order-summary-wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fechar pedido no WhatsApp
        </a>
        <button type="button" className="btn btn-ghost" onClick={clearOrder}>
          Limpar
        </button>
      </div>
    </section>
  );
}
