import { CheckCircle } from "lucide-react";

const MothersPainsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">As dores que todas as mães modernas sentem.</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                    Mais de 60% das mães se sentem culpadas por não passarem tempo suficiente com os filhos.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  70% afirmam que os filhos passam tempo demais nas telas.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                      E quase todas já disseram: “Eu queria brincar mais, mas não sei como.”
                </p>
              </div>
            </div>
            
            {/* <Button className="text-white hover:bg-primary hover:text-secondary border-primary flex items-center gap-2 px-0 border-0">
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </Button> */}
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="/src/assets/mother-pain.png"
              alt="Mãe sentida com filho no celular"
              className="max-h-96 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MothersPainsSection;
