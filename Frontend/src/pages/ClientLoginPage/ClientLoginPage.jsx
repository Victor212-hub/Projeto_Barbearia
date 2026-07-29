import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import "./ClientLoginPage.css";

function ClientLoginPage() {
  const { loginWithGoogleMock } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleGoogleLogin() {
    const response = await loginWithGoogleMock();

    if (response.success) {
      const from = location.state?.from?.pathname || "/cliente";
      navigate(from, { replace: true });
    }
  }

  return (
    <section className="client-login-page">
      <div className="client-login-card">
        <p className="client-login-eyebrow">Área do cliente</p>
        <h1 className="client-login-title">Entre para acessar sua conta</h1>
        <p className="client-login-subtitle">
          Este fluxo ainda é mockado para preparar a integração futura.
        </p>

        <button className="client-login-button" type="button" onClick={handleGoogleLogin}>
          Continuar com o Google — modo de desenvolvimento
        </button>

        <p className="client-login-hint">
          TODO: substituir por Google Identity Services no futuro.
        </p>
      </div>
    </section>
  );
}

export default ClientLoginPage;
