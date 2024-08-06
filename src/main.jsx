import GlobalStyles from "@/styles/GlobalStyles";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

// import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
