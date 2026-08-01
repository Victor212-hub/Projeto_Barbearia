import { Link } from "react-router";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-eyebrow">404</p>
        <h1 className="not-found-title">Página não encontrada</h1>
        <p className="not-found-subtitle">
          A URL acessada não existe ou foi movida.
        </p>
        <Link className="not-found-link" to="/">
          Voltar para a página inicial
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
