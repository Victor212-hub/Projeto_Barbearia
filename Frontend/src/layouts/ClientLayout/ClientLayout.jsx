import { Link, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import "./ClientLayout.css";

function ClientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/entrar");
  }

  return (
    <div className="client-layout-shell">
      <header className="client-layout-header">
        <div>
          <p className="client-layout-eyebrow">Área do cliente</p>
          <h1 className="client-layout-title">Barbearia</h1>
        </div>

        <nav className="client-layout-nav" aria-label="Menu do cliente">
          <Link className="client-layout-link" to="/cliente">
            Minha conta
          </Link>
          <Link className="client-layout-link" to="/agendar">
            Novo agendamento
          </Link>
          <button className="client-layout-button" type="button" onClick={handleLogout}>
            Sair
          </button>
        </nav>
      </header>

      <main className="client-layout-main">
        <p className="client-layout-user">Olá, {user?.name || "cliente"}.</p>
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;
