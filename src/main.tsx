import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style-main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
