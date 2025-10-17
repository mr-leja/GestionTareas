import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../api/taskService";
import { Task } from "../../api/taskService";
import { useNavigate } from "react-router-dom";

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
    <div style={{ margin: "2rem" }}>
      <h2>Mis Tareas</h2>
      <button onClick={() => navigate("/task/new")}>+ Nueva Tarea</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <b>{t.titulo}</b> - {t.descripcion} ({t.estado ? "✔️" : "❌"})<br />
            Vence: {t.fecha_vence}
            <br />
            <button onClick={() => navigate(`/task/edit/${t.id}`)}>
              Editar
            </button>
            <button onClick={() => handleDelete(t.id!)}>Eliminar</button>
            <hr />
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/profile")}>Volver al perfil</button>
    </div>
  );
}
