import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { getAgendamentosCliente } from "../../services/bookingApi";

function MeusAgendamentos() {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarAgendamentos() {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const data = await getAgendamentosCliente(user.id);
        setAgendamentos(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarAgendamentos();
  }, [user]);

  const formatDateTime = (dataHoraString) => {
    if (!dataHoraString) return "";
    const dateObj = new Date(dataHoraString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(dateObj);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "4rem auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>Meus Agendamentos</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Acompanhe o status dos seus horários marcados.</p>

      {loading && <p>Carregando seus agendamentos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && agendamentos.length === 0 && (
        <div style={{ background: "#f9f9f9", padding: "2rem", textAlign: "center", borderRadius: "8px" }}>
          <p>Você ainda não tem nenhum agendamento.</p>
          <a href="/agendar" style={{ display: "inline-block", marginTop: "1rem", padding: "10px 20px", background: "#000", color: "#fff", textDecoration: "none", borderRadius: "5px" }}>
            Fazer um agendamento
          </a>
        </div>
      )}

      {!loading && agendamentos.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {agendamentos.map((agendamento) => (
            <div key={agendamento.id} style={{ border: "1px solid #ddd", padding: "1.5rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{formatDateTime(agendamento.dataHora)}</h3>
                <p style={{ margin: "0 0 0.2rem 0", color: "#555" }}>
                  <strong>Unidade:</strong> {agendamento.unidadeNome}
                </p>
                <p style={{ margin: "0 0 0.2rem 0", color: "#555" }}>
                  <strong>Barbeiro:</strong> {agendamento.barbeiroNome}
                </p>
                <p style={{ margin: 0, color: "#555" }}>
                  <strong>Valor:</strong> R$ {agendamento.precoTotal?.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ 
                  display: "inline-block", 
                  padding: "5px 10px", 
                  borderRadius: "20px", 
                  fontSize: "0.85rem", 
                  fontWeight: "bold",
                  background: agendamento.status === "AGENDADO" ? "#e8f5e9" : "#f5f5f5",
                  color: agendamento.status === "AGENDADO" ? "#2e7d32" : "#666"
                }}>
                  {agendamento.status || "CONFIRMADO"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MeusAgendamentos;