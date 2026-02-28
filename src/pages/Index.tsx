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
    title: "Mundo Flavinha",
    description: "Atividades ludicas, jogos educativos e materiais praticos para fortalecer o vinculo entre pais e filhos.",
    path: "/",
    keywords: ["mundo flavinha", "atividades para criancas", "jogos educativos"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Navbar />
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
