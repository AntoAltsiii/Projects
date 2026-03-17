import axios from "./axios.config.js";

const obtenerTodos = async () => {
    const response = await axios.get("/temporadas")
    return response.data
}

const obtenerGeneros = async () => {
    const response = await axios.get("/temporadas/generos")
    return response.data
}

const obtenerFiltrados = async (data) => {
    const response = await axios.get("/temporadas/filtrado", {
        params: {
            tituloSerie: data.tituloSerie,
            plataforma: data.plataforma,
            genero: data.genero
        }
    })
    return response.data
}

const obtenerPorId = async (id) => {
    const response = await axios.get(`/temporadas/${id}`)
    return response.data
}

const eliminar = async (id) => {
    const response = await axios.delete(`/temporadas/${id}`)
    return response.data
}

const crear = async (data) => {
    const response = await axios.post(`/temporadas`, data)
    return response.data
}

const actualizar = async (id, data) => {
    const response = await axios.put(`/temporadas/${id}`, data)
    return response.data
}
export default {
    obtenerGeneros,
    obtenerTodos,
    obtenerFiltrados,
    obtenerPorId,
    eliminar,
    crear,
    actualizar
}