import axios from "./axios.config.js";

const obtenerTodos = async () => {
    const response = await axios.get("/series")
    return response.data
};

const obtenerPlataformas = async () => {
    const response = await axios.get("/series/plataformas")
    return response.data
}

export default {
    obtenerTodos, 
    obtenerPlataformas
}