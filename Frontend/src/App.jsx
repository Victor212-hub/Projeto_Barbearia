import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import RouteEffects from "./routes/RouteEffects";
import { api } from "./config/api.js";

function App() {
  
  useEffect(() => {
    api.get("/api/servicos")
      .then((data) => console.log("Serviços:", data))
      .catch((error) => console.error("Erro na API:", error));
  }, []);

  return (
    <>
      <RouteEffects />
      <AppRoutes />
    </>
  );
}

export default App;