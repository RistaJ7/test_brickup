import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { atualizarEtapa, criarEtapa } from "../services/EtapaService";

export const adicionarEtapaThunk = createAsyncThunk("etapa/adicionarEtapa", async (etapa, { rejectWithValue }) => {
    try {
        const response = await criarEtapa(etapa);
        return response;
    } catch (error) {
        return rejectWithValue("Erro ao adicionar etapa. Tente novamente.");
    }
});

export const atualizarEtapaThunk = createAsyncThunk(
    "etapa/atualizarEtapaThunk",
    async ({ id, etapa }, { rejectWithValue }) => {
        try {
            const data = await atualizarEtapa(id, etapa);
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
            .addCase(adicionarEtapaThunk.pending, (state) => {
                state.statusEtapas = "loading";
                state.errorEtapas = null;
            })
            .addCase(adicionarEtapaThunk.fulfilled, (state, action) => {
                state.statusEtapas = "succeeded";
                state.etapas.push(action.payload);
            })
            .addCase(adicionarEtapaThunk.rejected, (state, action) => {
                state.statusEtapas = "failed";
                state.errorEtapas = action.payload;
                console.error(action.payload);
            })
            .addCase(atualizarEtapaThunk.pending, (state) => {
                state.statusEtapas = "loading";
                state.errorEtapas = null;
            })
            .addCase(atualizarEtapaThunk.fulfilled, (state) => {
                state.statusEtapas = "succeeded";
                state.errorEtapas = null;
            })
            .addCase(atualizarEtapaThunk.rejected, (state, action) => {
                state.statusEtapas = "failed";
                state.errorEtapas = action.payload;
            });
    },
});

export default etapaSlice.reducer;