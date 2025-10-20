# Proyecto Fullstack: Django + React

Este proyecto es una aplicación web fullstack con **Django** como backend (API) y **React** como frontend (interfaz de usuario).  
Está estructurado en dos carpetas principales: `backend/` (Python) y `frontend/` (React).

---

## 🚀 Tecnologías utilizadas

### Backend (API)

- Python
- Django Rest Framework
- Mysql
- CORS Headers (para conexión con frontend)

### Frontend (UI)

- React
- TypeScript
- Axios (para llamadas al backend)

---

## ✅ Requisitos previos

- Python 3.12
- Django 5.2.7
- Django rest framework
- Node.js
- Git (opcional)

---

## ⚙️ Configuración del proyecto

### 1. Clona el repositorio

git clone https://github.com/mr-leja/GestionTareas.git
cd taskmanagement
cd Backend

# Crear entorno virtual

python -m venv env

# Activar entorno virtual

# Windows

.\.venv\Scripts\activate

# macOS/Linux

source env/bin/activate

# Instalar dependencias

pip install django djangorestframework django-cors-headers

# Guardar dependencias

pip freeze > requirements.txt

# Migraciones iniciales

python manage.py makemigrations
python manage.py migrate

# Ejecutar servidor

python manage.py runserver

cd ../frontend

# Instalar dependencias

npm install

# Ejecutar servidor de desarrollo

npm start

---
