import api from "./Api";

export const getObras = async () => {
    try {
        const response = await api.get(`/obras`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obras:", error);
        throw error;
    }
};

export const getEtapasDaObra = async (idObra) => {
    try {
        const response = await api.get(`obras/${idObra}/etapas`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obras:", error);
        throw error;
    }
};