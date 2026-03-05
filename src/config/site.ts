export type PublicRoute =
  | "/"
  | "/_old"
  | "/home-v2"
  | "/jogo-olhou-achou"
  | "/roda-de-conversa-em-familia"
  | "/dia-dos-pais"
  | "/politica-de-privacidade"
  | "/termos-de-uso";

export interface SeoPage {
  title: string;
  description: string;
  keywords: string[];
  imagePath: string;
  type: "website" | "product";
  schema: Record<string, unknown>;
  robots?: string;
}

export const SITE_NAME = "Mundo Flavinha";
export const SITE_URL = "https://www.mundoflavinha.com";
export const SITE_AUTHOR = "Flavia Guimaraes";
export const SITE_EMAIL = "contato@mundoflavinha.com";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/mundoflavinhaoficial",
  tiktok: "https://www.tiktok.com/@mundoflavinha",
  youtube: "https://www.youtube.com/@mundoflavinha",
};

export const HOME_CATALOG = {
  produtos_destaque: [
    {
      name: "Kit Cartoes Dia dos Pais",
      description:
        "Uma experiencia criativa para imprimir, montar com as criancas e transformar o Dia dos Pais em memoria afetiva.",
      image: "/images/products/dia-dos-pais/kit-dia-dos-pais.png",
      price: "R$ 14,99",
      href: "/dia-dos-pais",
      cta: "Ver o kit",
    },
    {
      name: "Jogo Olhou, Achou!",
      description:
        "Um jogo educativo para estimular atencao, concentracao e vocabulario com menos tela e mais interacao em familia.",
      image: "/images/products/jogo-olhou-achou-familia-jogando.png",
      price: "A partir de R$ 19,99",
      href: "/jogo-olhou-achou",
      cta: "Conhecer o jogo",
    },
    {
      name: "Roda de Conversa em Familia",
      description:
        "Cartoes de perguntas e propostas de conversa para fortalecer vinculo, escuta e dialogo dentro de casa.",
      image: "/images/products/bonus-roda-de-conversa-em-familia.png",
      price: "A partir de R$ 24,99",
      href: "/roda-de-conversa-em-familia",
      cta: "Explorar a roda",
    },
  ],
  produtos: [
    {
      name: "Mesa Play Time",
      description:
        "Sugestao para brincadeiras sensoriais, causa e efeito e exploracao com supervisao da familia.",
      image: "/images/products/cotiplas_brinquedo-educativo_mesa-play-time.jpg",
      href: "#",
      cta: "Adicionar link afiliado",
    },
    {
      name: "Zebra Blocos Surpresa",
      description:
        "Opcao divertida para trabalhar coordenacao, curiosidade e descoberta nas primeiras exploracoes.",
      image: "/images/products/fisher-price_zebra_blocos-surpresa.jpg",
      href: "#",
      cta: "Adicionar link afiliado",
    },
    {
      name: "Brinquedo Interativo Musical",
      description:
        "Recurso para ampliar repertorio sonoro, atencao compartilhada e interacao com o adulto.",
      image: "/images/products/dm-toys_brinquedo-interativo-musical.jpg",
      href: "#",
      cta: "Adicionar link afiliado",
    },
    {
      name: "Kit para Brincar Junto",
      description:
        "Uma referencia para propostas simples de interacao, imaginacao e tempo de qualidade em casa.",
      image: "/images/products/mae-filho-brincando.jpg",
      href: "#",
      cta: "Adicionar link afiliado",
    },
    {
      name: "Cartas para Conversas em Familia",
      description:
        "Sugestao para apoiar dialogos mais leves, escuta ativa e conexao entre adultos e criancas.",
      image: "/images/products/bonus-mae-conversando-filhos.jpg",
      href: "#",
      cta: "Adicionar link afiliado",
    },
    {
      name: "Recursos para Menos Tela",
      description:
        "Itens de apoio para tirar a crianca do automatico da tela e ampliar o repertorio da brincadeira.",
      image: "/images/products/filho-celular.png",
      href: "#",
      cta: "Adicionar link afiliado",
    },
    {
      name: "Rede de Apoio para Pais",
      description:
        "Uma recomendacao para quem quer fortalecer rotina, acolhimento e troca de experiencias em familia.",
      image: "/images/products/bonus-rede-apoio.jpeg",
      href: "#",
      cta: "Adicionar link afiliado",
    },
    {
      name: "Comunidade Mundo Flavinha",
      description:
        "Espaco complementar para quem busca repertorio, incentivo e novas ideias para brincar com intencao.",
      image: "/images/products/bonus-acesso-a-comunidade.png",
      href: "#",
      cta: "Adicionar link afiliado",
    },
  ],
} as const;

export const TESTIMONIALS = [
  {
    name: "Juliana M.",
    role: "Mae de duas criancas",
    content:
      "Os materiais me ajudam a sair do improviso. Hoje eu consigo criar momentos simples, mas muito significativos, com meus filhos.",
  },
  {
    name: "Priscila R.",
    role: "Educadora infantil",
    content:
      "Gosto porque as propostas sao praticas e afetuosas. Da para usar em casa e adaptar com facilidade para a rotina da escola.",
  },
  {
    name: "Carolina S.",
    role: "Mae e seguidora do perfil",
    content:
      "O Mundo Flavinha me devolveu ideias de brincadeiras e conversas. Menos tela, mais conexao e muito mais leveza por aqui.",
  },
] as const;

export const PAGE_SEO: Record<PublicRoute, SeoPage> = {
  "/": {
    title: "Mundo Flavinha | Brincadeiras com mais presenca e menos tela",
    description:
      "Nova home do Mundo Flavinha com narrativa clara, visual elegante e destaque para materiais praticos que fortalecem a conexao em familia.",
    keywords: [
      "mundo flavinha",
      "brincadeiras em familia",
      "menos tela",
      "materiais para pais e filhos",
      "conexao familiar",
    ],
    imagePath: "/mundo-flavinha-og.jpg",
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Mundo Flavinha - Home",
      url: `${SITE_URL}/`,
      description:
        "Nova home do Mundo Flavinha com foco em brincadeiras, conexao familiar e materiais digitais.",
    },
  },
  "/_old": {
    title: "Mundo Flavinha | Home antiga (_OLD)",
    description:
      "Versao anterior da home do Mundo Flavinha, mantida para referencia visual e historico de estrutura.",
    keywords: [
      "mundo flavinha",
      "home antiga",
      "historico",
      "versao anterior",
    ],
    imagePath: "/mundo-flavinha-og.jpg",
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Mundo Flavinha - Home antiga",
      url: `${SITE_URL}/_old`,
      description:
        "Home anterior do Mundo Flavinha preservada para referencia.",
    },
    robots: "noindex, nofollow",
  },
  "/home-v2": {
    title: "Mundo Flavinha | Home principal (alias)",
    description:
      "Alias tecnico da home principal do Mundo Flavinha.",
    keywords: [
      "mundo flavinha",
      "home principal",
      "home v2",
      "alias",
    ],
    imagePath: "/mundo-flavinha-og.jpg",
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Mundo Flavinha - Home alias",
      url: `${SITE_URL}/home-v2`,
      description:
        "Alias da home principal do Mundo Flavinha.",
    },
    robots: "noindex, nofollow",
  },
  "/jogo-olhou-achou": {
    title: "Jogo Olhou, Achou! | Mundo Flavinha",
    description:
      "Jogo educativo para desenvolver atencao, concentracao e vocabulario de forma leve, divertida e com participacao da familia.",
    keywords: [
      "jogo olhou achou",
      "jogo educativo",
      "atencao e concentracao",
      "jogo para imprimir",
      "desenvolvimento infantil",
    ],
    imagePath: "/images/products/jogo-olhou-achou-familia-jogando.png",
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jogo Olhou, Achou!",
      brand: SITE_NAME,
      description:
        "Jogo educativo para desenvolver atencao, concentracao e vocabulario de forma divertida.",
      image: `${SITE_URL}/images/products/jogo-olhou-achou-familia-jogando.png`,
      offers: {
        "@type": "Offer",
        price: "19.99",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
  },
  "/roda-de-conversa-em-familia": {
    title: "Roda de Conversa em Familia | Mundo Flavinha",
    description:
      "Cartoes de perguntas e dinamicas para criar dialogos significativos, fortalecer vinculos e ampliar a escuta dentro de casa.",
    keywords: [
      "roda de conversa em familia",
      "dialogo em familia",
      "cartoes de perguntas",
      "vinculo pais e filhos",
      "conexao familiar",
    ],
    imagePath: "/images/products/bonus-roda-de-conversa-em-familia.png",
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Roda de Conversa em Familia",
      brand: SITE_NAME,
      description:
        "Cartoes de perguntas e dinamicas para criar dialogos significativos em familia.",
      image: `${SITE_URL}/images/products/bonus-roda-de-conversa-em-familia.png`,
      offers: {
        "@type": "Offer",
        price: "24.99",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
  },
  "/dia-dos-pais": {
    title: "Kit Cartoes Dia dos Pais | Mundo Flavinha",
    description:
      "Kit especial de cartoes para imprimir, montar com as criancas e transformar o Dia dos Pais em uma experiencia afetiva e memoravel.",
    keywords: [
      "dia dos pais",
      "cartoes dia dos pais",
      "atividade para imprimir",
      "lembranca dia dos pais",
      "mundo flavinha",
    ],
    imagePath: "/images/products/dia-dos-pais/kit-dia-dos-pais.png",
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Kit Cartoes Dia dos Pais",
      brand: SITE_NAME,
      description:
        "Kit especial de cartoes para imprimir, montar com as criancas e criar memorias afetivas no Dia dos Pais.",
      image: `${SITE_URL}/images/products/dia-dos-pais/kit-dia-dos-pais.png`,
      offers: {
        "@type": "Offer",
        price: "14.99",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
  },
  "/politica-de-privacidade": {
    title: "Politica de Privacidade | Mundo Flavinha",
    description:
      "Saiba como o Mundo Flavinha trata dados pessoais, formularios de contato e interacoes com ferramentas de analytics e marketing.",
    keywords: [
      "politica de privacidade",
      "privacidade",
      "dados pessoais",
      "mundo flavinha",
    ],
    imagePath: "/mundo-flavinha-og.jpg",
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Politica de Privacidade",
      url: `${SITE_URL}/politica-de-privacidade`,
    },
  },
  "/termos-de-uso": {
    title: "Termos de Uso | Mundo Flavinha",
    description:
      "Leia os termos gerais de uso do site Mundo Flavinha, incluindo regras de acesso, propriedade intelectual e canais de contato.",
    keywords: ["termos de uso", "mundo flavinha", "condicoes de uso"],
    imagePath: "/mundo-flavinha-og.jpg",
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Termos de Uso",
      url: `${SITE_URL}/termos-de-uso`,
    },
  },
};

export function getAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function routeToHtmlFile(route: PublicRoute) {
  return route === "/" ? "index.html" : `${route.slice(1)}.html`;
}
