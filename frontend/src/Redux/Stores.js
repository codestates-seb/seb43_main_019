import { combineReducers, legacy_createStore as createStore } from "redux";
import { modeReducer } from "./Reducers";

export const rootReducer = combineReducers({ modeReducer });

export const store = createStore(rootReducer);
