import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store, persistor } from "./Redux/Stores";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "./Style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <PersistGate persistor={persistor}>
          <GlobalStyle />
          <App />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
