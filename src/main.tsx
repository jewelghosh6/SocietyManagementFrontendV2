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
import "./App.css";
import "./css/home-page.css";
import "./css/layout.style.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <App />
    </QueryClientProvider>

  </React.StrictMode>
);
