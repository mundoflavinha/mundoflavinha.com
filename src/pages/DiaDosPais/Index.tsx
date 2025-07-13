import Navbar from "./Components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import OQueVaiReceberSection from "./Components/OQueVaiReceber";
import OfferSection from "./Components/OfferSection";
import GuaranteeSection from "./Components/GuaranteeSection";
import AboutFlavinhaSection from "./Components/AboutFlavinhaSection";
import PromoBannerTop from "./Components/PromoBannerTop";
import { Helmet } from 'react-helmet-async';

const DiaDosPais = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Mundo Flavinha - Cartãoes para o dia dos pais</title>
        <meta name="description" content="Jogo Olhou Achou" />
      </Helmet>
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