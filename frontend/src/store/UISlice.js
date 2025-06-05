import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { siderCollapsed: true },
    reducers: {
        toggleSider: (state) => {
            state.siderCollapsed = !state.siderCollapsed;
        },
        collapseSider: (state) => {
            state.siderCollapsed = true;
        },
    },
});

export const { toggleSider, collapseSider } = uiSlice.actions;
export default uiSlice.reducer;
