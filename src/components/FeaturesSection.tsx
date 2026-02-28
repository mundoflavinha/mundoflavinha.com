import { HeartHandshake, Printer, Sparkles } from "lucide-react";

const features = [
  {
    title: "Conexao antes da perfeicao",
    description:
      "Os materiais foram pensados para caber na rotina real: pouco tempo, muita demanda e o desejo de viver momentos mais presentes com as criancas.",
    icon: HeartHandshake,
  },
  {
    title: "Tudo pronto para usar",
    description:
      "Voce recebe atividades e propostas com orientacao clara, para imprimir, adaptar e colocar em pratica sem complicar sua semana.",
    icon: Printer,
  },
  {
    title: "Brincadeiras com intencao",
    description:
      "Cada material busca apoiar dialogo, criatividade, linguagem e desenvolvimento infantil sem perder leveza e ludicidade.",
    icon: Sparkles,
  },
] as const;

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 md:py-24" id="features">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            O que guia o Mundo Flavinha
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            O projeto nasceu para ajudar familias a criarem mais repertorio,
            mais conversa e mais memoria afetiva com praticidade.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              className="rounded-3xl bg-quaternary/20 p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              key={title}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <Icon aria-hidden="true" className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-primary">{title}</h3>
              <p className="mt-4 leading-7 text-gray-700">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
