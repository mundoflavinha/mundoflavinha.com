import { CheckCircle } from "lucide-react";

const pains = [
  "Cartão raspadinha: com prêmios surpresa para o papai descobrir.",
  "Cartão surpresa: dobradura que revela uma mensagem no centro.",
  "Cartão frase secreta: para emocionar com palavras do coração",
  "Cartão mágico: com revelação colorida eque encanta",
  "Vídeos tutoriais explicando como montar cada um dos cartões"
];

const OQueVaiReceberSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 lg:gap-24 items-center">
          <div className="order-2 md:order-1 text-right">
            <h2 className="text-primary text-3xl md:text-5xl font-bold mb-6">O que você vai receber</h2>
            <div className="space-y-6 mb-8">
              {pains.map((pain, idx) => (
                <div className="flex items-start justify-end" key={idx}>
                  <p className="text-gray-700 text-right mr-3">{pain}</p>
                  <CheckCircle className="text-primary mt-1 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-start">
            <img 
              src="/images/products/dia-dos-pais/kit-dia-dos-pais.png"
              alt="Kit de cartões para o dia dos pais"
              className="max-h-96 object-cover rounded-xl rounded-xs object-center shadow-[0px_0px_35px_5px_rgba(224,107,117,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>

  );
};

export default OQueVaiReceberSection; 