import { useEffect, useState } from "react";
import { getProfile } from "../../api/authService";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch {
        alert("Token inválido o sesión expirada");
        window.location.href = "/login";
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Perfil</h2>
      {user ? (
        <>
          <p>
            <b>Usuario:</b> {user.username}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
