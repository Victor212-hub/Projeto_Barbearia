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