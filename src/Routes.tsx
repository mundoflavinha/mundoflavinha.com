import Home from "./pages/Index";
import HomeV2 from "./pages/HomeV2";
import Roda from "./pages/RodaDeConversaEmFamilia/Index";
import JogoOlhouAchou from "./pages/JogoOlhouAchou/Index";
import DiaDosPais from "./pages/DiaDosPais/Index";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHomeV2 from "./pages/admin/AdminHomeV2";

export const routes = [
  {
    path: "/home-v2",
    element: <HomeV2 />,
  },
  {
    path: "/",
    element: <HomeV2 />,
    index: true,
  },
  {
    path: "/_old",
    element: <Home />,
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
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/home-v2",
    element: <AdminHomeV2 />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
