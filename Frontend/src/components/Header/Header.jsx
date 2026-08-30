import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // <-- Importamos o contexto de autenticação
import "./Header.css";

const navLinks = [
  {
    label: "Início",
    href: "/#inicio",
  },
  {
    label: "Serviços",
    href: "/#servicos",
  },
  {
    label: "Galeria",
    href: "/#galeria",
  },
  {
    label: "Localização",
    href: "/#localizacao",
  },
];

function Header({ businessName = "Barbearia" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Puxamos o usuário e a função de logout do contexto
  const { user, logout } = useAuth();

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleNavigate(targetPath) {
    closeMenu();
    navigate(targetPath);
  }

  function handlePublicHashNavigation(targetPath) {
    closeMenu();
    if (location.pathname === "/") {
      const element = document.getElementById(targetPath.replace("/#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    navigate(targetPath);
  }

  // Função que limpa os dados e desloga
  function handleLogout() {
    closeMenu();
    logout();
    navigate("/");
  }

  // Pega apenas o primeiro nome do usuário para não ficar um texto gigante no menu
  const primeiroNome = user?.nome ? user.nome.split(" ")[0] : "Cliente";

  return (
    <header className="site-header">
      <div className="header-container">
        <Link
          className="brand"
          to="/"
          aria-label={`${businessName} - voltar ao início`}
          onClick={closeMenu}
        >
          <img
            className="brand-logo"
            src="/images/logo_nem_barber.jpg"
            alt={`Logo da ${businessName}`}
          />
          <span className="brand-name">{businessName}</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`main-nav ${isMenuOpen ? "main-nav-open" : ""}`}
          aria-label="Menu principal"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              className="nav-link"
              type="button"
              onClick={() => handlePublicHashNavigation(link.href)}
            >
              {link.label}
            </button>
          ))}

          {/* RENDERIZAÇÃO CONDICIONAL NO MOBILE */}
          {user ? (
            <>
              <span style={{ padding: '0.8rem', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
                <button
                  onClick={() => handleNavigate("/meus-agendamentos")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 'bold', color: 'inherit' }}
                >
                  Olá, {primeiroNome}
                </button>
              </span>
              <button
                className="nav-link"
                type="button"
                onClick={handleLogout}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <button
                className="nav-link mobile-only"
                type="button"
                onClick={() => handleNavigate("/entrar")}
              >
                Entrar
              </button>
              <button
                className="barber-area-link barber-area-button mobile-only"
                type="button"
                onClick={() => handleNavigate("/barbeiro/login")}
              >
                Área do barbeiro
              </button>
            </>
          )}

          <button
            className="booking-link mobile-booking-link"
            type="button"
            onClick={() => handleNavigate("/agendar")}
          >
            Agende já
          </button>
        </nav>

        <div className="header-actions">
          {/* RENDERIZAÇÃO CONDICIONAL NO DESKTOP */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 'bold' }}><button
                onClick={() => handleNavigate("/meus-agendamentos")}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 'bold', color: 'inherit' }}
              >
                Olá, {primeiroNome}
              </button></span>
              <button
                className="barber-area-link barber-area-button"
                type="button"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <button
                className="barber-area-link barber-area-button"
                style={{ background: "transparent", color: "inherit", border: "none" }}
                type="button"
                onClick={() => handleNavigate("/entrar")}
              >
                Entrar
              </button>
              <button
                className="barber-area-link barber-area-button"
                type="button"
                onClick={() => handleNavigate("/barbeiro/login")}
              >
                Área do barbeiro
              </button>
            </>
          )}

          <button className="booking-link" type="button" onClick={() => handleNavigate("/agendar")}>
            Agende já
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;