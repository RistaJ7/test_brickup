import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./UISlice";
import obraReducer from "./ObraSlice";
import obraFormReducer from "./ObraFormSlice";
import etapaReducer from "./EtapaSlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        obra: obraReducer,
        obraForm: obraFormReducer,
        etapa: etapaReducer,
    },
});
