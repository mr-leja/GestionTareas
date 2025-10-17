// src/Login.tsx
import { useState } from "react";
import { loginUser } from "../../api/authService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      alert("Inicio de sesión exitoso");
      window.location.href = "/tasks";
    } catch {
      setError("Correo o contraseña incorrectos");
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
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
            Ingresar
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Registrate
          </a>
        </p>

        {error && (
          <div className="alert alert-danger mt-3 text-center p-2" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
