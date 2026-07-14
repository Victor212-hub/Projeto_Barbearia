import { useState } from "react";
import "./Header.css";

const navLinks = [
  {
    label: "Início",
    href: "#inicio",
  },
  {
    label: "Serviços",
    href: "#servicos",
  },
  {
    label: "Galeria",
    href: "#galeria",
  },
  {
    label: "Localização",
    href: "#localizacao",
  },
];

function Header({ businessName = "Barbearia" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <a
          className="brand"
          href="#inicio"
          aria-label={`${businessName} - voltar ao início`}
          onClick={closeMenu}
        >
          <span className="brand-mark">B</span>
          <span className="brand-name">{businessName}</span>
        </a>

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
            <a
              key={link.href}
              className="nav-link"
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          <a
            className="barber-area-link mobile-only"
            href="#area-barbeiro"
            onClick={closeMenu}
          >
            Área do barbeiro
          </a>

          <a
            className="booking-link mobile-booking-link"
            href="#agendamento"
            onClick={closeMenu}
          >
            Agende já
          </a>
        </nav>

        <div className="header-actions">
          <a className="barber-area-link" href="#area-barbeiro">
            Área do barbeiro
          </a>

          <a className="booking-link" href="#agendamento">
            Agende já
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;