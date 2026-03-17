import express from "express";
import temporadasService from "../services/temporadasService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {   
        const tmps = await temporadasService.obtenerTodos();
        res.json(tmps);
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post("/", async (req, res) => {
    console.log("CREANDO? ROUTERS-----------------------", req.body)
    try {
        const crear = await temporadasService.crear(req.body);
        res.status(201).json(crear);
    } catch (err) {
        res.status(500).json({error:err.message})
    }
});

router.put("/:id", async (req, res) => {
    console.log("ACTUALIZANOD ROTUERS?------------------------" ,parseInt(req.params.id),"req body: ", req.body)
    try {
        const actualizado = await temporadasService.actualizar(parseInt(req.params.id),req.body);
        res.json(actualizado);
    }catch (err) {
        res.status(400).json({error:err.message}) //no ecnotrado
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await temporadasService.eliminar(parseInt(req.params.id))
        res.status(204).end();
    }catch(err){
        res.status(500).json({error:err.message})
    }
});

router.get("/filtrado", async (req, res) => {
    try {
        const filtrado = await temporadasService.obtenerFiltrados(req.query)
        res.json(filtrado)
    }catch (err) {
        res.status(400).json({error:err.message})
    }
});

router.get("/generos", async (req, res) => {
    try {
        const generos = await temporadasService.obtenerGeneros()
        res.json(generos)
    }catch (err) {
        res.status(500).json({error:err.message})
    }
});









router.get("/:id", async (req,res) => {
    try {
        const id = await temporadasService.obtenerPorId(parseInt(req.params.id))
        res.json(id)
    }catch (err) {
        res.status(500).json({error:err.message})
    }
});

export default router;

