import "./Location.css";

function Location() {
    return (
        <section className="location" id="localizacao">
            <div className="location-container">
                <div className="location-content">
                    <p className="location-eyebrow">Localização</p>

                    <h2 className="location-title">
                        Encontre a barbearia e agende seu horário.
                    </h2>

                    <p className="location-subtitle">
                        Estamos em uma região de fácil acesso. Confira o endereço, horário
                        de funcionamento e veja a localização no mapa.
                    </p>

                    <div className="location-info">
                        <div className="location-info-item">
                            <span>Endereço</span>
                            <strong>R. Jaqueira do Carneiro, 175 - Bom Juá</strong>
                        </div>

                        <div className="location-info-item">
                            <span>Horário</span>
                            <strong>Terça a domingo, das 09h às 20h</strong>
                        </div>

                        <div className="location-info-item">
                            <span>Contato</span>
                            <strong>(00) 00000-0000</strong>
                        </div>
                    </div>

                    <div className="location-actions">
                        <a className="location-primary-link" href="#agendamento">
                            Agendar horário
                        </a>

                        <a
                            className="location-secondary-link"
                            href="https://maps.app.goo.gl/cZ8m8G1CcBGfyWnT8"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ver no Google Maps
                        </a>
                    </div>
                </div>

                <div className="location-map-wrapper">
                    <iframe
                        className="location-map"
                        title="Mapa da barbearia"
                        src="https://www.google.com/maps/embed?pb=!4v1783977971955!6m8!1m7!1sQUAvpPUWSgfCLuZ0w14FPA!2m2!1d-12.94542343571086!2d-38.47155814582695!3f298.46747133562536!4f-12.239479859733649!5f0.7820865974627469"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}

export default Location;