import RepositorioBase from "./repositorioBase.js";
import { Op } from "sequelize";
//importamos los modelos tambien
import Temporadas from "../models/temporadas.js";
import Series from "../models/series.js";

class TemporadasRepository extends RepositorioBase{
    constructor() {
        super(Temporadas)
    }
    async obtenerTodos() {
        return this.modelo.findAll({ //En findAll({ ... }), el objeto que pasás entre llaves {} se usa para configurar la consulta en Sequelize., osea puedo ordenar, poner limits, seleccionar atributos especificos, entre otras cosas
            order: [["id", "DESC"]],
            include: { //porque hacmeos un include aca o porque agregamos cosas de mas aca?porque esto no es repositorio base, este es un repositorio un poco mas especificado para juegos, donde podemos incluir que cada juego venga con su plataforma, pero el de repositorio base es mas generico para cualquier modelo, que venga con la FK o el modelo de plataforma es mas que nada para Juegos
                model: Series, 
                as: "series"   
            }
        });
    }

    async obtenerPorId(id) { //reedefino pq este agrega ademas la FK
        return this.modelo.findByPk(id, {
            include: {
                model: Series, 
                as: "series"
            }
        });
    }
    //aca van los codifos q necesitamso redefinir

    async ExistePorTySActualizar(idSerie,numero, idTemporada) {
        return await this.modelo.findOne({
            where: {
                idSerie: idSerie,
                numero: numero,
                 id: { [Op.ne]: idTemporada } //aca tiene q tener en cuenta q no compare el mismo id
            }
        })
        // idSerie: { [Op.eq]: idSerie },
        //    numero: { [Op.eq]: numero }
    } //obtiene la temporada cuyo idSerie pasado por parametro coincida con algun elemento de la bd, si
        async ExistePorTySCrear(idSerie,numero) {
        return await this.modelo.findOne({
            where: {
                idSerie: idSerie,
                numero: numero
            }
        })
    }
    /* Listado y búsqueda de temporadas:
Filtro por título de serie (texto parcial)
Filtro por plataforma (texto exacto)
Filtro por género (texto parcial)
Límite de 50 resultados, ordenados por serie y número de temporada */
    async obtenerFiltrado({tituloSerie, plataforma, genero }={}) {
        const condiciones = []
        const condicionesSerie = {};

        if (typeof genero === 'string' && genero.trim() !== '') {
            condiciones.push({
                genero: {[Op.like]: `%${genero}%`}
            })
        }
        // Filtros de campos de Series (relacionadas)
        if (typeof tituloSerie === 'string' && tituloSerie.trim() !== '') {
            condicionesSerie.titulo = { [Op.like]: `%${tituloSerie}%` };
        }

        if (typeof plataforma === 'string' && plataforma.trim() !== '') {
            condicionesSerie.plataforma = { [Op.like]: `%${plataforma}%` };
        }

        const includeCondiciones = {
            model: Series,
            as: "series"
        };

        // Solo agregamos where si hay filtros sobre Series
        if (Object.keys(condicionesSerie).length > 0) { //Esto dice: "si tengo algún filtro sobre Series, agregalos dentro del where del include", para que Sequelize lo traduzca a SQL con un JOIN y un WHERE correspondiente.
            includeCondiciones.where = condicionesSerie;
        }

        return await this.modelo.findAll({
            where: condiciones.length ? { [Op.and]: condiciones } : undefined,
            include: [includeCondiciones],
            limit: 50,
             order: [
            [{ model: Series, as: "series" }, "titulo", "ASC"],
            ["numero", "ASC"]
        ],
        });
    }

    async obtenerGeneros() {
        return this.modelo.findAll({
            attributes: ["genero"],
            group: ["genero"] //si tiene nulls no funciona xd
        })
    }


}
export default new TemporadasRepository();