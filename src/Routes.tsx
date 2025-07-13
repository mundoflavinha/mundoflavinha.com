import React from "react";
import Home from "./pages/Index";
import { Navigate } from "react-router-dom";
import Roda from "./pages/RodaDeConversaEmFamilia/Index";
import JogoOlhouAchou from "./pages/JogoOlhouAchou/Index";
import DiaDosPais from "./pages/DiaDosPais/Index";

export const routes = [
  {
    path: "/",
    // element: <Home />,
    element: <Navigate to="/dia-dos-pais" replace />,
    index: true,
  },
  {
    path: "/jogo-olhou-achou",
    element: <JogoOlhouAchou />,
  },
  {
    path: "/roda-de-conversa-em-familia",
    element: <Roda />,
  },
  {
    path: "/dia-dos-pais",
    element: <DiaDosPais />,
  },
];
