// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/usuarios/Login";
import Register from "./components/usuarios/Register";
import Profile from "./components/usuarios/Profile";
import TaskList from "./components/Tareas/TaskList";
import TaskForm from "./components/Tareas/TaskForm";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Rutas públicas */}
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/profile" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/profile" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* 🔒 Rutas protegidas */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/new"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/edit/:id"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />

        {/* 🚀 Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
