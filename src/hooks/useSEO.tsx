import { useEffect } from "react";
import { PAGE_SEO, SITE_NAME, getAbsoluteUrl, type PublicRoute } from "../config/site";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "product" | "organization";
  url?: string;
  schema?: Record<string, unknown>;
  author?: string;
  canonical?: string;
  robots?: string;
}

function setMetaTag(name: string, content: string, property = false) {
  if (!content) return;

  const attribute = property ? "property" : "name";
  const selector = `meta[${attribute}="${name}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setLinkTag(rel: string, href: string) {
  if (!href) return;

  const selector = `link[rel="${rel}"]`;
  let element = document.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function setSchemaScript(schema: Record<string, unknown>) {
  const selector = "script#page-schema";
  let script = document.querySelector(selector) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
}

export function useSEO({
  title,
  description,
  keywords = [],
  image,
  type = "website",
  url,
  schema,
  author = "Flavia Guimaraes",
  canonical,
  robots = "index, follow",
}: SeoProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    document.title = title;

    setMetaTag("description", description);
    setMetaTag("keywords", keywords.join(", "));
    setMetaTag("author", author);
    setMetaTag("robots", robots);
    setMetaTag("language", "pt-BR");

    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", type, true);
    setMetaTag("og:site_name", SITE_NAME, true);

    if (url) {
      setMetaTag("og:url", url, true);
      setMetaTag("twitter:url", url);
    }

    if (image) {
      setMetaTag("og:image", image, true);
      setMetaTag("og:image:width", "1200", true);
      setMetaTag("og:image:height", "630", true);
      setMetaTag("og:image:alt", title, true);
      setMetaTag("twitter:image", image);
      setMetaTag("twitter:image:alt", title);
    }

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:site", "@mundoflavinha");
    setMetaTag("twitter:creator", "@mundoflavinha");

    if (canonical || url) {
      setLinkTag("canonical", canonical || url || "");
    }

    if (schema) {
      setSchemaScript(schema);
    }

    return () => {
      if (!import.meta.env.DEV) return;

      const script = document.querySelector("script#page-schema");
      if (script && schema) {
        script.remove();
      }
    };
  }, [author, canonical, description, image, keywords, robots, schema, title, type, url]);
}

export function SEOHead(props: SeoProps) {
  useSEO(props);
  return null;
}

export function useMundoFlavinhaSEO(pageData: {
  title: string;
  description: string;
  productName?: string;
  price?: string;
  path: string;
  keywords?: string[];
}) {
  const path = pageData.path as PublicRoute;
  const configuredPage = PAGE_SEO[path];
  const seoProps: SeoProps = configuredPage
    ? {
        title: configuredPage.title,
        description: configuredPage.description,
        keywords: configuredPage.keywords,
        image: getAbsoluteUrl(configuredPage.imagePath),
        type: configuredPage.type,
        url: getAbsoluteUrl(path === "/" ? "/" : path),
        canonical: getAbsoluteUrl(path === "/" ? "/" : path),
        schema: configuredPage.schema,
        robots: configuredPage.robots,
      }
    : {
        title: pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
        image: getAbsoluteUrl("/mundo-flavinha-og.jpg"),
        type: pageData.productName ? "product" : "website",
        url: getAbsoluteUrl(pageData.path),
        canonical: getAbsoluteUrl(pageData.path),
      };

  return useSEO(seoProps);
}

export default useSEO;
