// src/components/usuarios/Register.tsx
import { useState } from "react";
import { registerUser } from "../../api/authService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password }); // ✅ No guardamos token
      alert("Usuario registrado correctamente. Inicia sesión para continuar.");
      window.location.href = "/login"; // ✅ Redirige sin token
    } catch (error) {
      alert("Error en el registro, revisa los datos.");
      console.error(error);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

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
