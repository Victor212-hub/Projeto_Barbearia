function VerificationStep({
  phone,
  verificationCode,
  message,
  shouldSaveCustomer,
  onCodeChange,
  onSaveCustomerChange,
  onSubmit,
  onBack,
}) {
  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="verification-header">
        <span className="verification-step">Etapa 2 de 2</span>

        <h3>Verifique seu telefone</h3>

        <p>
          Enviamos um código para o WhatsApp informado:
          <br />
          <strong>{phone}</strong>
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="verificationCode">Código de verificação</label>
        <input
          id="verificationCode"
          name="verificationCode"
          type="text"
          placeholder="Digite o código"
          value={verificationCode}
          onChange={onCodeChange}
        />
      </div>

      <label className="save-customer-option">
        <input
          type="checkbox"
          checked={shouldSaveCustomer}
          onChange={onSaveCustomerChange}
        />

        <span>
          Salvar meu nome e telefone neste dispositivo para próximos
          agendamentos.
        </span>
      </label>

      <button className="booking-button" type="submit">
        Confirmar agendamento
      </button>

      <button
        className="booking-secondary-button"
        type="button"
        onClick={onBack}
      >
        Voltar e corrigir dados
      </button>

      {message && <p className="booking-message">{message}</p>}
    </form>
  );
}

export default VerificationStep;