import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Menos tempo buscando ideias e mais tempo vivendo a experiencia com a crianca.",
  "Materiais que valorizam afeto, linguagem, curiosidade e participacao da familia.",
  "Propostas simples de adaptar para casa, escola ou atendimentos.",
  "Uma comunicacao acolhedora, pratica e centrada na infancia.",
];

const FeaturedProductSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Por que as familias escolhem o projeto
          </p>
          <h2 className="mt-4 text-3xl font-bold text-primary md:text-5xl">
            Conteudo com proposito, sem perder leveza.
          </h2>

          <div className="mt-8 space-y-5">
            {benefits.map((benefit) => (
              <div className="flex items-start gap-3" key={benefit}>
                <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 text-primary" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="overflow-hidden rounded-[2rem] bg-secondary/15 p-4 shadow-sm">
            <img
              alt="Flavia Guimaraes em um momento de apresentacao do Mundo Flavinha"
              className="h-full w-full rounded-[1.5rem] object-cover"
              height="640"
              loading="lazy"
              src="/images/eu-flavinha.jpg"
              width="640"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSection;
