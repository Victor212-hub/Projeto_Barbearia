import { mockClientUser, mockBarberUser } from "../mocks/authMock";

// TODO: substituir por integração real com o backend.
export function loginWithGoogle() {
  return Promise.resolve({
    success: true,
    user: mockClientUser,
    message: "Login com Google mockado para desenvolvimento.",
  });
}

export function loginBarber() {
  return Promise.resolve({
    success: true,
    user: mockBarberUser,
    message: "Login de barbeiro mockado para desenvolvimento.",
  });
}

export function getCurrentUser() {
  return Promise.resolve({
    success: true,
    user: mockClientUser,
    message: "Usuário atual ainda não vindo do backend.",
  });
}

export function logoutUser() {
  return Promise.resolve({
    success: true,
    message: "Sessão mockada encerrada.",
  });
}

export function sendPhoneVerificationCode() {
  return Promise.resolve({
    success: true,
    message: "Código de verificação mockado enviado.",
  });
}

export function verifyPhoneCode() {
  return Promise.resolve({
    success: true,
    message: "Código de verificação mockado validado.",
  });
}
