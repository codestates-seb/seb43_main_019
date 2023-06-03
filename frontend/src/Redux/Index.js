import { combineReducers } from "redux";
import UserReducer from "../Reducers/UserReducer";
import ModeReducer from "../Reducers/ModeReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["userReducer", "modeReducer"], // target (reducer name)
};

const rootReducer = combineReducers({ UserReducer, ModeReducer });

export default persistReducer(persistConfig, rootReducer);
