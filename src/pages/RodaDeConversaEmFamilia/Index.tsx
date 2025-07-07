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
import PromoBannerTop from "../../components/PromoBannerTop";

const RodaDeConversaEmFamilia = () => {
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