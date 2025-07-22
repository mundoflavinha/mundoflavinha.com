import Navbar from "./Components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import OQueVaiReceberSection from "./Components/OQueVaiReceber";
import OfferSection from "./Components/OfferSection";
import GuaranteeSection from "./Components/GuaranteeSection";
import AboutFlavinhaSection from "./Components/AboutFlavinhaSection";
import PromoBannerTop from "./Components/PromoBannerTop";
import { useMundoFlavinhaSEO } from "../../hooks/useSEO";

const DiaDosPais = () => {
  useMundoFlavinhaSEO({
    title: "Kit Cartões Dia dos Pais - Conecte-se com seu Filho",
    description: "Kit especial de cartões para o Dia dos Pais. Atividades criativas para pais e filhos criarem memórias afetivas juntos. Imprima em casa!",
    productName: "Kit Cartões Dia dos Pais",
    price: "14.99",
    path: "/dia-dos-pais",
    keywords: [
      "cartões dia dos pais", 
      "atividades pai e filho", 
      "memórias afetivas", 
      "mundo flavinha",
      "kit para imprimir"
    ]
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBannerTop />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <OQueVaiReceberSection />
        <OfferSection />
        <GuaranteeSection />
        <AboutFlavinhaSection />
      </main>
      <Footer />
    </div>
  );
};

export default DiaDosPais;
