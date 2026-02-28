import { Button } from "./ui/button";

const CtaSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-accent bg-opacity-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-tertiary rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 text-center text-primary">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quer receber novidades e proximos lancamentos?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Faca parte da comunidade Mundo Flavinha.
            </p>

            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Receba dicas exclusivas, conteudos sobre infancia e avisos sobre
              novos materiais para familias que querem mais presenca e menos
              tela.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-primary hover:bg-opacity-90 text-white px-8 py-6 text-lg">
                <a href="mailto:contato@mundoflavinha.com?subject=Quero receber novidades do Mundo Flavinha">
                  Quero receber novidades
                </a>
              </Button>
              <Button asChild className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg" variant="outline">
                <a href="https://www.instagram.com/mundoflavinhaoficial" rel="noopener noreferrer" target="_blank">
                  Acompanhar no Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
