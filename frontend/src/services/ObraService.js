import api from "./Api";

const URI = "/obras";

export const getObras = async () => {
    try {
        const response = await api.get(`${URI}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obras:", error);
        throw error;
    }
};

export const getEtapasDaObra = async (idObra) => {
    try {
        const response = await api.get(`${URI}/${idObra}/etapas`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obras:", error);
        throw error;
    }
};

export const createObra = async (obra) => {
    try {
        const response = await api.post(`${URI}`, obra, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar obra:", error);
        throw error;
    }
};

export const getObraById = async (id) => {
    try {
        const response = await api.get(`${URI}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obra:", error);
        throw error;
    }
};
