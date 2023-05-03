import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";

const store = configureStore({
  reducer: {
    mode: modeSlice.reducer,
  },
});

export default store;
