import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";

export function App() {
  return (
    <div className="page">
      <header className="header">
        <Link to="/" className="header-brand">
          <span className="logo-mark" aria-hidden />
          <span className="logo-text">BIFEDOOLHAO</span>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
      </Routes>

      <footer className="footer">
        <small>
          © {new Date().getFullYear()} BIFEDOOLHAO · Merkus ·{" "}
          <a href="https://www.merkus.com.br/" rel="noopener noreferrer">
            merkus.com.br
          </a>
        </small>
      </footer>
    </div>
  );
}
