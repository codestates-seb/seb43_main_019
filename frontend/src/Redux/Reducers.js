import { DARK, LIGHT, MODE, LOGIN, LOGOUT } from "./Actions";

export const modeReducer = (state = false, action) => {
  switch (action.type) {
    case DARK:
      return true;
    case LIGHT:
      return false;
    case MODE:
      return action.payload.mode;
    default:
      return state;
  }
};

export const userReducer = (
  state = { isLogin: false, userInfo: null },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return { isLogin: true, userInfo: action.payload.userInfo };
    case LOGOUT:
      return { isLogin: false, userInfo: null };
    default:
      return state;
  }
};
