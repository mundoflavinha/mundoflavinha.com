import { useEffect } from "react";

function setMetaTag(name: string, content: string) {
  const selector = `meta[name="${name}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = content;
}

export function useAdminPageSeo(title: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    document.title = title;
    setMetaTag("robots", "noindex, nofollow");
  }, [title]);
}
