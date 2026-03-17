import express from "express";
import seriesService from "../services/seriesService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const series = await seriesService.obtenerTodos()
        res.json(series)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
});

router.get("/plataformas", async (req, res) => {
    console.log("llego? PLATAFORMAS ROUTES---------------------------")
    try {
        const plataformas = await seriesService.obtenerPlataformas()
        res.json(plataformas)
    }catch (err) {
        res.status(500).json({error:err.message})
    }
})


router.get("/:id", async (req, res) => {
    try {  
        const id = await seriesService.obtenerPorId(parseInt(req.params.id))
        res.json(id)
    }catch (err) {
        res.status(500).json({error:err.message})
    }
});


export default router;