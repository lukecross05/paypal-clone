import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { TransactionContextProvider } from "./context/transactionContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TransactionContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </TransactionContextProvider>
  </React.StrictMode>
);
