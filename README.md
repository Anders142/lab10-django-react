# Laboratorio 10 – Componentes y eventos (Django + React)

Servicio web en **Django** (`/api/producto/`, GET y POST) consumido por una aplicación **React** con **Material-UI** que lista y agrega productos.

## Estructura
- `backend/`  – API Django (con `django-cors-headers`)
- `frontend/` – aplicación React (create-react-app + MUI)

## Ejecutar el backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata productos   # Coca cola y Fanta
python manage.py runserver 8000
```
Prueba: http://localhost:8000/api/producto/

## Ejecutar el frontend
```bash
cd frontend
npm install
npm start
```
Abre http://localhost:3000 (el backend debe estar en el puerto 8000).

> Proyecto de laboratorio: CORS abierto y CSRF desactivado en la vista POST; no usar así en producción.
