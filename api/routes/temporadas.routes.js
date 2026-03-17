import express from "express";
import temporadasService from "../services/temporadasService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {   
        const tmps = await temporadasService.obtenerTodos();
        res.json(tmps);
    }catch (err) {
        res.status(500).json({ error: "No se pudieron obtener las temporadas" })
    }
});

router.post("/", async (req, res) => {
    try {
        const crear = await temporadasService.crear(req.body);
        res.status(201).json(crear);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});

router.put("/:id", async (req, res) => {
    try {
        const idNumero = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).json({ error: "Id invalido" });
        }

        const actualizado = await temporadasService.actualizar(idNumero, req.body);
        res.json(actualizado);
    }catch (err) {
        res.status(400).json({ error: err.message })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const idNumero = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).json({ error: "Id invalido" });
        }

        await temporadasService.eliminar(idNumero)
        res.status(204).end();
    }catch(err){
        res.status(400).json({ error: err.message })
    }
});

router.get("/filtrado", async (req, res) => {
    try {
        const filtrado = await temporadasService.obtenerFiltrados(req.query)
        res.json(filtrado)
    }catch (err) {
        res.status(500).json({ error: "No se pudieron filtrar las temporadas" })
    }
});

router.get("/generos", async (req, res) => {
    try {
        const generos = await temporadasService.obtenerGeneros()
        res.json(generos)
    }catch (err) {
        res.status(500).json({ error: "No se pudieron obtener los generos" })
    }
});









router.get("/:id", async (req,res) => {
    try {
        const idNumero = Number.parseInt(req.params.id, 10);
        if (!Number.isInteger(idNumero) || idNumero <= 0) {
            return res.status(400).json({ error: "Id invalido" });
        }

        const temporada = await temporadasService.obtenerPorId(idNumero)
        if (!temporada) {
            return res.status(404).json({ error: "Temporada no encontrada" });
        }

        res.json(temporada)
    }catch (err) {
        res.status(500).json({ error: "No se pudo obtener la temporada" })
    }
});

export default router;

