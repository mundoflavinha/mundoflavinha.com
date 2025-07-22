import Navbar from "./Components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import MothersPainsSection from "./Components/MothersPainsSection";
import ForWhoSection from "./Components/ForWhoSection";
import BonusSection from "./Components/BonusSection";
import OfferSection from "./Components/MyProductsOfferSection";
import GuaranteeSection from "./Components/GuaranteeSection";
import AboutFlavinhaSection from "./Components/AboutFlavinhaSection";
import PromoBannerTop from "./Components/PromoBannerTop";
import { useMundoFlavinhaSEO } from "../../hooks/useSEO";

const RodaDeConversaEmFamilia = () => {

  useMundoFlavinhaSEO({
    title: "Roda de Conversa em Família - Conexão e Diálogo",
    description: "Jogo de perguntas e atividades para criar conversas significativas em família. Fortaleça vínculos, desenvolva comunicação e crie momentos especiais de conexão.",
    productName: "Roda de Conversa em Família",
    price: "24.99",
    path: "/roda-de-conversa-em-familia",
    keywords: [
      "roda de conversa",
      "conversa em família",
      "diálogo familiar",
      "comunicação família",
      "perguntas família",
      "conexão familiar",
      "vínculo pais filhos",
      "mundo flavinha",
      "comunicação infantil",
      "desenvolvimento emocional",
      "tempo em família",
      "conversas significativas"
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

export default RodaDeConversaEmFamilia; 