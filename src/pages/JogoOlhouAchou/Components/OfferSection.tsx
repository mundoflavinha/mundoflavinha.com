import { Button } from "../../../components/ui/button";

const OfferSection = () => {
  return (
    <section className="pb-16 md:pb-24 bg-secondary bg-opacity-20" id="limited-offer">
      <div className="container mx-auto px-4">
        <div className="bg-orange-200 rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-tertiary rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Oferta Limitada</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">Promoção por tempo limitado para as primeiras mães que garantirem.</p>
            <div className="flex flex-col items-center justify-center mb-8">
              <span className="text-2xl md:text-4xl font-bold text-primary mb-2 line-through">DE R$ 59,90</span>
              <span className="text-5xl md:text-6xl font-extrabold text-accent mb-2">POR 39,90</span>
              <span className="text-base text-gray-500">Oferta de Lançamento</span>
            </div>

            <Button className="group px-8 py-6 bg-primary text-lg hover:bg-opacity-90 text-white rounded-full font-medium text-white hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Quero garantir o meu jogo agora!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection; 