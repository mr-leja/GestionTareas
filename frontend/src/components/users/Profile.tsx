import { useEffect, useState } from "react";
import { getProfile } from "../../api/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

/**
 * Componente de perfil del usuario autenticado.
 *
 * - Obtiene la información del usuario mediante `getProfile`.
 * - Muestra los datos del perfil si el token es válido.
 * - Redirige al login si la sesión ha expirado o el token no es válido.
 * - Permite cerrar sesión eliminando el token del `localStorage`.
 *
 * @component
 * @returns {JSX.Element} Interfaz del perfil de usuario.
 */
export default function Profile() {
  /**
   * Estado local que almacena la información del usuario.
   * Se establece al montar el componente si el token es válido.
   */
  const [user, setUser] = useState<any>(null); // 💡 Tip: Usa una interfaz para evitar 'any'

  /**
   * Efecto que se ejecuta una sola vez al montar el componente.
   * Llama a `getProfile` para obtener los datos del usuario autenticado.
   */
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

  /**
   * Cierra la sesión del usuario eliminando el token del `localStorage`
   * y redirige al login.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-start py-5">
      {/* Contenedor principal */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="bg-white rounded-4 shadow p-4">
              {/* 🔙 Flecha para volver a la lista de tareas */}
              <button
                onClick={() => (window.location.href = "/tasks")}
                className="btn position-absolute top-0 start-0 m-3"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#6a11cb",
                  fontSize: "1.5rem",
                  transition: "transform 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.2)";
                  e.currentTarget.style.color = "#2575fc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.color = "#6a11cb";
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>

              {/* Encabezado */}
              <div
                className="d-flex justify-content-center align-items-center mb-4 rounded-3"
                style={{
                  height: "150px",
                  background:
                    "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                }}
              >
                <h1
                  className="text-white fw-bold m-0"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Mi Perfil
                </h1>
              </div>

              {/* Información del usuario */}
              <div className="text-center">
                {user ? (
                  <>
                    <h3 className="fw-bold">{user.username}</h3>
                    <p className="text-muted">{user.email}</p>

                    {/* Botón de cerrar sesión */}
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="btn btn-primary btn-lg shadow-sm mt-3"
                      style={{
                        borderRadius: "50px",
                        background:
                          "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                        fontWeight: 600,
                        transition: "transform 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <p className="text-muted mt-3">Cargando...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
