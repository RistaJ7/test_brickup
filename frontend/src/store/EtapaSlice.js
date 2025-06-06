import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEtapa } from "../services/EtapaService";

export const adicionarEtapa = createAsyncThunk("etapa/adicionarEtapa", async (etapa, { rejectWithValue }) => {
    try {
        const response = await createEtapa(etapa);
        return response;
    } catch (error) {
        return rejectWithValue("Erro ao adicionar etapa. Tente novamente.");
    }
});

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
            });
    },
});

export default etapaSlice.reducer;
