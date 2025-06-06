import api from "./Api";

const URI = "/etapas";

export const criarEtapa = async (etapa) => {
    try {
        const response = await api.post(`${URI}`, etapa, {
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

export const atualizarEtapa = async (id, etapa) => {
    try {
        const response = await api.put(`${URI}/${id}`, etapa, {
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