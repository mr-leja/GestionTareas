import { useState, useEffect } from "react";
import { createTask, updateTask, getTasks } from "../../api/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../../api/taskService";

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
      alert("Tarea actualizada");
    } else {
      await createTask(task);
      alert("Tarea creada");
    }
    navigate("/tasks");
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>{id ? "Editar Tarea" : "Nueva Tarea"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="titulo"
          value={task.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <br />
        <textarea
          name="descripcion"
          value={task.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <br />
        <input
          type="date"
          name="fecha_vence"
          value={task.fecha_vence}
          onChange={handleChange}
          required
        />
        <br />
        <label>
          <input
            type="checkbox"
            name="estado"
            checked={task.estado}
            onChange={handleChange}
          />
          Completada
        </label>
        <br />
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
      <button onClick={() => navigate("/tasks")}>Volver</button>
    </div>
  );
}
