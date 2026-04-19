# Procesador de Texto - Analizador de Frecuencia de Alto Rendimiento

Este proyecto es una herramienta optimizada para el análisis de frecuencia de palabras en grandes volúmenes de texto, desarrollada en Python.

## Decisiones de Diseño y Optimización

Para garantizar la eficiencia y el alto rendimiento del analizador, se implementaron las siguientes estrategias técnicas:

1. **Uso de Expresiones Regulares para Tokenización**:
   - Se utiliza el módulo `re` con patrones optimizados (`\b\w+\b`) para una extracción de palabras rápida y precisa, evitando el overhead de procesamientos manuales de strings.

2. **Eficiencia en la Memoria y Tiempo**:
   - El uso de `collections.Counter` permite un conteo de frecuencia en tiempo lineal $O(n)$, donde $n$ es el número de palabras. Esta es la forma más eficiente en Python para realizar histogramas de frecuencia.
   - El procesamiento se realiza convirtiendo a minúsculas en un solo paso para normalizar los datos sin múltiples iteraciones costosas.

3. **Arquitectura de Bajo Acoplamiento**:
   - El código está estructurado para separar la lógica de procesamiento de la entrada de datos, permitiendo escalar a flujos de datos más grandes o integraciones con facilidad.

4. **Robustez y Manejo de Errores**:
   - Se implementó un manejo de excepciones exhaustivo para asegurar que el programa no falle ante archivos inexistentes o formatos inesperados, garantizando la continuidad en entornos de producción.

## Cómo Ejecutar
```bash
python src/analizador.py
```

## Estructura para Distribución (ZIP)
El proyecto está optimizado para su distribución inmediata:
- Sin dependencias externas pesadas (usa solo bibliotecas estándar de Python).
- Sin archivos temporales o de caché.
- Listo para ser comprimido y ejecutado.

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
