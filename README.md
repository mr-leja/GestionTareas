## 🧱 Arquitectura del Proyecto

Este proyecto está dividido en dos partes principales: un **frontend en React con TypeScript** y un **backend en Django utilizando Django REST Framework (DRF)**. La comunicación entre ambos se realiza mediante peticiones HTTP (REST API).

### 📦 Estructura General

---

### 🔧 Backend (Django + Django REST Framework)

El backend está construido con Django y utiliza Django REST Framework para exponer endpoints RESTful.

**Estructura de apps:**

- `autenticacion/`  
  Contiene la lógica de autenticación: registro de usuarios, inicio de sesión, perfil y serializadores personalizados.

- `tareas/`  
  Maneja toda la lógica relacionada con tareas: modelos, vistas, y endpoints para crear, listar, actualizar y eliminar tareas.

- `proyecto/`  
  Carpeta de configuración principal de Django (`settings.py`, `urls.py`, etc.).

**Tecnologías usadas:**

- Django
- Django REST Framework
- MySQl

---

### 💻 Frontend (React + TypeScript)

La interfaz de usuario está desarrollada con React y organizada por módulos funcionales.

**Estructura principal:**

- `api/`  
  Contiene los servicios de comunicación con el backend mediante Axios, incluyendo configuración base (`axiosConfig.ts`) y servicios para tareas y autenticación.

- `components/Task/`  
  Componentes específicos para gestión de tareas (`TaskForm.tsx`, `TaskList.tsx`).

- `components/users/`  
  Componentes relacionados con usuarios y autenticación (`Login.tsx`, `Register.tsx`, `Profile.tsx`).

- `ProtectedRoute.tsx`  
  Componente de ruta protegida que controla el acceso a rutas según el estado de autenticación del usuario.

**Tecnologías usadas:**

- React
- TypeScript
- React Router
- Axios
- localStorage (para manejar el token)

---

### 🔗 Comunicación entre Frontend y Backend

- El frontend consume la API del backend utilizando **Axios**.
- Las rutas protegidas requieren autenticación mediante un **token** que se guarda en `localStorage`.
- El token se incluye automáticamente en las cabeceras de las peticiones (`Authorization: Token <token>`).
- El backend valida el token y responde con datos en formato JSON.

---

### 📊 Diagrama de Arquitectura (simplificado)

# React & Django

Find de corresponding instructions under:

- `Frontend`. -For the frontend project
- `backend`. -For the backend project
