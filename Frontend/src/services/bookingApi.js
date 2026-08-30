import { api } from "../config/api";

export function getServicos() {
  return api.get("/api/servicos");
}

export function getUnidades() {
  return api.get("/api/unidades");
}

export function getBarbeiros(unidadeId) {
  const query = unidadeId ? `?unidadeId=${unidadeId}` : "";
  return api.get(`/api/barbeiros${query}`);
}

export function createBooking({ clienteId, barbeiroId, unidadeId, dataHora, observacoes, servicosIds}) {
  return api.post(
    "/api/agendamentos",
    { clienteId, barbeiroId, unidadeId, dataHora, observacoes, servicosIds },
    { auth: true}
  );
}

export function getClientBookings(){
  return api.get("/api/agendamentos", { auth: true});
}

export function getBarberBookings () {
  return api.get("/api/agendamentos", {auth: true});
}

export function updateBookingStatus(id, status) {
  return api.patch(`/api/agendamentos/${id}/status`, { status }, { auth: true});
}

// Busca os agendamentos de um cliente específico
export async function getAgendamentosCliente(clienteId) {
  try {
    // Ajuste a URL abaixo se a sua rota no Spring Boot for diferente
    const response = await api.get(`/agendamentos/cliente/${clienteId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos do cliente:", error);
    throw new Error(
      error.response?.data?.message || "Não foi possível carregar seus agendamentos.",
      { cause: error }
    );
  }
}