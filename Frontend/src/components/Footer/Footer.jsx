import "./Footer.css";

const footerLinks = [
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
    label: "Agendamento",
    href: "#agendamento",
  },
  {
    label: "Localização",
    href: "#localizacao",
  },
];

const openingHours = [
  "Terça a sexta: 09h às 19h",
  "Sábado: 09h às 17h",
  "Segunda: fechado",
];

function Footer({ businessName = "Barbearia" }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <a className="footer-logo" href="#inicio">
            <span className="footer-logo-mark">B</span>
            <span>{businessName}</span>
          </a>

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
                <a className="footer-link" href={link.href}>
                  {link.label}
                </a>
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
              <a className="footer-link" href="#agendamento">
                Solicitar agendamento
              </a>
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