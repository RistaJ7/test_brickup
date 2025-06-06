import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { atualizarObra, buscarEtapasDaObra, buscarObraPorId, buscarQuantEtapasConluidasObra, buscarTodasObras, deletarObraPorId } from "../services/ObraService";

export const buscarTodasObrasThunk = createAsyncThunk("obra/buscarTodasObrasThunk", async () => {
    const obras = await buscarTodasObras();
    const etapasPromises = obras.map(obra => buscarEtapasDaObra(obra.id));
    const etapas = await Promise.all(etapasPromises);

    const obrasComEtapas = obras.map((obra, index) => ({
        ...obra,
        etapas: etapas[index],
    }));

    return obrasComEtapas;
});

export const buscarObraPorIdThunk = createAsyncThunk("obra/buscarObraPorIdThunk", async (id, { rejectWithValue }) => {
    try {
        const obra = await buscarObraPorId(id);

        const etapas = await buscarEtapasDaObra(id);

        return { ...obra, etapas };
    } catch (error) {
        return rejectWithValue("Erro ao buscar obra. Tente novamente.");
    }
});

export const buscarQuantEtapasConcluidasObraThunk = createAsyncThunk(
    "obra/buscarQuantEtapasConcluidasObra",
    async (id, { rejectWithValue }) => {
        try {
            const data = await buscarQuantEtapasConluidasObra(id);
            return data;
        } catch (error) {
            return rejectWithValue("Erro ao buscar quantidade de etapas concluídas.");
        }
    }
);

export const atualizarObraThunk = createAsyncThunk(
    "obra/atualizarObraThunk",
    async ({ id, obra }, { rejectWithValue }) => {
        try {
            const data = await atualizarObra(id, obra);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Erro ao atualizar obra.");
        }
    }
);

export const deletarObraThunk = createAsyncThunk(
    "obra/deletarObra",
    async (id, { rejectWithValue }) => {
        try {
            await deletarObraPorId(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Erro ao deletar obra.");
        }
    }
);

const obraSlice = createSlice({
    name: "obra",
    initialState: {
        obras: [],
        status: "idle",
        error: null,
        obraSelecionada: null,
        statusObra: "idle",
        errorObra: null,
        quantEtapasConcluidas: null,
        statusQuantEtapas: "idle",
        errorQuantEtapas: null,
    },
    reducers: {
        limparObraSelecionada: (state) => {
            state.obraSelecionada = null;
            state.statusObra = "idle";
            state.errorObra = null;
            state.quantEtapasConcluidas = null;
            state.statusQuantEtapas = "idle";
            state.errorQuantEtapas = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(buscarTodasObrasThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(buscarTodasObrasThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.obras = action.payload;
            })
            .addCase(buscarTodasObrasThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(buscarObraPorIdThunk.pending, (state) => {
                state.statusObra = "loading";
            })
            .addCase(buscarObraPorIdThunk.fulfilled, (state, action) => {
                state.statusObra = "succeeded";
                state.obraSelecionada = action.payload;
            })
            .addCase(buscarObraPorIdThunk.rejected, (state, action) => {
                state.statusObra = "failed";
                state.errorObra = action.payload;
            })
            .addCase(buscarQuantEtapasConcluidasObraThunk.pending, (state) => {
                state.statusQuantEtapas = "loading";
            })
            .addCase(buscarQuantEtapasConcluidasObraThunk.fulfilled, (state, action) => {
                state.statusQuantEtapas = "succeeded";
                state.quantEtapasConcluidas = action.payload;
            })
            .addCase(buscarQuantEtapasConcluidasObraThunk.rejected, (state, action) => {
                state.statusQuantEtapas = "failed";
                state.errorQuantEtapas = action.payload;
            })
            .addCase(atualizarObraThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(atualizarObraThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.obras.findIndex(obra => obra.id === action.payload.id);
                if (index !== -1) {
                    state.obras[index] = action.payload;
                }
            })
            .addCase(atualizarObraThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deletarObraThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletarObraThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.obras = state.obras.filter(obra => obra.id !== action.payload);
            })
            .addCase(deletarObraThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { limparObraSelecionada } = obraSlice.actions;
export default obraSlice.reducer;
