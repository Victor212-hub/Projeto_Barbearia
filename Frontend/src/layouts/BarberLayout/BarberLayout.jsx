import { Link, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import "./BarberLayout.css";

function BarberLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/barbeiro/login");
  }

  return (
    <div className="barber-layout-shell">
      <header className="barber-layout-header">
        <div>
          <p className="barber-layout-eyebrow">Área do barbeiro</p>
          <h1 className="barber-layout-title">Painel interno</h1>
        </div>

        <nav className="barber-layout-nav" aria-label="Menu do barbeiro">
          <Link className="barber-layout-link" to="/barbeiro/painel">
            Painel
          </Link>
          <button className="barber-layout-button" type="button" onClick={handleLogout}>
            Sair
          </button>
        </nav>
      </header>

      <main className="barber-layout-main">
        <Outlet />
      </main>
    </div>
  );
}

export default BarberLayout;
