import { configureStore } from "@reduxjs/toolkit";

import modeSlice from "./modeSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    mode: modeSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
