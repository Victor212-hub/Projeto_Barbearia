import { createContext, useContext, useMemo, useState } from "react";
import { loginWithGoogle, loginBarber, logoutUser } from "../services/authApi";
import { mockClientUser, mockBarberUser } from "../mocks/authMock";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "barbershop-auth-user";

function readStoredUser() {
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
    console.warn("Não foi possível ler usuário mockado do sessionStorage.", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const isAuthenticated = Boolean(user);

  function persistUser(nextUser) {
    if (typeof window === "undefined") {
      return;
    }

    if (nextUser) {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      return;
    }

    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }

  async function loginWithGoogleMock() {
    const response = await loginWithGoogle();

    if (response.success) {
      setUser(response.user || mockClientUser);
      persistUser(response.user || mockClientUser);
    }

    return response;
  }

  async function loginBarberMock() {
    const response = await loginBarber();

    if (response.success) {
      setUser(response.user || mockBarberUser);
      persistUser(response.user || mockBarberUser);
    }

    return response;
  }

  async function logout() {
    const response = await logoutUser();
    setUser(null);
    persistUser(null);
    return response;
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loginWithGoogleMock,
      loginBarberMock,
      logout,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }

  return context;
}
