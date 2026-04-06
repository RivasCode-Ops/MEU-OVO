export function App() {
  return (
    <div className="page">
      <header className="header">
        <span className="logo-mark" aria-hidden />
        <span className="logo-text">Meu Ovo</span>
      </header>

      <main className="hero">
        <p className="eyebrow">Qualidade na sua mesa</p>
        <h1 className="title">Ovos frescos, do jeito que você merece.</h1>
        <p className="lede">
          Em breve: catálogo e pedidos online. Por enquanto, estamos montando a
          experiência Meu Ovo.
        </p>
        <div className="actions">
          <button type="button" className="btn btn-primary" disabled>
            Fazer pedido
          </button>
          <button type="button" className="btn btn-ghost" disabled>
            Ver produtos
          </button>
        </div>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Meu Ovo</small>
      </footer>
    </div>
  );
}
