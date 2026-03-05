import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MothersPainsSection from "../components/MothersPainsSection";
import FeaturesSection from "../components/FeaturesSection";
import FeaturedProductSection from "../components/FeaturedProductSection";
import ProductsSection from "../components/ProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import SkipLink from "../components/SkipLink";
import { useMundoFlavinhaSEO } from "../hooks/useSEO";

const Index = () => {
  useMundoFlavinhaSEO({
    title: "Mundo Flavinha | Home antiga (_OLD)",
    description:
      "Versao anterior da home do Mundo Flavinha, mantida para referencia visual e historico de estrutura.",
    path: "/_old",
    keywords: ["mundo flavinha", "atividades para criancas", "jogos educativos"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Navbar homeVersion="v1" />
      <main id="main-content">
        <HeroSection />
        <MothersPainsSection />
        <FeaturesSection />
        <FeaturedProductSection />
        <ProductsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
