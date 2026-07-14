function SuccessStep({ formData, onNewBooking }) {
    return (
        <div className="booking-form booking-success">
            <span className="success-label">Agendamento solicitado</span>

            <h3>Recebemos sua solicitação.</h3>

            <p>
                Seu telefone foi verificado e o pedido de agendamento foi registrado na
                interface. A confirmação final deve ser feita pela barbearia.
            </p>

            <div className="booking-summary">
                <p>
                    <strong>Nome:</strong> {formData.name}
                </p>
                <p>
                    <strong>Telefone:</strong> {formData.phone}
                </p>
                <p>
                    <strong>Serviço:</strong> {formData.service}
                </p>
                <p>
                    <strong>Data:</strong> {formData.date}
                </p>
                <p>
                    <strong>Horário:</strong> {formData.time}
                </p>
            </div>

            <button className="booking-button" type="button" onClick={onNewBooking}>
                Fazer novo agendamento
            </button>
        </div>
    );
}

export default SuccessStep;