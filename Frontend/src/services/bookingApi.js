// TODO: substituir por integração real com o backend.
export function createBooking() {
  return Promise.resolve({
    success: true,
    message: "Agendamento mockado criado com sucesso.",
  });
}

export function getClientBookings() {
  return Promise.resolve({
    success: true,
    bookings: [],
    message: "Lista de agendamentos do cliente ainda não integrada.",
  });
}

export function repeatBooking() {
  return Promise.resolve({
    success: true,
    message: "Repetição de agendamento ainda não implementada.",
  });
}

export function cancelBooking() {
  return Promise.resolve({
    success: true,
    message: "Cancelamento de agendamento ainda não implementado.",
  });
}

export function rescheduleBooking() {
  return Promise.resolve({
    success: true,
    message: "Remarcação de agendamento ainda não implementada.",
  });
}

export function getBarberBookings() {
  return Promise.resolve({
    success: true,
    bookings: [],
    message: "Painel do barbeiro ainda não integrado.",
  });
}

export function updateBookingStatus() {
  return Promise.resolve({
    success: true,
    message: "Atualização de status ainda não implementada.",
  });
}
