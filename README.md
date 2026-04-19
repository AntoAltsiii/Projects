# Procesador de Texto - Analizador de Frecuencia

Este proyecto es una herramienta simple de línea de comandos diseñada para analizar la frecuencia de palabras en un archivo de texto.

## Estructura del Proyecto
- `src/analizador.py`: Script principal que realiza el procesamiento.
- `data/`: Carpeta destinada a los archivos de entrada (se incluye `texto_prueba.txt`).

## Toma de Decisiones y Arquitectura
Originalmente, el repositorio contenía una estructura compleja de microservicios y contenedores (API, Frontend, Docker). Tras una revisión y simplificación, se tomaron las siguientes decisiones:

1. **Simplicidad**: Se eliminó la arquitectura web (frontend/backend) por no ser necesaria para el objetivo de análisis de texto simple.
2. **Portabilidad**: Se eliminó Docker para permitir una ejecución directa en cualquier entorno con Python instalado.
3. **Enfoque en Scripting**: El proyecto se consolidó en un único script de Python (`src/analizador.py`), facilitando la depuración y el mantenimiento.
4. **Alimentación de Datos**: Se mantiene una carpeta `data` separada para organizar los archivos de entrada, manteniendo el código fuente limpio.

## Cómo Ejecutar
Asegúrate de tener Python instalado y ejecuta:
```bash
python src/analizador.py
```

## Preparación para ZIP
Este proyecto está preparado para ser comprimido. No incluye entornos virtuales (`venv`), archivos de compilación, ni contenedores pesados.

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
