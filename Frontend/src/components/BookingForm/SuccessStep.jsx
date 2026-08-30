import PropTypes from 'prop-types';

function SuccessStep({ booking, onNewBooking }) {
  // Formata a data/hora que vem do backend (ex: "2026-08-30T14:30:00")
  const formatDateTime = (dataHoraString) => {
    if (!dataHoraString) return "";
    const dateObj = new Date(dataHoraString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  };

  // O backend retorna uma lista de serviços, vamos pegar o nome do primeiro
  const servicoNome = booking.servicos && booking.servicos.length > 0 
    ? booking.servicos[0].nome 
    : "Serviço não especificado";

  return (
    <div className="success-step">
      <div className="success-icon" style={{ fontSize: '3rem', color: '#4CAF50', textAlign: 'center', marginBottom: '1rem' }}>
        ✓
      </div>
      <h3 style={{ textAlign: 'center' }}>Agendamento Confirmado!</h3>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Tudo certo, <strong>{booking.clienteNome || 'Cliente'}</strong>! 
        Seu horário na unidade <strong>{booking.unidadeNome}</strong> foi reservado.
      </p>
      
      <div className="booking-details-card" style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', color: '#333' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <li>
            <strong>Código do Agendamento:</strong> #{booking.id}
          </li>
          <li>
            <strong>Barbeiro:</strong> {booking.barbeiroNome}
          </li>
          <li>
            <strong>Serviço:</strong> {servicoNome}
          </li>
          <li>
            <strong>Data e Hora:</strong> {formatDateTime(booking.dataHora)}
          </li>
          <li>
            <strong>Valor Total:</strong> R$ {booking.precoTotal?.toFixed(2).replace('.', ',')}
          </li>
          <li>
            <strong>Status:</strong> <span style={{ textTransform: 'uppercase', fontSize: '0.85rem', background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px' }}>{booking.status}</span>
          </li>
        </ul>
      </div>

      <button 
        className="booking-button" 
        onClick={onNewBooking}
        style={{ width: '100%' }}
      >
        Fazer novo agendamento
      </button>
    </div>
  );
}

SuccessStep.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
    clienteNome: PropTypes.string,
    unidadeNome: PropTypes.string,
    barbeiroNome: PropTypes.string,
    dataHora: PropTypes.string,
    precoTotal: PropTypes.number,
    status: PropTypes.string,
    servicos: PropTypes.array,
  }),
  onNewBooking: PropTypes.func.isRequired,
};

export default SuccessStep;