// src/pages/JogoOlhouAchou/Index.tsx
import Navbar from "./Components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import MothersPainsSection from "./Components/MothersPainsSection";
import ForWhoSection from "./Components/ForWhoSection";
import BonusSection from "./Components/BonusSection";
import OfferSection from "./Components/OfferSection";
import GuaranteeSection from "./Components/GuaranteeSection";
import AboutFlavinhaSection from "./Components/AboutFlavinhaSection";
import PromoBannerTop from "./Components/PromoBannerTop";
import { useMundoFlavinhaSEO } from "../../hooks/useSEO";

const JogoOlhouAchou = () => {

  useMundoFlavinhaSEO({
    title: "Jogo Olhou Achou - Desenvolve Atenção e Concentração",
    description: "Jogo educativo Olhou Achou para crianças. Desenvolve atenção, concentração e vocabulário de forma divertida. Ideal para casa e escola. Imprima e brinque!",
    productName: "Jogo Olhou Achou",
    price: "19.99",
    path: "/jogo-olhou-achou",
    keywords: [
      "jogo educativo",
      "olhou achou", 
      "atenção",
      "concentração",
      "vocabulário",
      "crianças",
      "mundo flavinha",
      "jogo para imprimir",
      "educação infantil",
      "desenvolvimento cognitivo",
      "atividades pedagógicas"
    ]
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBannerTop />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MothersPainsSection />
        <ForWhoSection />
        <BonusSection />
        <OfferSection />
        <GuaranteeSection />
        <AboutFlavinhaSection />
      </main>
      <Footer />
    </div>
  );
};

export default JogoOlhouAchou;