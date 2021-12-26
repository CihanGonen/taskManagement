import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DbContextProvider } from "./context/DbContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DbContextProvider>
        <App />
      </DbContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
