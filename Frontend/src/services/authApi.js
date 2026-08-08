import { api, setToken } from "../config/api";

function toClientUser (data) {
  return {
    id: data.id,
    name: data.nome,
    email: data.email,
    phone: data.telefone || "",
    role: "CLIENT", 
  };
}

export async function registerClient({ name, email, password, phone}) {
  const cliente = await api.post("/api/clientes", {
    nome: name,
    email,
    senha: password,
    telefone: phone,
  });

  return {
    success: true,
    user: toClientUser(cliente),
    message: "Cadastro realizado com sucesso.",
  };
}

export async function loginClient({ email, password}) {
  const response = await api.post("/api/auth/login/cliente", {
    email,
    senha: password,
  });

  setToken(response.token);

  return {
    success: true,
    user: {
      id: response.id,
      name:response.nome,
      email: response.email,
      phone: "",
      role: "CLIENT",
    },
    message: "Login realizado com sucesso",
  };
}

export function logoutUser() {
  setToken(null);
  return Promise.resolve({ success: true, message: "Sessão encerrada."});
}
