import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEtapa, atualizarEtapa as atualizarEtapaService } from "../services/EtapaService";

export const adicionarEtapa = createAsyncThunk("etapa/adicionarEtapa", async (etapa, { rejectWithValue }) => {
    try {
        const response = await createEtapa(etapa);
        return response;
    } catch (error) {
        return rejectWithValue("Erro ao adicionar etapa. Tente novamente.");
    }
});

export const atualizarEtapa = createAsyncThunk(
    "etapa/atualizarEtapa",
    async ({ id, etapa }, { rejectWithValue }) => {
        try {
            const data = await atualizarEtapaService(id, etapa);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Erro ao atualizar etapa.");
        }
    }
);

const etapaSlice = createSlice({
    name: "etapa",
    initialState: {
        etapas: [],
        statusEtapas: "idle",
        errorEtapas: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adicionarEtapa.pending, (state) => {
                state.statusEtapas = "loading";
                state.errorEtapas = null;
            })
            .addCase(adicionarEtapa.fulfilled, (state, action) => {
                state.statusEtapas = "succeeded";
                state.etapas.push(action.payload);
            })
            .addCase(adicionarEtapa.rejected, (state, action) => {
                state.statusEtapas = "failed";
                state.errorEtapas = action.payload;
                console.error(action.payload);
            })
            .addCase(atualizarEtapa.pending, (state) => {
                state.statusEtapas = "loading";
                state.errorEtapas = null;
            })
            .addCase(atualizarEtapa.fulfilled, (state) => {
                state.statusEtapas = "succeeded";
                state.errorEtapas = null;
            })
            .addCase(atualizarEtapa.rejected, (state, action) => {
                state.statusEtapas = "failed";
                state.errorEtapas = action.payload;
            });
    },
});

export default etapaSlice.reducer;