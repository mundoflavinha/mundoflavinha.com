import { Button } from "../../../components/ui/button";

const MyProductsOfferSection = () => {
  return (
    <section className="bg-secondary bg-opacity-20 pb-16 md:pb-24" id="limited-offer">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-orange-200 p-8 text-center shadow-xl md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">Quero levar essa roda para casa</h2>
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-lg text-gray-700">
            Se voce quer levar esse material para a sua familia, fale comigo e
            receba os detalhes de acesso e valor atualizado.
          </p>

          <div className="mb-8 flex flex-col items-center justify-center">
            <span className="mb-2 text-2xl font-bold text-primary md:text-4xl">
              Cartoes para dialogos significativos em familia
            </span>
            <span className="text-base text-gray-500">Atendimento direto por email</span>
          </div>

          <Button asChild className="group bg-primary px-8 py-6 text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl">
            <a href="mailto:contato@mundoflavinha.com?subject=Quero saber mais sobre a Roda de Conversa em Familia">
              Quero saber mais sobre a roda
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MyProductsOfferSection;
