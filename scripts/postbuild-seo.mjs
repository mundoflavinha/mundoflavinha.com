import fs from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://www.mundoflavinha.com";
const distDir = path.resolve("dist");

const pages = {
  "index.html": {
    route: "/",
    title: "Mundo Flavinha | Brincadeiras, dialogo e conexao em familia",
    description:
      "Atividades ludicas, jogos educativos e materiais praticos para fortalecer o vinculo entre pais e filhos com mais presenca e menos tela.",
    keywords:
      "mundo flavinha, atividades para criancas, jogos educativos, conexao familiar, brincadeiras em familia, desenvolvimento infantil",
    image: `${siteUrl}/mundo-flavinha-og.jpg`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Mundo Flavinha",
      url: siteUrl,
      description:
        "Atividades ludicas, jogos educativos e materiais praticos para fortalecer o vinculo entre pais e filhos.",
      publisher: {
        "@type": "Organization",
        name: "Mundo Flavinha",
        logo: `${siteUrl}/android-chrome-512x512.png`,
      },
    },
  },
  "jogo-olhou-achou.html": {
    route: "/jogo-olhou-achou",
    title: "Jogo Olhou, Achou! | Mundo Flavinha",
    description:
      "Jogo educativo para desenvolver atencao, concentracao e vocabulario de forma leve, divertida e com participacao da familia.",
    keywords:
      "jogo olhou achou, jogo educativo, atencao e concentracao, jogo para imprimir, desenvolvimento infantil",
    image: `${siteUrl}/images/products/jogo-olhou-achou-familia-jogando.png`,
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jogo Olhou, Achou!",
      brand: "Mundo Flavinha",
      description:
        "Jogo educativo para desenvolver atencao, concentracao e vocabulario de forma divertida.",
      image: `${siteUrl}/images/products/jogo-olhou-achou-familia-jogando.png`,
      offers: {
        "@type": "Offer",
        price: "19.99",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
  },
  "roda-de-conversa-em-familia.html": {
    route: "/roda-de-conversa-em-familia",
    title: "Roda de Conversa em Familia | Mundo Flavinha",
    description:
      "Cartoes de perguntas e dinamicas para criar dialogos significativos, fortalecer vinculos e ampliar a escuta dentro de casa.",
    keywords:
      "roda de conversa em familia, dialogo em familia, cartoes de perguntas, vinculo pais e filhos, conexao familiar",
    image: `${siteUrl}/images/products/bonus-roda-de-conversa-em-familia.png`,
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Roda de Conversa em Familia",
      brand: "Mundo Flavinha",
      description:
        "Cartoes de perguntas e dinamicas para criar dialogos significativos em familia.",
      image: `${siteUrl}/images/products/bonus-roda-de-conversa-em-familia.png`,
      offers: {
        "@type": "Offer",
        price: "24.99",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
  },
  "dia-dos-pais.html": {
    route: "/dia-dos-pais",
    title: "Kit Cartoes Dia dos Pais | Mundo Flavinha",
    description:
      "Kit especial de cartoes para imprimir, montar com as criancas e transformar o Dia dos Pais em uma experiencia afetiva e memoravel.",
    keywords:
      "dia dos pais, cartoes dia dos pais, atividade para imprimir, lembranca dia dos pais, mundo flavinha",
    image: `${siteUrl}/images/products/dia-dos-pais/kit-dia-dos-pais.png`,
    type: "product",
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Kit Cartoes Dia dos Pais",
      brand: "Mundo Flavinha",
      description:
        "Kit especial de cartoes para imprimir, montar com as criancas e criar memorias afetivas no Dia dos Pais.",
      image: `${siteUrl}/images/products/dia-dos-pais/kit-dia-dos-pais.png`,
      offers: {
        "@type": "Offer",
        price: "14.99",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
  },
  "politica-de-privacidade.html": {
    route: "/politica-de-privacidade",
    title: "Politica de Privacidade | Mundo Flavinha",
    description:
      "Saiba como o Mundo Flavinha trata dados pessoais, formularios de contato e interacoes com ferramentas de analytics e marketing.",
    keywords: "politica de privacidade, privacidade, dados pessoais, mundo flavinha",
    image: `${siteUrl}/mundo-flavinha-og.jpg`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Politica de Privacidade",
      url: `${siteUrl}/politica-de-privacidade`,
    },
  },
  "termos-de-uso.html": {
    route: "/termos-de-uso",
    title: "Termos de Uso | Mundo Flavinha",
    description:
      "Leia os termos gerais de uso do site Mundo Flavinha, incluindo regras de acesso, propriedade intelectual e canais de contato.",
    keywords: "termos de uso, mundo flavinha, condicoes de uso",
    image: `${siteUrl}/mundo-flavinha-og.jpg`,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Termos de Uso",
      url: `${siteUrl}/termos-de-uso`,
    },
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function removeExistingSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta name="description" content="[^"]*">\s*/gi, "")
    .replace(/<meta name="keywords" content="[^"]*">\s*/gi, "")
    .replace(/<link rel="canonical" href="[^"]*">\s*/gi, "")
    .replace(/<meta property="og:type" content="[^"]*">\s*/gi, "")
    .replace(/<meta property="og:url" content="[^"]*">\s*/gi, "")
    .replace(/<meta property="og:title" content="[^"]*">\s*/gi, "")
    .replace(/<meta property="og:description" content="[^"]*">\s*/gi, "")
    .replace(/<meta property="og:image" content="[^"]*">\s*/gi, "")
    .replace(/<meta property="og:image:width" content="[^"]*">\s*/gi, "")
    .replace(/<meta property="og:image:height" content="[^"]*">\s*/gi, "")
    .replace(/<meta name="twitter:url" content="[^"]*">\s*/gi, "")
    .replace(/<meta name="twitter:title" content="[^"]*">\s*/gi, "")
    .replace(/<meta name="twitter:description" content="[^"]*">\s*/gi, "")
    .replace(/<meta name="twitter:image" content="[^"]*">\s*/gi, "")
    .replace(/<script id="page-schema" type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "")
    .replace(/<link rel="icon" type="image\/svg\+xml" href="\/vite\.svg">\s*/gi, "");
}

function buildSeoBlock(page) {
  const absoluteUrl = `${siteUrl}${page.route === "/" ? "/" : page.route}`;

  return [
    `    <title>${escapeHtml(page.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(page.description)}">`,
    `    <meta name="keywords" content="${escapeHtml(page.keywords)}">`,
    `    <link rel="canonical" href="${absoluteUrl}">`,
    `    <meta property="og:type" content="${page.type}">`,
    `    <meta property="og:url" content="${absoluteUrl}">`,
    `    <meta property="og:title" content="${escapeHtml(page.title)}">`,
    `    <meta property="og:description" content="${escapeHtml(page.description)}">`,
    `    <meta property="og:image" content="${page.image}">`,
    `    <meta property="og:image:width" content="1200">`,
    `    <meta property="og:image:height" content="630">`,
    `    <meta name="twitter:url" content="${absoluteUrl}">`,
    `    <meta name="twitter:title" content="${escapeHtml(page.title)}">`,
    `    <meta name="twitter:description" content="${escapeHtml(page.description)}">`,
    `    <meta name="twitter:image" content="${page.image}">`,
    `    <script id="page-schema" type="application/ld+json">${JSON.stringify(page.schema)}</script>`,
  ].join("\n");
}

async function processPage(filename, page) {
  const filepath = path.join(distDir, filename);
  let html = await fs.readFile(filepath, "utf8");

  html = removeExistingSeo(html);
  html = html.replace("</head>", `${buildSeoBlock(page)}\n  </head>`);

  await fs.writeFile(filepath, html);

  if (page.route !== "/") {
    const routeDir = path.join(distDir, page.route.slice(1));
    await fs.mkdir(routeDir, { recursive: true });
    await fs.writeFile(path.join(routeDir, "index.html"), html);
  }
}

await Promise.all(
  Object.entries(pages).map(([filename, page]) => processPage(filename, page)),
);
