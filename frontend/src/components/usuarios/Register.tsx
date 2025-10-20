import { useState } from "react";
import { registerUser } from "../../api/authService";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Representa el estado de los errores de validación
 * de los campos del formulario de registro.
 */
type ErrorState = {
  /** Error asociado al nombre de usuario. */
  username?: string;
  /** Error asociado al correo electrónico. */
  email?: string;
  /** Error asociado a la contraseña. */
  password?: string;
  /** Error general relacionado con la solicitud al servidor. */
  general?: string;
};

/**
 * Componente de registro de usuarios.
 *
 * Muestra un formulario con validación reactiva para registrar
 * un nuevo usuario, asegurando que los campos cumplan con los
 * requisitos de formato antes de enviarse al servidor.
 *
 * @returns Un componente JSX que renderiza el formulario de registro.
 */
export default function Register() {
  // ----------------------------
  // 🔹 Estados locales del formulario
  // ----------------------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});

  // ----------------------------
  // 🔹 Expresiones regulares de validación
  // ----------------------------

  /** Valida correos de dominios comunes como Gmail, Hotmail, Outlook o Yahoo. */
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo)\.[a-zA-Z]{2,}$/;

  /** Exige al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo. */
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

  // ----------------------------
  // 🔹 Función: Validación individual de campos
  // ----------------------------

  /**
   * Valida un campo específico del formulario de forma reactiva.
   * Se ejecuta cada vez que el usuario modifica un campo.
   *
   * @param name - Nombre del campo ("username", "email" o "password").
   * @param value - Valor actual del campo.
   */
  const validateField = (name: string, value: string): void => {
    const newErrors: ErrorState = { ...errors };

    if (name === "username") {
      if (!value.trim())
        newErrors.username = "El nombre de usuario es obligatorio.";
      else if (/\s/.test(value))
        newErrors.username = "El nombre de usuario no puede contener espacios.";
      else newErrors.username = undefined;
    }

    if (name === "email") {
      if (!value.trim())
        newErrors.email = "El correo electrónico es obligatorio.";
      else if (!emailRegex.test(value))
        newErrors.email =
          "Ingresa un correo válido (gmail, hotmail, outlook o yahoo).";
      else newErrors.email = undefined;
    }

    if (name === "password") {
      if (!value.trim()) newErrors.password = "La contraseña es obligatoria.";
      else if (!passwordRegex.test(value))
        newErrors.password =
          "Debe tener 8 caracteres, una mayúscula, un número y un carácter especial.";
      else newErrors.password = undefined;
    }

    setErrors(newErrors);
  };

  // ----------------------------
  // 🔹 Función: Manejo del envío del formulario
  // ----------------------------

  /**
   * Envía el formulario de registro al servidor.
   * Antes de enviar, realiza una validación completa de los campos.
   *
   * @param e - Evento del formulario.
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const newErrors: ErrorState = {};

    // 🔸 Validación final antes del envío
    if (!username.trim())
      newErrors.username = "El nombre de usuario es obligatorio.";
    else if (/\s/.test(username))
      newErrors.username = "El nombre de usuario no puede contener espacios.";

    if (!email.trim())
      newErrors.email = "El correo electrónico es obligatorio.";
    else if (!emailRegex.test(email))
      newErrors.email =
        "Ingresa un correo válido (gmail, hotmail, outlook o yahoo).";

    if (!password.trim()) newErrors.password = "La contraseña es obligatoria.";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Debe tener 8 caracteres, una mayúscula, un número y un carácter especial.";

    // Si hay errores, detener el envío
    if (newErrors.username || newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      // 🔹 Petición al servicio de registro
      await registerUser({ username, email, password });
      window.location.href = "/login"; // Redirige al login tras registrarse correctamente
    } catch (error: any) {
      const updatedErrors: ErrorState = { ...newErrors };
      if (error.response?.data?.email) {
        updatedErrors.email = error.response.data.email[0];
      } else if (error.response?.data?.username) {
        updatedErrors.username = "Este nombre de usuario ya está en uso.";
      } else {
        updatedErrors.general =
          "Ocurrió un error al registrar el usuario. Intenta nuevamente.";
      }
      setErrors(updatedErrors);
    }
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
        className="card shadow-lg p-5 rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">Crear Cuenta</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* 🟢 USERNAME */}
          <div className="mb-3">
            <input
              type="text"
              className={`form-control form-control-lg rounded-3 ${
                errors.username ? "is-invalid" : ""
              }`}
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateField("username", e.target.value);
              }}
              required
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          {/* 🟢 EMAIL */}
          <div className="mb-3">
            <input
              type="email"
              className={`form-control form-control-lg rounded-3 ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* 🟢 PASSWORD */}
          <div className="mb-4">
            <input
              type="password"
              className={`form-control form-control-lg rounded-3 ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* 🟢 BOTÓN */}
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg shadow-sm"
            style={{
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              border: "none",
            }}
          >
            Registrarse
          </button>

          {/* 🟢 ERROR GENERAL */}
          {errors.general && (
            <div className="text-danger text-center mt-3 fw-semibold">
              {errors.general}
            </div>
          )}
        </form>

        <p className="text-center text-muted mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-primary fw-semibold">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
