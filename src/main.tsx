import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style-main.css";
import "./css/themeToggle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false} />
    <App />
  </React.StrictMode>
);
