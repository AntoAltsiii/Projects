import temporadasRepository from "../repositories/temporadasRepository.js";

class temporadasService {
     async obtenerTodos() {
        return await temporadasRepository.obtenerTodos();
    }

    async crear(data) {
        console.log("CREAR SERVICE----------------------------------", data)
        /*
        El número de temporada no puede repetirse para la misma serie.
        El año de estreno no puede ser menor que 1900 ni mayor al año actual.
        El número de episodios debe ser mayor a cero*/
        const existe = await temporadasRepository.ExistePorTySCrear(data.idSerie, data.numero)
        if (existe) {
            throw new Error("No puede crear, ya existe una temporada con ese numero para una serie")
        }
        
        const anioAct = new Date().getFullYear(); //me lo hizo gpt xd
        if (data.anioEstreno < 1900 || data.anioEstreno > anioAct) {
            throw new Error("No se puede crear, el año de la pelicula no cumple las validaciones de fecha...")
        }
        if (data.episodios <= 0) {
            throw new Error("No se puede crear, la cantidad de episodios con es positiva")
        }
        return await temporadasRepository.crear(data)
    }

    async actualizar(id, data) {
        console.log("ACTUALIZAR SERVICE----------------------------------", id, data)
        const existe = await temporadasRepository.ExistePorTySActualizar(data.idSerie, data.numero, id) //mandandolo aca evito q coincida con el mismo id de la temproada q estoy intentando actualizar
        if (existe) {
            throw new Error("No puede crear, ya existe una temporada con ese numero para una serie")
        }
        const anioAct = new Date().getFullYear(); //me lo hizo gpt xd
        if (data.anioEstreno < 1900 || data.anioEstreno > anioAct) {
            throw new Error("No se puede crear, el año de la pelicula no cumple las validaciones de fecha...")
        }
        if (data.episodios <= 0) {
            throw new Error("No se puede crear, la cantidad de episodios con es positiva")
        }
        return await temporadasRepository.actualizar(id, data)
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