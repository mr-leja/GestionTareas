import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask, Task } from "../../api/taskService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar tareas",
        text: "Verifica tu sesión.",
      });
      navigate("/login");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteTask(id);
      await loadTasks();
      Swal.fire({
        icon: "success",
        title: "Tarea eliminada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleToggleComplete = async (task: Task) => {
    const updatedTask = { ...task, estado: !task.estado };
    await updateTask(task.id!, updatedTask);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
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
              style={{
                backgroundColor: t.estado ? "#d4edda" : "white", // Verde suave si completada
                borderLeft: t.estado
                  ? "6px solid #28a745"
                  : "6px solid transparent",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                  {/* Checkbox para marcar como completada */}
                  <input
                    type="checkbox"
                    checked={t.estado}
                    onChange={() => handleToggleComplete(t)}
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                  <h5
                    className="mb-0"
                    style={{
                      textDecoration: t.estado ? "line-through" : "none",
                      color: t.estado ? "#155724" : "black",
                    }}
                  >
                    {t.titulo}
                  </h5>
                </div>
                <span
                  className={`badge ${t.estado ? "bg-success" : "bg-danger"}`}
                >
                  {t.estado ? " Completada" : "Pendiente"}
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
