import { createContext, useContext, useState } from "react";
import { loginClient, registerClient, logoutUser } from "../services/authApi";
import { setToken } from "../config/api";
import { mockBarberUser } from "../mocks/authMock";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "barbershop-auth-user";

function readStoreUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = window.sessionStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(rawUser);
    return parsedUser && typeof parsedUser === "object" ? parsedUser : null;
  } catch (error) {
    console.warn("Não foi possível ler o usuário salvo", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoreUser);
  
  const isAuthenticated = Boolean(user);

  function persistUser(nextUser) {
    if (typeof window === "undefined" ) {
      return;
    }

    if (nextUser) {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      return;
    }

    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }

  async function login({ email, password}) {
    const response = await loginClient({ email, password});

    if (response.success) {
      setUser(response.user);
      persistUser(response.user);
    }

    return response;
  }

  async function register ({ name, email, password, phone }) {
    return registerClient({ name, email, password, phone});
  }

  async function logout() {
    const response = await logoutUser();
    setToken(null);
    setUser(null);
    persistUser(null);
    return response;
  }

  //o backend ainda nao tem endpoint de login para barbeiro
  //so tem /api/auth/login/cliente. Mantido mockado ate existir
  async function loginBarberMock() {
    setUser(mockBarberUser);
    persistUser(mockBarberUser);
    return { success: true, user: mockBarberUser };
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loginBarberMock,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }

  return context;
}
