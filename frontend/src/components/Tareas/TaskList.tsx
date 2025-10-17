import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../api/taskService";
import { Task } from "../../api/taskService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      alert("Error al cargar tareas. Verifica tu sesión.");
      navigate("/login");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Deseas eliminar esta tarea?")) {
      await deleteTask(id);
      loadTasks();
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "#2575fc" }}
      >
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            Mis Tareas
          </a>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="text-white me-2"
              onClick={() => navigate("/profile")}
              size="lg"
            />
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Mis Tareas</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/task/new")}
            style={{
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              border: "none",
            }}
          >
            + Nueva Tarea
          </button>
        </div>

        <div className="list-group">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="list-group-item list-group-item-action mb-3 rounded-3 shadow-sm"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">{t.titulo}</h5>
                <span
                  className={`badge ${t.estado ? "bg-success" : "bg-danger"}`}
                >
                  {t.estado ? "✔️ Completada" : "❌ Pendiente"}
                </span>
              </div>
              <p className="mb-1">{t.descripcion}</p>
              <small className="text-muted">Vence: {t.fecha_vence}</small>
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigate(`/task/edit/${t.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(t.id!)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
