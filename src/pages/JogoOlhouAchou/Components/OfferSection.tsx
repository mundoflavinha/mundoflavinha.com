import { Button } from "../../../components/ui/button";

const OfferSection = () => {
  return (
    <section className="bg-secondary bg-opacity-20 pb-16 md:pb-24" id="limited-offer">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-orange-200 p-8 text-center shadow-xl md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">Quero esse material na minha rotina</h2>
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-lg text-gray-700">
            Quer receber o valor atualizado e entender qual formato faz mais
            sentido para sua familia?
          </p>

          <div className="mb-8 flex flex-col items-center justify-center">
            <span className="mb-2 text-2xl font-bold text-primary md:text-4xl">
              Material digital com orientacao pratica
            </span>
            <span className="text-base text-gray-500">Atendimento direto por email</span>
          </div>

          <Button asChild className="group bg-primary px-8 py-6 text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl">
            <a href="mailto:contato@mundoflavinha.com?subject=Quero saber mais sobre o Jogo Olhou, Achou!">
              Quero saber mais sobre o jogo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
