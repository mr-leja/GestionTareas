import { useState } from "react";
import { loginUser } from "../../api/authService";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Componente de inicio de sesión (Login).
 *
 * Permite al usuario autenticarse ingresando su correo electrónico y contraseña.
 * Incluye validaciones reactivas de los campos y manejo de errores de autenticación.
 *
 * @returns Un componente JSX que renderiza el formulario de inicio de sesión.
 */
export default function Login() {
  // ----------------------------
  // 🔹 Estados del formulario
  // ----------------------------

  /** Valor actual del campo de correo electrónico. */
  const [email, setEmail] = useState("");

  /** Valor actual del campo de contraseña. */
  const [password, setPassword] = useState("");

  /**
   * Estado de errores del formulario.
   * Contiene posibles mensajes de error para los campos y errores generales.
   */
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  // ----------------------------
  // 🔹 Funciones de validación
  // ----------------------------

  /**
   * Valida el formato del correo electrónico ingresado.
   *
   * @param value - El valor actual del campo de correo.
   * @returns Un mensaje de error si el correo es inválido, o una cadena vacía si es válido.
   */
  const validateEmail = (value: string): string => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.com$/;
    if (!value) return "El correo es obligatorio.";
    if (!emailRegex.test(value))
      return "Ingresa un correo válido (gmail, hotmail, outlook o yahoo).";
    return "";
  };

  /**
   * Valida la longitud y obligatoriedad de la contraseña.
   *
   * @param value - El valor actual del campo de contraseña.
   * @returns Un mensaje de error si la contraseña no cumple los requisitos, o una cadena vacía si es válida.
   */
  const validatePassword = (value: string): string => {
    if (!value) return "La contraseña es obligatoria.";
    if (value.length < 8)
      return "La contraseña debe tener al menos 8 caracteres.";
    return "";
  };

  // ----------------------------
  // 🔹 Función de envío del formulario
  // ----------------------------

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Realiza validaciones y, si son correctas, intenta autenticar al usuario.
   *
   * @param e - Evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Si hay errores, no se envía la solicitud
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      // 🔹 Enviar datos al backend para autenticación
      const data = await loginUser({ email, password });

      // 🔹 Guardar token JWT en localStorage
      localStorage.setItem("token", data.token);

      // 🔹 Redirigir a la página principal de tareas
      window.location.href = "/tasks";
    } catch {
      // 🔹 Error de credenciales incorrectas
      setErrors({ general: "Correo o contraseña incorrectos." });
    }
  };

  // ----------------------------
  // 🔹 Funciones de actualización reactiva
  // ----------------------------

  /**
   * Maneja los cambios en el campo de correo electrónico y actualiza su validación en tiempo real.
   *
   * @param value - Nuevo valor del campo de correo.
   */
  const handleEmailChange = (value: string): void => {
    setEmail(value);
    const error = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: error || undefined }));
  };

  /**
   * Maneja los cambios en el campo de contraseña y actualiza su validación en tiempo real.
   *
   * @param value - Nuevo valor del campo de contraseña.
   */
  const handlePasswordChange = (value: string): void => {
    setPassword(value);
    const error = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: error || undefined }));
  };

  // ----------------------------
  // 🔹 Render del componente
  // ----------------------------

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f0f2f5" }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* 🟢 Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo de correo electrónico */}
          <div className="mb-3">
            <input
              type="email"
              className={`form-control form-control-lg ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Correo"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control form-control-lg ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg shadow-sm"
            style={{
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              border: "none",
            }}
          >
            Ingresar
          </button>
        </form>

        {/* Enlace al registro */}
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>

        {/* Mensaje de error general */}
        {errors.general && (
          <div className="alert alert-danger mt-3 text-center p-2" role="alert">
            {errors.general}
          </div>
        )}
      </div>
    </div>
  );
}
