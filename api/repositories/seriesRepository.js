import RepositorioBase from "./repositorioBase.js";
import { Op } from "sequelize";
import Series from "../models/series.js";

class SeriesRepository extends RepositorioBase{
    constructor() {
        super(Series)
    }
    async obtenerTodos() {
        return this.modelo.findAll()
    }
    async obtenerPorId(id) {
        return this.modelo.findByPk(id)
    }

    async obtenerPlataformas() {
        console.log("LLEGO?")
        return this.modelo.findAll({
            attributes: ["plataforma"]
        })
    }
}
export default new SeriesRepository