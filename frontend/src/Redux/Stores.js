import { legacy_createStore as createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./Index";

export const store = createStore(rootReducer);

export const persistor = persistStore(store);
