# Proyecto Fullstack: Django + React

Este proyecto es una aplicación web fullstack con **Django** como backend (API) y **React** como frontend (interfaz de usuario).  
Está estructurado en dos carpetas principales: `backend/` (Python) y `frontend/` (React).

---

## 🚀 Tecnologías utilizadas

### Backend (API)

- Python
- Django
- Mysql
- CORS Headers (para conexión con frontend)

### Frontend (UI)

- React
- Vite
- Axios o Fetch API (para llamadas al backend)

---

## Installation

instalar dependencias usando:

-pip install -r requirements.txt

---

## ✅ Requisitos previos

- Python 3.14
- Django 5.2.7
- Node.js y npm
- Git (opcional)

---

## ⚙️ Configuración del proyecto

### 1. Clona el repositorio

git clone https://github.com/mr-leja/Task-Management.git
cd taskmanagement
cd Backend

# Crear entorno virtual

python -m venv env

# Activar entorno virtual

# Windows

.\env\Scripts\activate

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

npm run dev

---

## 📁 Estructura del proyecto

TaskManagement/
├── backend/
│ ├── env/ # Entorno virtual de Python
│ ├── proyecto/ # Proyecto Django (configuración, settings)
│ ├── app/ # App Django (lógica)
│ ├── manage.py
│ └── requirements.txt
│
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ ├── package.json
│ ├── vite.config.js
│ └── index.html
│
└── README.md

---
