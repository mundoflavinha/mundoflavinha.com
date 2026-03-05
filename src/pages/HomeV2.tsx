import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SkipLink from "../components/SkipLink";
import HomeV2Experience from "../components/home-v2/HomeV2Experience";
import { DEFAULT_HOME_V2_CONTENT, cloneHomeV2Content } from "../content/homeV2";
import { SITE_NAME, getAbsoluteUrl } from "../config/site";
import { useSEO } from "../hooks/useSEO";
import { loadHomeV2Content } from "../lib/homeV2ContentStore";

const HomeV2 = () => {
  const location = useLocation();
  const [content, setContent] = useState(() => cloneHomeV2Content(DEFAULT_HOME_V2_CONTENT));
  const isAliasRoute = location.pathname === "/home-v2";

  useSEO({
    title: `${SITE_NAME} | Brincadeiras com mais presenca e menos tela`,
    description:
      "Uma nova home para o Mundo Flavinha, com narrativa mais clara, visual elegante e destaque para materiais que ajudam pais a brincarem mais com os filhos.",
    keywords: [
      "mundo flavinha",
      "brincadeiras em familia",
      "menos tela",
      "materiais para pais e filhos",
      "conexao familiar",
    ],
    image: getAbsoluteUrl("/mundo-flavinha-og.jpg"),
    type: "website",
    url: getAbsoluteUrl("/"),
    canonical: getAbsoluteUrl("/"),
    robots: isAliasRoute ? "noindex, nofollow" : "index, follow",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Mundo Flavinha - Home",
      url: getAbsoluteUrl("/"),
      description:
        "Home do Mundo Flavinha com foco em brincadeiras, conexao familiar e materiais digitais prontos para usar.",
    },
  });

  useEffect(() => {
    let isMounted = true;

    loadHomeV2Content().then((loadedContent) => {
      if (!isMounted) return;
      setContent(loadedContent);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <SkipLink />
      <HomeV2Experience content={content} />
    </>
  );
};

export default HomeV2;
