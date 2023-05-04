import { combineReducers, legacy_createStore as createStore } from "redux";
import { modeReducer, userReducer } from "./Reducers";
import { persistStore } from "redux-persist";

export const rootReducer = combineReducers({ modeReducer, userReducer });

export const store = createStore(rootReducer);

export const persistor = persistStore(store);
