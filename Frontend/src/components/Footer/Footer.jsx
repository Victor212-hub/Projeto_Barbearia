import { Link, useNavigate } from "react-router";
import "./Footer.css";

const footerLinks = [
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
    label: "Agendamento",
    href: "/agendar",
  },
  {
    label: "Localização",
    href: "/#localizacao",
  },
];

const openingHours = [
  "Terça a sexta: 09h às 19h",
  "Sábado: 09h às 17h",
  "Segunda: fechado",
];

function Footer({ businessName = "Barbearia" }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  function handleNavigation(targetPath) {
    if (targetPath.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const sectionId = targetPath.replace("/#", "");
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
      return;
    }

    navigate(targetPath);
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link className="footer-logo" to="/">
            <img
              className="brand-logo"
              src="/images/logo_nem_barber.jpg"
              alt={`Logo da ${businessName}`}
            />
            <span>{businessName}</span>
          </Link>

          <p className="footer-text">
            Corte, barba e atendimento com horário marcado para quem quer sair
            alinhado sem perder tempo.
          </p>

          <p className="footer-note">
            Agendamentos sujeitos à confirmação da barbearia.
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Navegação</h3>

          <ul className="footer-list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <button
                  className="footer-nav-link"
                  type="button"
                  onClick={() => handleNavigation(link.href)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Horários</h3>

          <ul className="footer-list">
            {openingHours.map((hour) => (
              <li key={hour} className="footer-muted">
                {hour}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Contato</h3>

          <ul className="footer-list">
            <li>
              <a
                className="footer-link"
                href="https://www.instagram.com/usuario_da_barbearia"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li className="footer-muted">(00) 00000-0000</li>
            <li className="footer-muted">R. Jaqueira do Carneiro, 175 - Bom Juá</li>
            <li className="footer-muted">Salvador, ba</li>
            <li>
              <button className="footer-booking-link" type="button" onClick={() => handleNavigation("/agendar")}>
                Solicitar agendamento
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} {businessName}. Todos os direitos reservados.
        </p>

        <p>Site institucional desenvolvido em React.</p>
      </div>
    </footer>
  );
}

export default Footer;