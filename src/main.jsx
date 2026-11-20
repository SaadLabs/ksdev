import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./App";
import AppErrorBoundary from "./AppErrorBoundary";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <React.StrictMode>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </React.StrictMode>
  </AppErrorBoundary>,
);
import "./stitch.css";
