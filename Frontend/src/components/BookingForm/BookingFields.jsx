const serviceOptions = [
    "Corte masculino",
    "Barba",
    "Corte + barba",
    "Sobrancelha",
];

function BookingFields({ formData, message, onChange, onSubmit }) {
    return (
        <form className="booking-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={onChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Telefone</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={onChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="service">Serviço</label>
                <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={onChange}
                >
                    <option value="">Selecione um serviço</option>

                    {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Data</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Horário</label>
                    <input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="notes">Observação</label>
                <textarea
                    id="notes"
                    name="notes"
                    placeholder="Alguma preferência ou observação?"
                    value={formData.notes}
                    onChange={onChange}
                />
            </div>

            <button className="booking-button" type="submit">
                Continuar para verificação
            </button>

            {message && <p className="booking-message">{message}</p>}
        </form>
    );
}

export default BookingFields;