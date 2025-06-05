import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./UISlice";
import obraReducer from "./ObraSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        obra: obraReducer,
    },
});
