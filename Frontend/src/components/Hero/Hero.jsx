import "./Hero.css";

// Lista dos pontos fortes da barbearia.
const heroHighlights = [
  "Cortes clássicos e modernos",
  "Barba feita com cuidado",
  "Ambiente acolhedor e descontraído",
  "Atendimento com hora marcada",
];

function Hero({
  title = (
    <>
      Nem
      <br />
      Barber
    </>
  ),
  subtitle = "Uma barbearia prática para quem quer sair alinhado sem perder tempo.",
}) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow">Barbearia masculina</p>

          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>

          <div className="hero-actions">
            <a className="hero-primary-link" href="#agendamento">
              Agendar Horário
            </a>

            <a className="hero-secondary-link" href="#servicos">
              Ver serviços
            </a>
          </div>

          <ul className="hero-highlights" aria-label="Destaques da barbearia">
            {heroHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="hero-card" aria-label="Informações rápidas">
          <span className="hero-card-label">Mais pedido</span>

          <strong className="hero-card-title">Corte + barba</strong>

          <p className="hero-card-text">Combo completo para manter o visual em dia</p>

          <div className="hero-card-footer">
            <span>A partir de R$ 40,00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;