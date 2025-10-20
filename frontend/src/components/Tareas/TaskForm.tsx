import { useState, useEffect } from "react";
import { createTask, updateTask, getTasks } from "../../api/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../../api/taskService";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

/**
 * Componente para crear o editar una tarea.
 * Incluye validaciones para evitar espacios en blanco al inicio o fin de los campos.
 */
export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({
    titulo: "",
    descripcion: "",
    fecha_vence: "",
    estado: false,
  });

  // Estado para manejar errores en los campos
  const [errors, setErrors] = useState<{
    titulo?: string;
    descripcion?: string;
    fecha_vence?: string;
  }>({});

  /**
   * Carga la tarea existente si hay un ID en los parámetros.
   */
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

  /**
   * Valida un campo específico del formulario.
   * @param name - Nombre del campo (titulo, descripcion, fecha_vence)
   * @param value - Valor actual del campo
   */
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    // No permitir espacios al inicio o al final, pero sí en medio
    if (name === "titulo") {
      if (!value.trim()) newErrors.titulo = "El título no puede estar vacío.";
      else if (/^\s|\s$/.test(value))
        newErrors.titulo =
          "El título no debe tener espacios al inicio o al final.";
      else newErrors.titulo = undefined;
    }

    if (name === "descripcion") {
      if (!value.trim())
        newErrors.descripcion = "La descripción no puede estar vacía.";
      else if (/^\s|\s$/.test(value))
        newErrors.descripcion =
          "La descripción no debe tener espacios al inicio o al final.";
      else newErrors.descripcion = undefined;
    }

    if (name === "fecha_vence") {
      if (!value)
        newErrors.fecha_vence = "La fecha de vencimiento es obligatoria.";
      else newErrors.fecha_vence = undefined;
    }

    setErrors(newErrors);
  };

  /**
   * Maneja los cambios en los campos del formulario.
   * @param e - Evento de cambio del input o textarea.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const newValue = type === "checkbox" ? checked : value;
    setTask({ ...task, [name]: newValue });

    if (type !== "checkbox") validateField(name, value);
  };

  /**
   * Maneja el envío del formulario, validando los campos antes de crear o actualizar.
   * @param e - Evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación final
    const newErrors: typeof errors = {};

    if (!task.titulo.trim())
      newErrors.titulo = "El título no puede estar vacío.";
    else if (/^\s/.test(task.titulo))
      newErrors.titulo = "El título no debe comenzar con un espacio.";

    if (!task.descripcion.trim())
      newErrors.descripcion = "La descripción no puede estar vacía.";
    else if (/^\s|\s$/.test(task.descripcion))
      newErrors.descripcion =
        "La descripción no debe tener espacios al inicio o al final.";

    if (!task.fecha_vence)
      newErrors.fecha_vence = "La fecha de vencimiento es obligatoria.";

    const today = new Date().toISOString().split("T")[0];
    if (task.fecha_vence && task.fecha_vence < today) {
      newErrors.fecha_vence = "La fecha no puede ser menor a la actual.";
    }

    // Si hay errores, no enviar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
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
          title: "Tarea creada con éxito",
          confirmButtonText: "Aceptar",
        });
      }

      navigate("/tasks");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "Ocurrió un problema al guardar la tarea. Intenta nuevamente.",
      });
    }
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

              <form onSubmit={handleSubmit} noValidate>
                {/* 🟢 TÍTULO */}
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
                    className={`form-control form-control-lg rounded-3 border-secondary ${
                      errors.titulo ? "is-invalid" : ""
                    }`}
                    required
                  />
                  {errors.titulo && (
                    <div className="invalid-feedback">{errors.titulo}</div>
                  )}
                </div>

                {/* 🟢 DESCRIPCIÓN */}
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
                    className={`form-control form-control-lg rounded-3 border-secondary ${
                      errors.descripcion ? "is-invalid" : ""
                    }`}
                    rows={4}
                    required
                  />
                  {errors.descripcion && (
                    <div className="invalid-feedback">{errors.descripcion}</div>
                  )}
                </div>

                {/* 🟢 FECHA */}
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
                    className={`form-control form-control-lg rounded-3 border-secondary ${
                      errors.fecha_vence ? "is-invalid" : ""
                    }`}
                    min={new Date().toISOString().split("T")[0]} // 👈 evita fechas menores a hoy
                    required
                  />

                  {errors.fecha_vence && (
                    <div className="invalid-feedback">{errors.fecha_vence}</div>
                  )}
                </div>

                {/* 🟢 ESTADO */}
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

                {/* 🟢 BOTONES */}
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
