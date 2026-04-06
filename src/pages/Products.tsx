import { products } from "../data/products";
import type { Product } from "../types/product";
import { formatPriceBRL } from "../utils/formatCurrency";
import { linkPedidoWhatsApp } from "../utils/whatsapp";

function ProductCard({ p }: { p: Product }) {
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
      <a
        href={linkPedidoWhatsApp(p)}
        className="btn btn-primary product-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Fazer pedido
      </a>
    </li>
  );
}

export function Products() {
  return (
    <main className="products">
      <p className="eyebrow">Catálogo</p>
      <h1 className="title products-title">Nossas cartelas</h1>
      <p className="lede products-lede">
        Escolha uma opção e envie o pedido pelo WhatsApp com os dados já preenchidos.
      </p>
      <ul className="product-list">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </ul>
    </main>
  );
}
