import { useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { clientMockProfile } from "../../mocks/clientMock";
import "./ClientProfilePage.css";

function ClientProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profile = user || clientMockProfile;

  async function handleLogout() {
    await logout();
    navigate("/entrar");
  }

  function handleRepeatCut() {
    // TODO: implementar repetição real do corte futuramente.
    window.alert("Repetir corte ainda não está implementado.");
  }

  return (
    <section className="client-profile-page">
      <div className="client-profile-card">
        <div className="client-profile-header">
          <div className="client-profile-avatar" aria-label="Avatar do cliente">
            {profile.name?.charAt(0) || "C"}
          </div>
          <div>
            <p className="client-profile-eyebrow">Minha conta</p>
            <h1 className="client-profile-title">Olá, {profile.name}.</h1>
            <p className="client-profile-subtitle">Pronto para o próximo atendimento?</p>
          </div>
        </div>

        <div className="client-profile-grid">
          <article className="client-profile-panel">
            <h2>Próximo agendamento</h2>
            <p>{profile.nextAppointment?.service || "Nenhum agendamento confirmado"}</p>
            <p>{profile.nextAppointment?.date || "--"} às {profile.nextAppointment?.time || "--"}</p>
          </article>

          <article className="client-profile-panel">
            <h2>Últimos atendimentos</h2>
            <ul>
              {profile.recentAppointments?.map((appointment) => (
                <li key={appointment.id}>
                  <strong>{appointment.service}</strong> — {appointment.date}
                  <p>{appointment.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="client-profile-panel">
            <h2>Preferências</h2>
            <p>{profile.preferredStyle || "Nenhuma preferência registrada"}</p>
            <p>Serviço preferido: {profile.preferredService || "--"}</p>
          </article>

          <article className="client-profile-panel">
            <h2>Dados da conta</h2>
            <p>E-mail: {profile.email}</p>
            <p>Telefone: {profile.phone || "Não informado"}</p>
            <p>Verificação: {profile.phoneVerified ? "Confirmado" : "Pendente"}</p>
          </article>
        </div>

        <div className="client-profile-actions">
          <button className="client-profile-action-button" type="button" onClick={handleRepeatCut}>
            Repetir este corte
          </button>
          <button className="client-profile-action-button secondary" type="button" onClick={() => navigate("/agendar")}>
            Novo agendamento
          </button>
          <button className="client-profile-action-button danger" type="button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </section>
  );
}

export default ClientProfilePage;
