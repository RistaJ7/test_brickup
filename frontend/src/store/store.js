import { configureStore } from "@reduxjs/toolkit";
import obraReducer from "./ObraSlice";
import obraFormReducer from "./ObraFormSlice";
import etapaReducer from "./EtapaSlice";

export const store = configureStore({
    reducer: {
        obra: obraReducer,
        obraForm: obraFormReducer,
        etapa: etapaReducer,
    },
});
