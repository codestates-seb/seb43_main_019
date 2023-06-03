import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import ModeReducer from "./ModeReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["UserReducer", "ModeReducer"], // target (reducer name)
};

const rootReducer = combineReducers({ UserReducer, ModeReducer });

export default persistReducer(persistConfig, rootReducer);
