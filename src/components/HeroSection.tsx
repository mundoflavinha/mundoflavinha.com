import { ArrowRight, Instagram, Mail, MessageCircle, Youtube } from "lucide-react";
import { SOCIAL_LINKS } from "../config/site";
import { Button } from "./ui/button";

const channels = [
  {
    title: "Instagram",
    description: "Ideias praticas para brincar, conversar e fortalecer vinculo no dia a dia.",
    href: SOCIAL_LINKS.instagram,
    cta: "Acompanhar perfil",
    icon: Instagram,
  },
  {
    title: "TikTok",
    description: "Videos curtos com propostas simples para sair da tela e entrar na brincadeira.",
    href: SOCIAL_LINKS.tiktok,
    cta: "Ver videos",
    icon: MessageCircle,
  },
  {
    title: "YouTube",
    description: "Conteudos mais detalhados sobre desenvolvimento infantil, rotina e conexao.",
    href: SOCIAL_LINKS.youtube,
    cta: "Assistir canal",
    icon: Youtube,
  },
  {
    title: "Contato direto",
    description: "Fale comigo sobre materiais, parcerias e duvidas sobre os produtos digitais.",
    href: "mailto:contato@mundoflavinha.com",
    cta: "Enviar email",
    icon: Mail,
  },
] as const;

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-secondary/20 via-white to-white" id="home">
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-cyan-500 to-blue-400">
        <div className="absolute inset-0 bg-black/5">
          <div className="absolute inset-0 bg-funky-pattern" />
        </div>

        <div className="absolute left-[5%] top-[10%] rotate-12 animate-pulse-slow transform">
          <svg className="h-6 w-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div className="absolute left-[15%] top-[80%] -rotate-12 animate-pulse-slow transform">
          <svg className="h-6 w-6 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
        <div className="absolute left-[90%] top-[20%] rotate-45 animate-pulse-slow transform">
          <svg className="h-6 w-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div className="absolute left-[80%] top-[70%] -rotate-45 animate-pulse-slow transform">
          <svg className="h-6 w-6 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>

        <div className="relative mb-10 flex items-center justify-center px-4 py-12 md:py-16">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="z-10 space-y-6 text-center md:text-left">
              <div className="mb-4 inline-block">
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-medium text-white backdrop-blur-sm">
                  <svg className="h-4 w-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Materiais para familias que querem mais presenca</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Brincadeiras e conversas que aproximam voce do seu filho.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-white/90 sm:text-lg md:text-xl">
                Eu sou Flavia Guimaraes e crio materiais para transformar a rotina
                em experiencias mais leves, afetivas e intencionais. O foco aqui e
                simples: menos tela, mais conexao e brincadeiras com proposito.
              </p>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center md:justify-start">
                <Button asChild className="w-full bg-white px-8 py-6 text-lg font-semibold text-primary shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-primary hover:text-white sm:w-auto">
                  <a href="#products">
                    Conhecer os materiais
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full border-white bg-transparent px-8 py-6 text-lg font-semibold text-white hover:scale-105 hover:bg-white hover:text-primary sm:w-auto"
                  variant="outline"
                >
                  <a href={`mailto:contato@mundoflavinha.com?subject=${encodeURIComponent("Quero falar com a Flavia sobre os materiais do Mundo Flavinha")}`}>
                    Falar comigo
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative mt-5 flex h-64 items-center justify-center sm:mb-12 sm:mt-12 md:min-h-[34rem]">
              <img
                alt="Flavia Guimaraes em um retrato do Mundo Flavinha"
                className="relative z-10 h-60 w-60 rounded-full object-cover shadow-[0px_0px_45px_10px_rgba(0,253,255,1)] sm:h-72 sm:w-72 md:h-[30rem] md:w-[30rem]"
                height="520"
                src="/images/eu-flavinha.jpg"
                width="520"
              />

              <div className="absolute h-[19rem] w-[19rem] rounded-full bg-gradient-to-br from-white/50 to-primary/10 animate-pulse-slow sm:h-[24rem] sm:w-[24rem] md:h-[32rem] md:w-[32rem]" />
              <div className="absolute h-[22rem] w-[22rem] rounded-full border-4 border-white/20 animate-spin-slow sm:h-[27rem] sm:w-[27rem] md:h-[34rem] md:w-[34rem]" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="h-16 w-full md:h-24"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V92.83C0,92.83,260.94,84.31,321.39,56.44Z"
              fill="rgba(255, 255, 255, 0.1)"
            />
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <svg className="-mb-1 w-full text-white" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 224 12">
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Onde voce encontra o Mundo Flavinha
          </h2>
          <p className="mt-3 text-lg text-gray-700">
            Escolha o canal que faz mais sentido para sua rotina e acompanhe
            conteudos, materiais e novidades.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {channels.map(({ title, description, href, cta, icon: Icon }) => (
            <article
              className="flex h-full flex-col rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              key={title}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-primary">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-gray-700">
                {description}
              </p>
              <Button asChild className="mt-6 w-full bg-primary text-white hover:bg-primary/90">
                <a
                  href={href}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  target={href.startsWith("http") ? "_blank" : undefined}
                >
                  {cta}
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
