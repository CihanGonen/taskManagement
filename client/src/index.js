import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BaskanliklarContextProvider } from "./context/BaskanliklarContext";
import { TaleplerContextProvider } from "./context/TaleplerContext";
import { PersonellerContextProvider } from "./context/PersonellerContext";
import { BaskanlarContextProvider } from "./context/BaskanlarContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BaskanliklarContextProvider>
        <TaleplerContextProvider>
          <PersonellerContextProvider>
            <BaskanlarContextProvider>
              <App />
            </BaskanlarContextProvider>
          </PersonellerContextProvider>
        </TaleplerContextProvider>
      </BaskanliklarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
