import seriesRepository from "../repositories/seriesRepository.js";

class seriesService {
    async obtenerTodos() {
        return await seriesRepository.obtenerTodos()
    }
    async obtenerPorId(id) {
        return await seriesRepository.obtenerPorId(id)
    }

    async obtenerPlataformas() {
        return await seriesRepository.obtenerPlataformas()
    }
}
export default new seriesService();