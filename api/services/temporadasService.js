import temporadasRepository from "../repositories/temporadasRepository.js";

class temporadasService {
     async obtenerTodos() {
        return await temporadasRepository.obtenerTodos();
    }

    validarDatosTemporada(data) {
        const anioAct = new Date().getFullYear();
        const idSerie = Number.parseInt(data.idSerie, 10);
        const numero = Number.parseInt(data.numero, 10);
        const episodios = Number.parseInt(data.episodios, 10);
        const anioEstreno = Number.parseInt(data.anioEstreno, 10);

        if (!Number.isInteger(idSerie) || idSerie <= 0) {
            throw new Error("idSerie invalido");
        }
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new Error("El numero de temporada debe ser mayor a cero");
        }
        if (!Number.isInteger(episodios) || episodios <= 0) {
            throw new Error("La cantidad de episodios debe ser mayor a cero");
        }
        if (!Number.isInteger(anioEstreno) || anioEstreno < 1900 || anioEstreno > anioAct) {
            throw new Error("El anio de estreno debe estar entre 1900 y el anio actual");
        }
        if (typeof data.genero !== "string" || data.genero.trim() === "") {
            throw new Error("El genero es obligatorio");
        }
        if (typeof data.creador !== "string" || data.creador.trim() === "") {
            throw new Error("El creador es obligatorio");
        }

        return {
            ...data,
            idSerie,
            numero,
            episodios,
            anioEstreno,
            genero: data.genero.trim(),
            creador: data.creador.trim()
        };
    }

    async crear(data) {
        const payload = this.validarDatosTemporada(data);

        const existe = await temporadasRepository.ExistePorTySCrear(payload.idSerie, payload.numero)
        if (existe) {
            throw new Error("No puede crear, ya existe una temporada con ese numero para una serie")
        }

        return await temporadasRepository.crear(payload)
    }

    async actualizar(id, data) {
        const payload = this.validarDatosTemporada(data);

        const existe = await temporadasRepository.ExistePorTySActualizar(payload.idSerie, payload.numero, id)
        if (existe) {
            throw new Error("No puede crear, ya existe una temporada con ese numero para una serie")
        }
        return await temporadasRepository.actualizar(id, payload)
    }

    async eliminar(id) {
        return await temporadasRepository.eliminar(id)
    }

    async obtenerPorId(id) {
        return await temporadasRepository.obtenerPorId(id);
    }

    async obtenerFiltrados({tituloSerie, plataforma, genero}={}) {
        return await temporadasRepository.obtenerFiltrado({tituloSerie, plataforma, genero});
    }

    async obtenerGeneros() {
        return await temporadasRepository.obtenerGeneros();
    }

}
export default new temporadasService();