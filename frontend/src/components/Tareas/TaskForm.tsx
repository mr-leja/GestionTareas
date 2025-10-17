import { useState, useEffect } from "react";
import { createTask, updateTask, getTasks } from "../../api/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../../api/taskService";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({
    titulo: "",
    descripcion: "",
    fecha_vence: "",
    estado: false,
  });

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const allTasks = await getTasks();
        const t = allTasks.find((task: Task) => task.id === Number(id));
        if (t) setTask(t);
      }
    };
    loadTask();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // ✅ TypeScript happy
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await updateTask(Number(id), task);
      Swal.fire({
        icon: "success",
        title: "Tarea actualizada",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await createTask(task);
      await Swal.fire({
        icon: "success",
        title: id ? "Tarea actualizada" : "Tarea creada",
        confirmButtonText: "Aceptar",
      });
    }

    navigate("/tasks");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg rounded-4 border-0">
            <div className="card-body p-5">
              <h2
                className="text-center mb-4 fw-bold"
                style={{ color: "#343a40" }}
              >
                {id ? "Editar Tarea" : "Nueva Tarea"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="titulo" className="form-label fw-semibold">
                    Título
                  </label>
                  <input
                    id="titulo"
                    name="titulo"
                    value={task.titulo}
                    onChange={handleChange}
                    placeholder="Ingresa el título"
                    className="form-control form-control-lg rounded-3 border-secondary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="descripcion"
                    className="form-label fw-semibold"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={task.descripcion}
                    onChange={handleChange}
                    placeholder="Describe la tarea"
                    className="form-control form-control-lg rounded-3 border-secondary"
                    rows={4}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="fecha_vence"
                    className="form-label fw-semibold"
                  >
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="date"
                    id="fecha_vence"
                    name="fecha_vence"
                    value={task.fecha_vence}
                    onChange={handleChange}
                    className="form-control form-control-lg rounded-3 border-secondary"
                    required
                  />
                </div>

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    id="estado"
                    name="estado"
                    checked={task.estado}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="estado"
                  >
                    Completada
                  </label>
                </div>

                <div className="d-grid gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-3"
                    style={{
                      background:
                        "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                      border: "none",
                    }}
                  >
                    {id ? "Actualizar" : "Crear"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg rounded-3"
                    onClick={() => navigate("/tasks")}
                  >
                    Volver
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
