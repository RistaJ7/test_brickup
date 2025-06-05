import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getObras } from "../services/ObraService";

export const fetchObras = createAsyncThunk("obra/fetchObras", async () => {
    const response = await getObras();
    return response;
});

const obraSlice = createSlice({
    name: "obra",
    initialState: {
        obras: [],
        status: "idle",
        error: null,
    },
    reducers: {},
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
            });
    },
});

export default obraSlice.reducer;
