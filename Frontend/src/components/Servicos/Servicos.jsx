import "./Servicos.css";

// Lista de serviços exibidos.
const services = [
  {
    name: "Corte masculino",
    description: "Corte feito de acordo com o estilo do cliente, com acabamento limpo.",
    price: "R$ 35,00",
    highlight: false,
  },
  {
    name: "Barba",
    description: "Barba alinhada, desenhada e finalizada com cuidado.",
    price: "R$ 25,00",
    highlight: false,
  },
  {
    name: "Corte + barba",
    description: "Combo completo para quem quer sair com o visual pronto.",
    price: "R$ 55,00",
    highlight: true,
  },
  {
    name: "Sobrancelha",
    description: "Limpeza e alinhamento para completar o acabamento.",
    price: "R$ 15,00",
    highlight: false,
  },
  {
    name: "Americano",
    description: "Corte rápido e prático, ideal para quem tem pouco tempo.",
    price: "R$ 40,00",
    highlight: false,
  },
];

function ServiceCard({ service }) {
  return (
    <article className={`service-card ${service.highlight ? "service-card-featured" : ""}`}>
      {service.highlight && <span className="service-badge">Mais pedido</span>}

      <h3 className="service-name">{service.name}</h3>

      <p className="service-description">{service.description}</p>

      <div className="service-footer">
        <span className="service-price">{service.price}</span>

        <a className="service-link" href="#agendamento">
          Agendar
        </a>
      </div>
    </article>
  );
}

function Services() {
  return (
    <section className="services" id="servicos">
      <div className="services-container">
        <div className="services-header">
          <p className="services-eyebrow">Serviços</p>

          <h2 className="services-title">Escolha o serviço e agende seu horário.</h2>

          <p className="services-subtitle">
            Valores simples, atendimento direto e foco no acabamento.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;