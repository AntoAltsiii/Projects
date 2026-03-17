import express from 'express';
import sequelize from './db.js';
import cors from "cors";
import logger from "./middlewares/logger.js";
//importas las routes aca:
import temporadasRouter from "./routes/temporadas.routes.js"
import seriesRouter from "./routes/series.routes.js"


const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({
  origin: CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app
  .use(express.json({ limit: "100kb" }))
  .use(express.urlencoded({ extended: true }));
  
app.use(logger);
// #endregion

// Ruta principal de servidor
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

// Agregar endpoints aquí
app
  .use("/api/temporadas", temporadasRouter)
  .use("/api/series", seriesRouter);
  //.use("/api/plataformas", plataformasRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

(async function start() {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar la API:", error);
    process.exit(1);
  }
})();
