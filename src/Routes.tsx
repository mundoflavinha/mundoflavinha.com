import Home from "./pages/Index";
import Roda from "./pages/RodaDeConversaEmFamilia/Index";
import JogoOlhouAchou from "./pages/JogoOlhouAchou/Index";
import DiaDosPais from "./pages/DiaDosPais/Index";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import NotFound from "./pages/NotFound";

export const routes = [
  {
    path: "/",
    element: <Home />,
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
  {
    path: "/politica-de-privacidade",
    element: <PoliticaDePrivacidade />,
  },
  {
    path: "/termos-de-uso",
    element: <TermosDeUso />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
