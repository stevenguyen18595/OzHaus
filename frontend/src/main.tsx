import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "../src/App";

declare global {
  interface Window {
    env: {
      baseUrl: string;
    };
  }
}
// initialise config before React initialises
try {
  const res = await fetch("./appsettings.json");
  const json = await res.json();
  window.env = {
    baseUrl: json?.AppSettings?.Host ?? "",
  };
} catch (err) {
  window.env = { baseUrl: "" };
  console.error("Failed to load appsettings.json", err);
}

console.log("runtime baseUrl:", window.env.baseUrl);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
