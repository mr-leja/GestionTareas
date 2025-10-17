// src/Login.tsx
import { useState } from "react";
import { loginUser } from "../../api/authService";

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
    <div style={{ margin: "2rem" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
