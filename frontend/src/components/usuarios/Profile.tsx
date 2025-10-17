import { useEffect, useState } from "react";
import { getProfile } from "../../api/authService";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-start py-5">
      {/* Wrapper central */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="bg-white rounded-4 shadow p-4">
              {/* Banner */}
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

              {/* Info del usuario */}
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
