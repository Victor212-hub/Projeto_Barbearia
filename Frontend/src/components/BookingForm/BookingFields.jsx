function BookingFields({
    formData,
    message,
    servicos,
    unidades,
    barbeiros,
    isLoadingOption,
    onChange,
    onSubmit,
}) {
    return (
        <form className="booking-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="unidadeId">Unidade</label>
                <select
                    id="unidadeId"
                    name="unidadeId"
                    value={formData.unidadeId}
                    onChange={onChange}
                    disabled={isLoadingOption}
                >
                    <option value="">Selecione uma unidade</option>
                {unidades.map((unidade) => (
                    <option key={unidade.id} value={unidade.id}>
                        {unidade.nome}
                    </option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="barbeiroId">Barbeiro</label>
            <select 
                id="barbeiroId"
                name="barbeiroId"
                value={formData.barbeiroId}
                onChange={onChange}
                disabled={isLoadingOption || !formData.unidadeId}
            >
                <option value="">
                    {formData.unidadeId ? "Selecione um barbeiro" : "Selecione a unidade primeiro"}
                </option>
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
                disabled={isLoadingOption}
            >
                <option value="">Selecione um serviço</option>
                {servicos.map((servico) => (
                    <option key={servico.id} value={servico.id}>
                        {servico.nome} - R$ {servico.preco}
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