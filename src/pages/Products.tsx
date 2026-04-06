import { OrderSummary } from "../components/OrderSummary";
import { products } from "../data/products";
import { useOrder } from "../hooks/useOrder";
import type { Product } from "../types/product";
import { formatPriceBRL } from "../utils/formatCurrency";

function ProductCard({
  p,
  onAdd,
}: {
  p: Product;
  onAdd: () => void;
}) {
  return (
    <li className="product-card">
      <div className="product-card-top">
        <div className="product-thumb" role="img" aria-label={p.imageAlt}>
          {p.image ? (
            <img src={p.image} alt={p.imageAlt} className="product-thumb-img" />
          ) : (
            <span className="product-thumb-placeholder" aria-hidden />
          )}
        </div>
        <div className="product-card-body">
          <div className="product-card-head">
            {p.featured ? (
              <span className="product-badge">Destaque</span>
            ) : null}
            <span className="product-category">{p.category}</span>
          </div>
          <h2 className="product-name">{p.name}</h2>
          <p className="product-desc">{p.description}</p>
          <p className="product-price">{formatPriceBRL(p.price)}</p>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary product-cta"
        onClick={onAdd}
      >
        Adicionar ao pedido
      </button>
    </li>
  );
}

export function Products() {
  const order = useOrder();

  return (
    <main className="products">
      <p className="eyebrow">Catálogo</p>
      <h1 className="title products-title">Nossas cartelas</h1>
      <p className="lede products-lede">
        Monte seu pedido abaixo e envie tudo em uma única mensagem pelo WhatsApp.
      </p>
      <ul className="product-list">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            onAdd={() =>
              order.addItem({
                id: p.id,
                name: p.name,
                unitPrice: p.price,
              })
            }
          />
        ))}
      </ul>
      <OrderSummary
        items={order.items}
        total={order.total}
        customerName={order.customerName}
        customerType={order.customerType}
        setCustomerName={order.setCustomerName}
        setCustomerType={order.setCustomerType}
        updateQuantity={order.updateQuantity}
        clearOrder={order.clearOrder}
      />
    </main>
  );
}
