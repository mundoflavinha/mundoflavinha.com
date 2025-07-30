import { Button } from "../../../components/ui/button";
import { useScrollToSection } from "../../../hooks/useSmoothScroll";

const PromoBannerTop = () => {
  
  const scrollToSection = useScrollToSection({
    duration: 700,
    offset: 80
  });

  return (
    // <div className="w-full bg-[#45a29e] text-white text-center py-3 px-2 font-bold text-base md:text-lg shadow-md animate-pulse-slow flex flex-col md:flex-row items-center justify-center gap-2">
    <div className="w-full bg-quinary text-white text-center py-3 px-2 font-bold text-base md:text-lg shadow-md animate-pulse-slow flex flex-col md:flex-row items-center justify-center gap-2">
      <span>
        Corra e garanta o seu kit, pois é por tempo limitado!
      </span>
      <Button 
        id="btnPromoBannerTopGoCheckout"
        data-track="checkout-button"
        data-button-location="promo-banner-top"
        data-button-text="Aproveitar agora"
        onClick={() => scrollToSection("#limited-offer")} 
        className="...suas classes..."
      >
        Aproveitar agora
      </Button>
    </div>
  );
};

// Tailwind custom animation (adicione ao tailwind.config.js):
// 'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'

export default PromoBannerTop; 