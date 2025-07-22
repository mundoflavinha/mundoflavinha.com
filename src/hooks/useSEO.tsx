// hooks/useSEO.tsx
import { useEffect } from 'react';

interface SchemaProduct {
  name: string;
  description: string;
  brand: string;
  price: string;
  currency: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  image?: string;
  category?: string;
  ageRange?: string;
  educationalUse?: string;
  learningResourceType?: string;
}

interface SchemaOrganization {
  name: string;
  description: string;
  url: string;
  logo?: string;
  founder?: {
    name: string;
    jobTitle: string;
  };
  sameAs?: string[];
  contactPoint?: {
    email: string;
    contactType: string;
  };
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product' | 'organization';
  url?: string;
  schema?: SchemaProduct | SchemaOrganization;
  schemaType?: 'Product' | 'Organization' | 'WebSite';
  author?: string;
  canonical?: string;
}

export function useSEO({
  title,
  description,
  keywords = [],
  image,
  type = 'website',
  url,
  schema,
  schemaType = 'Product',
  author = 'Flávia Guimarães',
  canonical
}: SEOProps) {
  useEffect(() => {
    // Helper function para criar ou atualizar meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      if (!content) return; // Não criar tags vazias
      
      const attribute = property ? 'property' : 'name';
      const selector = `meta[${attribute}="${name}"]`;
      
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.content = content;
    };

    const setLinkTag = (rel: string, href: string) => {
      if (!href) return;
      
      const selector = `link[rel="${rel}"]`;
      let element = document.querySelector(selector) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      
      element.href = href;
    };

    // Função para Schema.org JSON-LD
    const setSchemaScript = (schemaData: SchemaProduct | SchemaOrganization, type: string) => {
      // Remover script existente se houver
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      let structuredData: any;

      if (type === 'Organization') {
        const orgData = schemaData as SchemaOrganization;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": orgData.name,
          "description": orgData.description,
          "url": orgData.url,
          "logo": orgData.logo,
          "founder": orgData.founder ? {
            "@type": "Person",
            "name": orgData.founder.name,
            "jobTitle": orgData.founder.jobTitle
          } : undefined,
          "sameAs": orgData.sameAs,
          "contactPoint": orgData.contactPoint ? {
            "@type": "ContactPoint",
            "email": orgData.contactPoint.email,
            "contactType": orgData.contactPoint.contactType
          } : undefined
        };
      } else if (type === 'WebSite') {
        const siteData = schemaData as SchemaOrganization;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteData.name,
          "url": siteData.url,
          "description": siteData.description,
          "publisher": {
            "@type": "Organization",
            "name": siteData.name,
            "logo": siteData.logo
          }
        };
      } else {
        // Schema Product
        const productData = schemaData as SchemaProduct;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productData.name,
          "description": productData.description,
          "brand": {
            "@type": "Brand",
            "name": productData.brand
          },
          "image": productData.image || image,
          "category": productData.category,
          "offers": {
            "@type": "Offer",
            "price": productData.price,
            "priceCurrency": productData.currency,
            "availability": `https://schema.org/${productData.availability || 'InStock'}`
          }
        };

        // Adicionar propriedades educacionais se fornecidas
        if (productData.ageRange) {
          structuredData.audience = {
            "@type": "Audience",
            "suggestedMinAge": productData.ageRange
          };
        }

        if (productData.educationalUse) {
          structuredData.educationalUse = productData.educationalUse;
        }
      }

      // Criar e inserir script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    };

    // Verificar se está no ambiente do navegador
    if (typeof window === 'undefined') return;

    // Title (sempre primeiro)
    document.title = title;

    // Meta tags básicas
    setMetaTag('description', description);
    setMetaTag('author', author);
    
    if (keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', 'Mundo Flavinha', true);
    
    if (url) {
      setMetaTag('og:url', url, true);
    }
    
    if (image) {
      setMetaTag('og:image', image, true);
      setMetaTag('og:image:width', '1200', true);
      setMetaTag('og:image:height', '630', true);
      setMetaTag('og:image:alt', title, true);
    }

    // Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:site', '@mundoflavinha');
    setMetaTag('twitter:creator', '@mundoflavinha');
    
    if (image) {
      setMetaTag('twitter:image', image);
      setMetaTag('twitter:image:alt', title);
    }

    // Meta tags adicionais para SEO
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'pt-BR');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Para produtos educativos
    if (type === 'product') {
      setMetaTag('product-type', 'Digital Download');
      setMetaTag('audience', 'Famílias e Educadores');
    }

    // Link canonical
    if (canonical || url) {
      setLinkTag('canonical', canonical || url!);
    }

    // Preconnect para performance
    setLinkTag('preconnect', 'https://fonts.googleapis.com');
    setLinkTag('preconnect', 'https://www.google-analytics.com');

    // Schema.org JSON-LD
    if (schema) {
      setSchemaScript(schema, schemaType);
    }

    // Cleanup function para desenvolvimento
    return () => {
      // Cleanup útil para hot reload em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        // Remove script JSON-LD em desenvolvimento para evitar duplicatas
        const schemaScript = document.querySelector('script[type="application/ld+json"]');
        if (schemaScript && schema) {
          schemaScript.remove();
        }
      }
    };
  }, [title, description, keywords, image, type, url, schema, schemaType, author, canonical]);
}

// Versão como componente React (alternativa)
interface SEOHeadProps extends SEOProps {
  children?: never;
}

export function SEOHead(props: SEOHeadProps) {
  useSEO(props);
  return null; // Componente não renderiza nada visualmente
}

// Hook auxiliar para páginas específicas do Mundo Flavinha
export function useMundoFlavinhaSEO(pageData: {
  title: string;
  description: string;
  productName?: string;
  price?: string;
  path: string;
  keywords?: string[];
}) {
  const baseUrl = 'https://www.mundoflavinha.com';
  const fullUrl = `${baseUrl}${pageData.path}`;
  
  //Home na raiz, produtos em suas pastas
  const getOgImage = (path: string) => {
    if (path === '/') {
      return `${baseUrl}/images/mundo-flavinha-og.jpg`;
    }

    return `${baseUrl}/images/products${path}/og.jpg`;
  };

  const ogImage = getOgImage(pageData.path);

  return useSEO({
    title: `${pageData.title} | Mundo Flavinha`,
    description: pageData.description,
    url: fullUrl,
    image: ogImage,
    type: pageData.productName ? 'product' : 'website',
    keywords: pageData.keywords,
    canonical: fullUrl,
    ...(pageData.productName && pageData.price && {
      schemaType: 'Product' as const,
      schema: {
        name: pageData.productName,
        description: pageData.description,
        brand: 'Mundo Flavinha',
        price: pageData.price,
        currency: 'BRL',
        availability: 'InStock' as const
      }
    })
  });
}

export default useSEO;
