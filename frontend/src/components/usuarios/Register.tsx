// src/Register.tsx
import { useState } from "react";
import { registerUser } from "../../api/authService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser({ username, email, password });
      localStorage.setItem("token", data.token);
      alert("Usuario registrado correctamente");
      window.location.href = "/login";
    } catch (error) {
      alert("Error en el registro, revisa los datos");
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
