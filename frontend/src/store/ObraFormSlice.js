import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { criarObra } from "../services/ObraService";

export const cadastrarObraThunk = createAsyncThunk("obraForm/cadastrarObra", async (obra, { rejectWithValue }) => {
    try {
        await criarObra(JSON.stringify(obra));
        return "Obra cadastrada com sucesso!";
    } catch (error) {
        return rejectWithValue("Erro ao cadastrar obra. Verifique os dados e tente novamente.");
    }
});

const obraFormSlice = createSlice({
    name: "obraForm",
    initialState: {
        modalVisible: false,
        modalMessage: "",
        isError: false,
    },
    reducers: {
        fecharModal: (state) => {
            state.modalVisible = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(cadastrarObraThunk.fulfilled, (state, action) => {
                state.modalMessage = action.payload;
                state.isError = false;
                state.modalVisible = true;
            })
            .addCase(cadastrarObraThunk.rejected, (state, action) => {
                state.modalMessage = action.payload;
                state.isError = true;
                state.modalVisible = true;
            });
    },
});

export const { fecharModal } = obraFormSlice.actions;
export default obraFormSlice.reducer;
