import { MessageCircleHeart } from "lucide-react";
import { Button } from "../../../components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-secondary to-white md:pt-0">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/80 via-cyan-500 to-blue-400">
        <div className="absolute inset-0 bg-black/5">
          <div className="absolute inset-0 bg-funky-pattern" />
        </div>

        <div className="relative flex items-center justify-center px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="space-y-6 text-center text-white md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-medium backdrop-blur-sm">
                <MessageCircleHeart aria-hidden="true" className="h-4 w-4 text-yellow-300" />
                <span>Dialogos mais leves e intencionais em familia</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                A conversa que aproxima tambem pode ser guiada.
              </h1>

              <p className="text-lg text-white/90 md:text-xl">
                A Roda de Conversa em Familia foi criada para ajudar pais e
                filhos a falarem sobre sentimentos, rotina, gratidao, desejos e
                combinados com mais escuta e presenca.
              </p>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row md:justify-start">
                <Button asChild className="bg-white px-8 py-6 text-lg font-semibold text-primary shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-primary hover:text-white">
                  <a href="mailto:contato@mundoflavinha.com?subject=Quero saber mais sobre a Roda de Conversa em Familia">
                    Quero saber mais
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <img
                alt="Familia em momento de conversa guiada"
                className="relative z-10 mb-4 rounded-3xl object-cover shadow-[0px_0px_45px_10px_rgba(0,253,255,0.35)]"
                height="520"
                src="/images/products/bonus-mae-conversando-filhos.jpg"
                width="520"
              />
              <div className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-white/60 to-primary/30 animate-pulse-slow md:h-80 md:w-80" />
              <div className="absolute h-64 w-64 rounded-full border-4 border-white/20 transform rotate-45 animate-spin-slow md:h-80 md:w-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
