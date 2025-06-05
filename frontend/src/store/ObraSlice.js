import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getObras, getEtapasDaObra, getObraById } from "../services/ObraService";

export const fetchObras = createAsyncThunk("obra/fetchObras", async () => {
    const obras = await getObras();
    const etapasPromises = obras.map(obra => getEtapasDaObra(obra.id));
    const etapas = await Promise.all(etapasPromises);

    const obrasComEtapas = obras.map((obra, index) => ({
        ...obra,
        etapas: etapas[index],
    }));

    return obrasComEtapas;
});

export const fetchObraById = createAsyncThunk("obra/fetchObraById", async (id, { rejectWithValue }) => {
    try {
        const obra = await getObraById(id);

        const etapas = await getEtapasDaObra(id);

        return { ...obra, etapas };
    } catch (error) {
        return rejectWithValue("Erro ao buscar obra. Tente novamente.");
    }
});

const obraSlice = createSlice({
    name: "obra",
    initialState: {
        obras: [],
        status: "idle",
        error: null,
        obraSelecionada: null,
        statusObra: "idle",
        errorObra: null,
    },
    reducers: {
        limparObraSelecionada: (state) => {
            state.obraSelecionada = null;
            state.statusObra = "idle";
            state.errorObra = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchObras.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchObras.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.obras = action.payload;
            })
            .addCase(fetchObras.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // 🔹 Atualizamos para incluir as etapas ao buscar uma obra por ID
            .addCase(fetchObraById.pending, (state) => {
                state.statusObra = "loading";
            })
            .addCase(fetchObraById.fulfilled, (state, action) => {
                state.statusObra = "succeeded";
                state.obraSelecionada = action.payload;
            })
            .addCase(fetchObraById.rejected, (state, action) => {
                state.statusObra = "failed";
                state.errorObra = action.payload;
            });
    },
});

export const { limparObraSelecionada } = obraSlice.actions;
export default obraSlice.reducer;
