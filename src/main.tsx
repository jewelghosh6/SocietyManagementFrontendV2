import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style-main.css";
import "./css/themeToggle.css"
import "./css/dashboard.style.css"
import "./css/manage-user.style.css"
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme


import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>

      <Toaster
        position="top-right"
        reverseOrder={false} />
      <App />
    </PrimeReactProvider>

  </React.StrictMode>
);
