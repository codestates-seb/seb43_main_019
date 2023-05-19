import { combineReducers } from "redux";
import userReducer from "./userReducer";
import modeReducer from "./modeReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["userReducer", "modeReducer"], // target (reducer name)
};

const rootReducer = combineReducers({ userReducer, modeReducer });

export default persistReducer(persistConfig, rootReducer);
