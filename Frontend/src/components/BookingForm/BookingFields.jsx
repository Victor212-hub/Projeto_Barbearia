function BookingFields({
  formData,
  message,
  servicos,
  barbeiros,
  isLoadingOptions,
  onChange,
  onSubmit,
}) {
  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="barbeiroId">Barbeiro</label>
        <select
          id="barbeiroId"
          name="barbeiroId"
          value={formData.barbeiroId}
          onChange={onChange}
          disabled={isLoadingOptions}
        >
          <option value="">Selecione um barbeiro</option>
          {barbeiros.map((barbeiro) => (
            <option key={barbeiro.id} value={barbeiro.id}>
              {barbeiro.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="servicoId">Serviço</label>
        <select
          id="servicoId"
          name="servicoId"
          value={formData.servicoId}
          onChange={onChange}
          disabled={isLoadingOptions}
        >
          <option value="">Selecione um serviço</option>
          {servicos.map((servico) => (
            <option key={servico.id} value={servico.id}>
              {servico.nome} — R$ {servico.preco}
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
        Confirmar agendamento
      </button>

      {message && <p className="booking-message">{message}</p>}
    </form>
  );
}

export default BookingFields;