import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MothersPainsSection from "../components/MothersPainsSection";
import FeaturesSection from "../components/FeaturesSection";
import HighlightedProductsSection from "../components/HighlightedProductsSection";
import FeaturedProductSection from "../components/FeaturedProductSection";
import ProductsSection from "../components/ProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <MothersPainsSection />
        <FeaturesSection />
        <HighlightedProductsSection />
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
