import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
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

          <button
            className="barber-area-link barber-area-button mobile-only"
            type="button"
            onClick={() => handleNavigate("/barbeiro/login")}
          >
            Área do barbeiro
          </button>

          <button
            className="booking-link mobile-booking-link"
            type="button"
            onClick={() => handleNavigate("/agendar")}
          >
            Agende já
          </button>
        </nav>

        <div className="header-actions">
          <button
            className="barber-area-link barber-area-button"
            type="button"
            onClick={() => handleNavigate("/barbeiro/login")}
          >
            Área do barbeiro
          </button>

          <button className="booking-link" type="button" onClick={() => handleNavigate("/agendar")}>
            Agende já
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;