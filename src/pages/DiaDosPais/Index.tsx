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
import { FacebookPixel } from './Components/FacebookPixel';

const DiaDosPais = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Kit Cartões Dia dos Pais | Mundo Flavinha - Conecte-se com seu Filho</title>
        <meta name="description" content="Kit especial de cartões para o Dia dos Pais. Atividades criativas para pais e filhos criarem memórias afetivas juntos. Imprima em casa!" />
        
        {/* Open Graph para redes sociais */}
        <meta property="og:title" content="Kit Cartões Dia dos Pais | Mundo Flavinha" />
        <meta property="og:description" content="Transforme o Dia dos Pais em momento especial com cartões criativos. Monte com seu filho e emocione o papai!" />
        <meta property="og:image" content="https://www.mundoflavinha.com/images/dia-dos-pais-og.jpg" />
        <meta property="og:url" content="https://www.mundoflavinha.com/dia-dos-pais" />
        
        {/* Schema.org para rich snippets */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Kit Cartões Dia dos Pais",
              "description": "Kit especial de cartões para o Dia dos Pais",
              "brand": "Mundo Flavinha",
              "offers": {
                "@type": "Offer",
                "price": "14.99",
                "priceCurrency": "BRL"
              }
            }
          `}
        </script>
      </Helmet>

      <FacebookPixel />
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