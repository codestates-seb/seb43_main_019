import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import App from "./App";
import store from "./Redux/Store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import GlobalStyle from "./Style/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
