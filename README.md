# Parcial 2 - Gestion de Series y Temporadas

Proyecto full stack con frontend en React y backend en Node.js/Express. Permite listar, filtrar, crear, editar y eliminar temporadas asociadas a series.

## Stack tecnologico

- Frontend: React, Vite, React Router, React Hook Form, Axios, Bootstrap.
- Backend: Node.js, Express, Sequelize.
- Base de datos: SQLite (archivo local).
- Contenedores: Docker + Docker Compose (frontend + backend).

## Estructura del proyecto

- api: API REST, modelos, servicios, repositorios y persistencia SQLite.
- frontend: SPA React, rutas y componentes de interfaz.
- docker-compose.yml: orquestacion de ambos servicios.

## Requisitos

- Node.js 20+ y npm.
- Docker Desktop (opcional, para ejecucion en contenedores).

## Variables de entorno

No se suben al repositorio los archivos .env. Usa estos ejemplos:

- api/.env.example
- frontend/.env.example

Variables disponibles:

- CORS_ORIGIN: origen permitido para CORS en la API.
- VITE_API_URL: URL base de la API consumida por el frontend.

## Ejecucion local (sin Docker)

1. Instalar dependencias del backend:

```bash
cd api
npm install
```

2. Levantar backend:

```bash
npm run dev
```

La API quedara en http://localhost:3000

3. En otra terminal, instalar dependencias del frontend:

```bash
cd frontend
npm install
```

4. Levantar frontend:

```bash
npm run dev
```

La app quedara en http://localhost:5173

## Ejecucion con Docker

Desde la raiz del proyecto:

1. Construir e iniciar servicios:

```bash
docker compose up --build -d
```

2. Ver estado:

```bash
docker compose ps
```

3. Ver logs:

```bash
docker compose logs -f
```

4. Detener servicios:

```bash
docker compose down
```

Puertos por defecto:

- Frontend: http://localhost:8080
- Backend: interno en Docker (no expuesto al host)

La app se usa desde una sola URL publica: http://localhost:8080.
Las llamadas a /api se enrutan automaticamente desde Nginx al contenedor backend.

## Seguridad y buenas practicas de versionado

Se agregaron reglas para evitar subir archivos sensibles o locales:

- .env y variantes (.env.*).
- Bases SQLite locales (api/data/*.sqlite, *.db).
- node_modules y builds (dist).
- logs y archivos del sistema.

Si algun archivo sensible fue trackeado antes de estas reglas, removerlo del indice:

```bash
git rm --cached <ruta-del-archivo>
```

Luego hacer commit normalmente.

## Scripts utiles

Backend (api/package.json):

- npm start: inicia la API en modo normal.
- npm run dev: inicia la API con recarga por cambios.

Frontend (frontend/package.json):

- npm run dev: servidor de desarrollo Vite.
- npm run build: build de produccion.
- npm run preview: sirve build localmente.

## Notas

- El backend usa SQLite con almacenamiento en api/data.
- El frontend consume la API via Axios y VITE_API_URL.
- En Docker, el frontend se sirve con Nginx y soporte de rutas SPA.
