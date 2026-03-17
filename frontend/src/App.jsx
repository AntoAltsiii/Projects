import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";
import Temporadas from "./pages/Temporadas";
import TemporadasFormulario from "./pages/TemporadasFormulario";

function App() {
  // lógica funcional previa a la construcción del resultado renderizable del componente
  return (
    <BrowserRouter>
    <div className="container-md mt-5">
      <Encabezado/>
      <Routes>
         <Route path="/" element={<Navigate to="/temporadas/mostrar" />} /> {/* RUTA = "/", NAVEGAR A /JUEGOS/LISTA*/}
         <Route path="/temporadas/mostrar" element={<Temporadas/>} />
         <Route path="/temporadas/nuevo" element={<TemporadasFormulario/>} />
         <Route path="/temporadas/nuevo/:id" element={<TemporadasFormulario/>} />
      </Routes>
      <PiePagina />
    </div>
    </BrowserRouter>
  );
}

export default App;
