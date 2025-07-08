import React from "react";
import Home from "./pages/Index";
import { Navigate } from "react-router-dom";
import Roda from "./pages/RodaDeConversaEmFamilia/Index";

export const routes = [
  {
    path: "/",
    // element: <Home />,
    element: <Navigate to="/roda-de-conversa-em-familia" replace />,
    index: true,
  },
  {
    path: "/roda-de-conversa-em-familia",
    element: <Roda />,
  },
];
