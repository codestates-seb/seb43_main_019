import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store, persistor } from "./Redux/Stores";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "./Style/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

/*
<PersistGate persistor={persistor}>
</PersistGate>
*/
