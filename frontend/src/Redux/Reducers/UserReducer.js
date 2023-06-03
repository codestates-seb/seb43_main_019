import { LOGIN, LOGOUT } from "../Actions";

const userReducer = (state = { login: false, userInfo: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return { login: true, userInfo: action.payload.userInfo };
    case LOGOUT:
      return { login: false, userInfo: null };
    default:
      return state;
  }
};

export default userReducer;
