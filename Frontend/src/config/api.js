const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8085";
const TOKEN_STORAGE_KEY = "barbershop-auth-token";

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token) {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers.get("Content-Type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorMessage = (data && (data.message || data.error)) || `Erro ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

export const api = {
  get: (path, options = {}) => request(path, { ...options, method: "GET" }),
  post: (path, body, options = {}) => request(path, { ...options, method: "POST", body }),
  patch: (path, body, options = {}) => request(path, { ...options, method: "PATCH", body }),
  put: (path, body, options = {}) => request(path, { ...options, method: "PUT", body }),
  del: (path, options = {}) => request(path, { ...options, method: "DELETE" }),
};
