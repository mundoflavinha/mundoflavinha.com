import { CheckCircle } from "lucide-react";

const MothersPainsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Dores comuns na rotina de quem quer estar mais presente.
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  A sensacao de que o dia acaba rapido e o tempo de qualidade
                  com os filhos fica sempre para depois.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  A dificuldade de competir com a tela quando faltam ideias de
                  brincadeiras simples para a rotina.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  A vontade de criar memoria afetiva sem precisar transformar
                  cada momento em uma producao complicada.
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="/images/mother-pain.png"
              alt="Mãe sentida com filho no celular"
              className="max-h-96 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MothersPainsSection;
