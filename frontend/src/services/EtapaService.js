import api from "./Api";

const URI = "/etapas";

export const createEtapa = async (etapa) => {
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