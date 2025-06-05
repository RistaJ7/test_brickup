import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { siderCollapsed: false },
    reducers: {
        toggleSider: (state) => {
            state.siderCollapsed = !state.siderCollapsed;
        },
    },
});

export const { toggleSider } = uiSlice.actions;
export default uiSlice.reducer;
