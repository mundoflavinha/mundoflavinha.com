import { z } from "zod";
import { HOME_CATALOG, SITE_EMAIL, SOCIAL_LINKS, TESTIMONIALS } from "../config/site";

const actionSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const navigationItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

const sectionHeadingSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const socialLogoSchema = z.enum(["instagram", "tiktok", "youtube"]);

const socialCardSchema = z.object({
  title: z.string().min(1),
  logo: socialLogoSchema,
  description: z.string().min(1),
  href: z.string().min(1),
  cta: z.string().min(1),
});

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  href: z.string().min(1),
  cta: z.string().min(1),
});

const authoredProductSchema = productSchema.extend({
  price: z.string().min(1),
});

const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  content: z.string().min(1),
  image: z.string().min(1),
});

const footerSocialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  platform: socialLogoSchema,
});

const footerLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const homeV2ContentSchema = z.object({
  navigationItems: z.array(navigationItemSchema).min(1),
  hero: z.object({
    enabled: z.boolean().default(true),
    introText: z.string().min(1),
    name: z.string().min(1),
    headline: z.string().min(1),
    description: z.string().min(1),
    primaryAction: actionSchema,
    secondaryAction: actionSchema,
    imageSrc: z.string().min(1),
    imageAlt: z.string().min(1),
  }),
  channels: z.object({
    enabled: z.boolean().default(true),
    heading: sectionHeadingSchema,
    cards: z.array(socialCardSchema).min(1),
  }),
  authored: z.object({
    enabled: z.boolean().default(true),
    heading: sectionHeadingSchema,
    badgeLabel: z.string().min(1),
    products: z.array(authoredProductSchema).min(1),
  }),
  suggestions: z.object({
    enabled: z.boolean().default(true),
    heading: sectionHeadingSchema,
    highlightedLabel: z.string().min(1),
    highlightedBadgeLabel: z.string().min(1),
    additionalLabel: z.string().min(1),
    additionalBadgeLabel: z.string().min(1),
    highlighted: z.array(productSchema).min(1),
    additional: z.array(productSchema),
  }),
  testimonials: z.object({
    enabled: z.boolean().default(true),
    heading: sectionHeadingSchema,
    items: z.array(testimonialSchema).min(1),
  }),
  finalCta: z.object({
    enabled: z.boolean().default(true),
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    primaryAction: actionSchema,
    secondaryActions: z.array(actionSchema).min(1),
  }),
  footer: z.object({
    enabled: z.boolean().default(true),
    description: z.string().min(1),
    socialLinks: z.array(footerSocialLinkSchema).min(1),
    legalLinks: z.array(footerLinkSchema).min(1),
    email: z.string().min(1),
  }),
});

export type HomeV2Content = z.infer<typeof homeV2ContentSchema>;
export type HomeV2Product = z.infer<typeof productSchema>;
export type HomeV2AuthoredProduct = z.infer<typeof authoredProductSchema>;
export type HomeV2SocialCard = z.infer<typeof socialCardSchema>;
export type HomeV2Testimonial = z.infer<typeof testimonialSchema>;
export type HomeV2Action = z.infer<typeof actionSchema>;

const testimonialImages = [
  "/images/products/mae-filho-brincando.jpg",
  "/images/products/bonus-mae-conversando-filhos.jpg",
  "/images/eu-flavinha.jpg",
] as const;

export const DEFAULT_HOME_V2_CONTENT: HomeV2Content = {
  navigationItems: [
    { href: "#canais", label: "Canais" },
    { href: "#conteudos", label: "Conteudos" },
    { href: "#materiais", label: "Materiais" },
  ],
  hero: {
    enabled: true,
    introText: "Oi, eu sou a",
    name: "Flavia Guimaraes",
    headline: "Eu ajudo pais a brincarem com os filhos com mais conexao",
    description:
      "Crio materiais para transformar a rotina em experiencias mais leves, afetivas e intencionais. O foco aqui e simples: menos tela, mais conexao e brincadeiras com proposito.",
    primaryAction: {
      label: "Ver materiais",
      href: "#conteudos",
    },
    secondaryAction: {
      label: "Conhecer a Flavinha",
      href: "#canais",
    },
    imageSrc: "/images/eu-flavinha.jpg",
    imageAlt: "Flavinha em retrato da home",
  },
  channels: {
    enabled: true,
    heading: {
      eyebrow: "Meus canais",
      title: "Onde a Flavinha encontra as familias todos os dias.",
      description:
        "A referencia trabalha muito bem com blocos empilhados e hierarquia simples. Aqui isso vira uma area de canais limpa e facil de percorrer no celular.",
    },
    cards: [
      {
        title: "Instagram",
        logo: "instagram",
        description:
          "Ideias praticas para brincar, conversar e sair do piloto automatico da rotina com mais presenca.",
        href: SOCIAL_LINKS.instagram,
        cta: "Ver perfil",
      },
      {
        title: "TikTok",
        logo: "tiktok",
        description:
          "Conteudo rapido para pais que querem repertorio simples, aplicavel e facil de levar para o dia a dia.",
        href: SOCIAL_LINKS.tiktok,
        cta: "Assistir videos",
      },
      {
        title: "YouTube",
        logo: "youtube",
        description:
          "Um espaco para temas de infancia, dialogo, desenvolvimento e conexao em familia com mais contexto.",
        href: SOCIAL_LINKS.youtube,
        cta: "Abrir canal",
      },
    ],
  },
  authored: {
    enabled: true,
    heading: {
      eyebrow: "Criado pela Flavinha",
      title: "Materiais digitais do Mundo Flavinha.",
      description:
        "Esses sao os materiais autorais do Mundo Flavinha: produtos digitais criados para ajudar pais a brincarem, conversarem e viverem momentos de mais presenca com os filhos.",
    },
    badgeLabel: "Material digital",
    products: HOME_CATALOG.produtos_destaque.map((product) => ({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      href: product.href,
      cta: product.cta,
    })),
  },
  suggestions: {
    enabled: true,
    heading: {
      eyebrow: "Sugestoes da Flavinha",
      title: "Produtos para complementar a brincadeira.",
      description:
        "Uma curadoria reunida em uma mesma faixa visual, para deixar claro que essas sugestoes complementam os materiais autorais da Flavinha sem se misturarem com eles.",
    },
    highlightedLabel: "Selecao da Flavinha",
    highlightedBadgeLabel: "Selecao da Flavinha",
    additionalLabel: "Outras sugestoes",
    additionalBadgeLabel: "Sugestao",
    highlighted: HOME_CATALOG.produtos.slice(0, 3).map((product) => ({
      name: product.name,
      description: product.description,
      image: product.image,
      href: product.href,
      cta: product.cta,
    })),
    additional: HOME_CATALOG.produtos.slice(3).map((product) => ({
      name: product.name,
      description: product.description,
      image: product.image,
      href: product.href,
      cta: product.cta,
    })),
  },
  testimonials: {
    enabled: true,
    heading: {
      eyebrow: "Depoimentos",
      title: "O que as familias dizem.",
      description:
        "Depoimentos reais de quem levou os materiais para a rotina e transformou brincadeiras simples em momentos mais presentes e afetivos.",
    },
    items: TESTIMONIALS.map((testimonial, index) => ({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      image: testimonialImages[index % testimonialImages.length],
    })),
  },
  finalCta: {
    enabled: true,
    eyebrow: "Menos tela, mais presenca",
    title: "Transforme a rotina em memoria afetiva.",
    description:
      "Os materiais do Mundo Flavinha foram pensados para ajudar pais a criarem momentos mais leves, afetivos e intencionais com os filhos.",
    primaryAction: {
      label: "Falar com a Flavinha",
      href: `mailto:${SITE_EMAIL}`,
    },
    secondaryActions: [
      {
        label: "Instagram",
        href: SOCIAL_LINKS.instagram,
      },
      {
        label: "TikTok",
        href: SOCIAL_LINKS.tiktok,
      },
    ],
  },
  footer: {
    enabled: true,
    description:
      "Conteudo e materiais para ajudar pais a brincarem com os filhos com mais leveza, presenca e intencao.",
    socialLinks: [
      {
        label: "Instagram",
        href: SOCIAL_LINKS.instagram,
        platform: "instagram",
      },
      {
        label: "TikTok",
        href: SOCIAL_LINKS.tiktok,
        platform: "tiktok",
      },
      {
        label: "YouTube",
        href: SOCIAL_LINKS.youtube,
        platform: "youtube",
      },
    ],
    legalLinks: [
      { label: "Politica de Privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de Uso", href: "/termos-de-uso" },
    ],
    email: SITE_EMAIL,
  },
};

export function cloneHomeV2Content(content: HomeV2Content): HomeV2Content {
  return JSON.parse(JSON.stringify(content)) as HomeV2Content;
}

function ensureFinalCtaYoutubeAction(content: HomeV2Content): HomeV2Content {
  const hasYoutube = content.finalCta.secondaryActions.some(
    (action) => action.href.trim().toLowerCase() === SOCIAL_LINKS.youtube.trim().toLowerCase(),
  );

  if (hasYoutube) return content;

  return {
    ...content,
    finalCta: {
      ...content.finalCta,
      secondaryActions: [
        ...content.finalCta.secondaryActions,
        {
          label: "YouTube",
          href: SOCIAL_LINKS.youtube,
        },
      ],
    },
  };
}

export function normalizeHomeV2Content(input: unknown): HomeV2Content {
  const result = homeV2ContentSchema.safeParse(input);
  if (!result.success) {
    return cloneHomeV2Content(DEFAULT_HOME_V2_CONTENT);
  }

  return ensureFinalCtaYoutubeAction(result.data);
}

export function validateHomeV2Content(input: unknown): HomeV2Content {
  const result = homeV2ContentSchema.safeParse(input);
  if (result.success) {
    return ensureFinalCtaYoutubeAction(result.data);
  }

  const issue = result.error.issues[0];
  const message = issue?.message ?? "Conteudo invalido.";
  const path = issue?.path?.length ? issue.path.join(".") : "";
  throw new Error(path ? `Validacao falhou em "${path}": ${message}` : `Validacao falhou: ${message}`);
}
