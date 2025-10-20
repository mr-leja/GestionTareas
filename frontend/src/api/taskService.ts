import api from "./axiosConfig";

export interface Task {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha_vence: string;
  estado: boolean;
}

// ✅ Lista de tareas obtenidas del backend.
export const getTasks = async () => {
  const response = await api.get("tareas/");
  return response.data;
};

// ✅ Crear tarea
export const createTask = async (task: Task) => {
  const response = await api.post("tareas/crear/", task);
  return response.data;
};

// ✅ Editar tarea
export const updateTask = async (id: number, task: Task) => {
  const response = await api.put(`tareas/editar/${id}/`, task);
  return response.data;
};

// ✅ Eliminar tarea
export const deleteTask = async (id: number) => {
  await api.delete(`tareas/eliminar/${id}/`);
};
