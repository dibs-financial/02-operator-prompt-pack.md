import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { DeskProvider } from "./store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DeskProvider>
      <App />
    </DeskProvider>
  </React.StrictMode>
);
