import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    mode: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export default modeSlice;
export const { mode } = modeSlice.actions;
