import { DARK, LIGHT, MODE } from "../Actions";

const ModeReducer = (state = false, action) => {
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

export default ModeReducer;
