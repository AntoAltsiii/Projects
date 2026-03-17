export default class RepositorioBase {
    constructor(modelo) {
        this.modelo = modelo;
    }
    async obtenerTodos() {
        return this.modelo.findAll();
    }

        async crear(data) {
            console.log("CREAR REPO BASE-------------", data)
            return this.modelo.create(data);
        }

    async actualizar(id, datos) {
        console.log("ACTUALIZAR REPO BASE----------------------", id, datos)
        const idExiste = await this.modelo.findByPk(id)
        if (!idExiste) {
            throw new Error(`Error: el id no se pudo encontrar, id ${id}`);
        } else {
        return idExiste.update(datos);
        }
    }

    async eliminar(id) {
        const idExiste = await this.modelo.findByPk(id);
        if (!idExiste) {
            throw new Error(`El id ${id} no se pudo encontrar...`)
        } else {
            return await idExiste.destroy();
        }
    }

    async obtenerPorId(id) {
        return this.modelo.findByPk(id);
    }
}