import { Button } from "../../../components/ui/button";

const PromoBannerTop = () => {
  return (
    // <div className="w-full bg-[#45a29e] text-white text-center py-3 px-2 font-bold text-base md:text-lg shadow-md animate-pulse-slow flex flex-col md:flex-row items-center justify-center gap-2">
    <div className="w-full bg-quinary text-white text-center py-3 px-2 font-bold text-base md:text-lg shadow-md animate-pulse-slow flex flex-col md:flex-row items-center justify-center gap-2">
      <span>
        Corra e garanta o seu kit, pois é por tempo limitado!
      </span>
      <Button onClick={() => window.location.href = '#limited-offer'} className="group px-8 py-6 md:text-1x2  bg-white rounded-full font-medium text-primary hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
          Aproveitar agora
      </Button>
    </div>
  );
};

// Tailwind custom animation (adicione ao tailwind.config.js):
// 'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'

export default PromoBannerTop; 