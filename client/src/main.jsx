
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App.jsx";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nouvelle mise à jour dispo ! Recharger ?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("L'application est prête pour une utilisation hors ligne !");
  },
});

function AppWrapper() {
  useEffect(() => {
    updateSW();
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);