import api from "./Api";

const URI = "/obras";

export const buscarTodasObras = async () => {
    try {
        const response = await api.get(`${URI}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obras:", error);
        throw error;
    }
};

export const buscarEtapasDaObra = async (idObra) => {
    try {
        const response = await api.get(`${URI}/${idObra}/etapas`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obras:", error);
        throw error;
    }
};

export const criarObra = async (obra) => {
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

export const buscarObraPorId = async (id) => {
    try {
        const response = await api.get(`${URI}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obra:", error);
        throw error;
    }
};

export const buscarQuantEtapasConluidasObra = async (id) => {
    try {
        const response = await api.get(`${URI}/obrasEtapasConcluidas/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar obra:", error);
        throw error;
    }
};

export const atualizarObra = async (id, obra) => {
    try {
        const response = await api.put(`${URI}/${id}`, obra, {
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