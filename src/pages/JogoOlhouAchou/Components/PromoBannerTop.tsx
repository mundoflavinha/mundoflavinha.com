const PromoBannerTop = () => {
  return (
    // <div className="w-full bg-[#45a29e] text-white text-center py-3 px-2 font-bold text-base md:text-lg shadow-md animate-pulse-slow flex flex-col md:flex-row items-center justify-center gap-2">
    <div className="w-full bg-quinary text-white text-center py-3 px-2 font-bold text-base md:text-lg shadow-md animate-pulse-slow flex flex-col md:flex-row items-center justify-center gap-2">
      <span>
        Atenção: Últimos dias de promoção!   <br className="block md:hidden" /><span className="underline">Ganhe um bônus especial de presente.</span>
      </span>
      <a href="#limited-offer" className="inline-block bg-white text-pink-600 font-semibold rounded-full px-5 py-2 ml-0 md:ml-4 shadow hover:bg-yellow-100 transition-colors duration-300">
        Aproveite agora!
      </a>
    </div>
  );
};

// Tailwind custom animation (adicione ao tailwind.config.js):
// 'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'

export default PromoBannerTop; 