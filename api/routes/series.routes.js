import express from "express";
import seriesService from "../services/seriesService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const series = await seriesService.obtenerTodos()
        res.json(series)
    } catch (err) {
        res.status(500).json({ error: "No se pudieron obtener las series" })
    }
});

router.get("/plataformas", async (req, res) => {
    try {
        const plataformas = await seriesService.obtenerPlataformas()
        res.json(plataformas)
    }catch (err) {
        res.status(500).json({ error: "No se pudieron obtener las plataformas" })
    }
})


router.get("/:id", async (req, res) => {
    try {  
        const idNumero = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).json({ error: "Id invalido" });
        }

        const serie = await seriesService.obtenerPorId(idNumero)
        if (!serie) {
            return res.status(404).json({ error: "Serie no encontrada" });
        }

        res.json(serie)
    }catch (err) {
        res.status(500).json({ error: "No se pudo obtener la serie" })
    }
});


export default router;