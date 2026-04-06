import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="hero">
      <p className="eyebrow">Qualidade na sua mesa</p>
      <h1 className="title">Ovos frescos, do jeito que você merece.</h1>
      <p className="lede">
        Veja as cartelas disponíveis e feche seu pedido em um toque pelo WhatsApp.
      </p>
      <div className="actions">
        <Link to="/produtos" className="btn btn-primary">
          Ver produtos
        </Link>
        <Link to="/produtos" className="btn btn-ghost">
          Fazer pedido
        </Link>
      </div>
    </main>
  );
}
