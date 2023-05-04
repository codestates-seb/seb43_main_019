import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.userInfo = null;
    },
  },
});

export default userSlice;
export const { login, logout } = userSlice.actions;
