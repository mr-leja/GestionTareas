import axios from "axios";

/**
 * Instancia personalizada de Axios configurada para la API del backend.
 *
 * - Define una `baseURL` para todas las peticiones.
 * - Establece el header `Content-Type` como `application/json`.
 * - Incluye un interceptor que agrega automáticamente el token de autenticación (si existe) desde `localStorage`.
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de solicitud que se ejecuta antes de cada petición.
 *
 * - Obtiene el token del `localStorage`.
 * - Si el token existe, lo agrega como header `Authorization` en formato: `Token <token>`.
 *
 * @param config - Configuración de la solicitud HTTP.
 * @returns Configuración modificada con el token (si aplica).
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

/**
 * Exporta la instancia de Axios configurada para su uso en el proyecto.
 */
export default api;
