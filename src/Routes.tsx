import React from "react";
import Home from "./pages/Index";
import Rede from "./pages/RodaDeConversaEmFamilia/Index";

export const routes = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/rode-de-conversa-em-familia",
    element: <Rede />,
  },
];
