import React from "react";
import Home from "./pages/Index";
import Roda from "./pages/RodaDeConversaEmFamilia/Index";

export const routes = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/roda-de-conversa-em-familia",
    element: <Roda />,
  },
];
