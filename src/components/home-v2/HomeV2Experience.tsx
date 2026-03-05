import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Menu,
  MessageCircle,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { type HomeV2Content } from "../../content/homeV2";
import { Button } from "../ui/button";

const SHELL_BACKGROUND = "#f0efeb";
const supabasePublicBaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const configuredStorageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET?.trim();

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}

interface SectionTopCurveProps {
  fromColor: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) => (
  <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8b665d]">
      {eyebrow}
    </p>
    <h2 className="mt-3 font-display text-4xl leading-none text-[#231814] sm:text-5xl">
      {title}
    </h2>
    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
      {description}
    </p>
  </div>
);

const SectionTopCurve = ({ fromColor }: SectionTopCurveProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 lg:h-28"
  >
    <div
      className="absolute left-1/2 top-0 h-[14rem] w-[210%] -translate-x-1/2 -translate-y-[58%] rounded-[100%] sm:h-[16rem] lg:h-[20rem]"
      style={{ backgroundColor: fromColor }}
    />
  </div>
);

const HeaderWaveCutout = ({ isCompact }: { isCompact: boolean }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-500 ease-out ${
      isCompact ? "h-0 opacity-0" : "h-8 opacity-100 sm:h-9 lg:h-11"
    }`}
  >
    <svg
      className="block h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 80"
    >
      <path
        d="M0 44Q60 6 120 44T240 44T360 44T480 44T600 44T720 44T840 44T960 44T1080 44T1200 44T1320 44T1440 44V80H0Z"
        fill={SHELL_BACKGROUND}
      />
    </svg>
  </div>
);

const InstagramBrandIcon = () => (
  <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="instagram-card-gradient" x1="0%" x2="100%" y1="100%" y2="0%">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="32%" stopColor="#fa7e1e" />
        <stop offset="65%" stopColor="#d62976" />
        <stop offset="100%" stopColor="#962fbf" />
      </linearGradient>
    </defs>
    <rect fill="url(#instagram-card-gradient)" height="64" rx="18" width="64" />
    <rect
      fill="none"
      height="28"
      rx="9"
      stroke="#ffffff"
      strokeWidth="4"
      width="28"
      x="18"
      y="18"
    />
    <circle cx="32" cy="32" fill="none" r="7" stroke="#ffffff" strokeWidth="4" />
    <circle cx="42.5" cy="21.5" fill="#ffffff" r="2.4" />
  </svg>
);

const TikTokBrandIcon = () => (
  <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 64 64">
    <rect fill="#0a0a0a" height="64" rx="18" width="64" />
    <path
      d="M37 17c2 5 5 8 10 9v6c-3 0-6-1-9-3v11c0 7-5 11-11 11-6 0-11-5-11-11s5-11 11-11c1 0 2 0 3 .4v6a6 6 0 0 0-3-.8 5 5 0 1 0 5 5V17h5z"
      fill="#25F4EE"
      opacity="0.95"
      transform="translate(-2,2)"
    />
    <path
      d="M37 17c2 5 5 8 10 9v6c-3 0-6-1-9-3v11c0 7-5 11-11 11-6 0-11-5-11-11s5-11 11-11c1 0 2 0 3 .4v6a6 6 0 0 0-3-.8 5 5 0 1 0 5 5V17h5z"
      fill="#FE2C55"
      opacity="0.95"
      transform="translate(2,-1)"
    />
    <path
      d="M37 17c2 5 5 8 10 9v6c-3 0-6-1-9-3v11c0 7-5 11-11 11-6 0-11-5-11-11s5-11 11-11c1 0 2 0 3 .4v6a6 6 0 0 0-3-.8 5 5 0 1 0 5 5V17h5z"
      fill="#ffffff"
    />
  </svg>
);

const YouTubeBrandIcon = () => (
  <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 64 64">
    <rect fill="#ff0000" height="64" rx="18" width="64" />
    <path d="M44 32 25 21v22z" fill="#ffffff" />
  </svg>
);

const SocialBrandIcon = ({
  logo,
}: {
  logo: "instagram" | "tiktok" | "youtube";
}) => {
  if (logo === "instagram") return <InstagramBrandIcon />;
  if (logo === "tiktok") return <TikTokBrandIcon />;
  return <YouTubeBrandIcon />;
};

interface HomeV2ExperienceProps {
  content: HomeV2Content;
  disableStickyHeader?: boolean;
}

interface CmsImageProps {
  alt: string;
  className?: string;
  height?: number | string;
  loading?: "eager" | "lazy";
  src: string;
  width?: number | string;
}

function getStorageBucketCandidates() {
  return [...new Set([configuredStorageBucket, "cms-images", "images"].filter(Boolean) as string[])];
}

function buildSupabaseProductsUrl(bucket: string, sourcePath: string) {
  if (!supabasePublicBaseUrl) return null;
  if (!sourcePath.startsWith("/images/products/")) return null;
  const relativePath = sourcePath.replace(/^\/images\/products\//, "");
  if (!relativePath) return null;
  const encodedPath = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${supabasePublicBaseUrl}/storage/v1/object/public/${encodeURIComponent(
    bucket,
  )}/products/${encodedPath}`;
}

const CmsImage = ({ alt, className, height, loading, src, width }: CmsImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setFallbackIndex(0);
  }, [src]);

  const fallbackSources = getStorageBucketCandidates()
    .map((bucket) => buildSupabaseProductsUrl(bucket, src))
    .filter(Boolean) as string[];

  return (
    <img
      alt={alt}
      className={className}
      height={height}
      loading={loading}
      onError={() => {
        const nextSource = fallbackSources[fallbackIndex];
        if (!nextSource || nextSource === currentSrc) return;
        setCurrentSrc(nextSource);
        setFallbackIndex((current) => current + 1);
      }}
      src={currentSrc}
      width={width}
    />
  );
};

const HomeV2Experience = ({ content, disableStickyHeader = false }: HomeV2ExperienceProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonialCards = content.testimonials.items;
  const hasMoreThanOneTestimonial = testimonialCards.length > 1;

  useEffect(() => {
    if (disableStickyHeader) return;

    const compactAt = 110;
    const expandAt = 28;
    let frameId = 0;

    const updateHeaderState = () => {
      const currentScrollY = window.scrollY;

      setIsHeaderCompact((current) => {
        if (current) return currentScrollY > expandAt;
        return currentScrollY > compactAt;
      });

      frameId = 0;
    };

    const handleScroll = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [disableStickyHeader]);

  useEffect(() => {
    if (currentTestimonial < testimonialCards.length) return;
    setCurrentTestimonial(0);
  }, [currentTestimonial, testimonialCards.length]);

  const activeTestimonial = testimonialCards[currentTestimonial] ?? testimonialCards[0];

  if (!activeTestimonial) {
    return null;
  }

  const showPreviousTestimonial = () => {
    if (!hasMoreThanOneTestimonial) return;

    setCurrentTestimonial((current) =>
      current === 0 ? testimonialCards.length - 1 : current - 1,
    );
  };

  const showNextTestimonial = () => {
    if (!hasMoreThanOneTestimonial) return;

    setCurrentTestimonial((current) =>
      current === testimonialCards.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="home-v2-shell min-h-screen text-[#231814]" style={{ background: SHELL_BACKGROUND }}>
      <header
        className={`${disableStickyHeader ? "relative" : "sticky top-0"} z-50 overflow-hidden backdrop-blur transition-[box-shadow] duration-500 ${
          isHeaderCompact || isMenuOpen
            ? "shadow-[0_14px_35px_-32px_rgba(35,24,20,0.55)]"
            : "shadow-none"
        }`}
        style={{
          background: isHeaderCompact || isMenuOpen ? "#ffffff9e" : "#ffffff",
          backdropFilter: isHeaderCompact || isMenuOpen ? "blur(8px)" : "none",
          WebkitBackdropFilter: isHeaderCompact || isMenuOpen ? "blur(8px)" : "none",
        }}
      >
        <div className="hidden lg:block">
          <div
            className={`mx-auto max-w-[1180px] px-8 transition-[height,padding] duration-500 ease-out ${
              isHeaderCompact ? "h-[5.35rem]" : "h-[11.2rem]"
            }`}
          >
            <div className="relative h-full">
              <a
                className={`absolute z-10 inline-flex items-center justify-center transition-all duration-500 ease-out ${
                  isHeaderCompact
                    ? "left-0 top-1/2 -translate-y-1/2"
                    : "left-1/2 top-6 -translate-x-1/2"
                }`}
                href="/home-v2"
              >
                <img
                  alt="Logo Mundo Flavinha"
                  className={`w-auto transition-[height,transform] duration-500 ease-out ${
                    isHeaderCompact ? "h-[2.9rem]" : "h-[5.4rem]"
                  }`}
                  height="86"
                  src="/images/logo_mundo-flavinha.png"
                  width="172"
                />
              </a>

              <nav
                aria-label="Navegacao principal"
                className={`absolute left-1/2 z-10 transition-all duration-500 ease-out ${
                  isHeaderCompact
                    ? "top-1/2 -translate-x-1/2 -translate-y-1/2"
                    : "bottom-11 -translate-x-1/2"
                }`}
              >
                <ul className="flex items-center gap-9">
                  {content.navigationItems.map((item) => (
                    <li key={item.href}>
                      <a
                        className="text-sm font-medium uppercase tracking-[0.28em] text-slate-600 transition-colors hover:text-[#eb7a91]"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div
          className={`relative lg:hidden transition-[padding] duration-500 ${
            isHeaderCompact ? "py-3.5" : "py-4"
          }`}
        >
          <div className="mx-auto grid max-w-[1120px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-6">
            <div />

            <a className="inline-flex items-center justify-center" href="/home-v2">
              <img
                alt="Logo Mundo Flavinha"
                className={`w-auto transition-[height] duration-500 ${
                  isHeaderCompact ? "h-9" : "h-12"
                }`}
                height="48"
                src="/images/logo_mundo-flavinha.png"
                width="152"
              />
            </a>

            <div className="justify-self-end">
              <button
                aria-controls="home-v2-mobile-nav"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#231814] shadow-sm ring-1 ring-black/5 transition hover:text-[#eb7a91]"
                onClick={() => setIsMenuOpen((current) => !current)}
                type="button"
              >
                {isMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-black/5 bg-[#fafafa] px-5 pb-5 pt-4 lg:hidden" id="home-v2-mobile-nav">
            <nav aria-label="Navegacao mobile">
              <ul className="space-y-2">
                {content.navigationItems.map((item) => (
                  <li key={item.href}>
                    <a
                      className="block rounded-2xl bg-white px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-700 shadow-sm ring-1 ring-black/5 transition hover:text-[#eb7a91]"
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : null}

        <HeaderWaveCutout isCompact={isHeaderCompact || isMenuOpen} />
      </header>

      <main className="pb-16" id="main-content">
        {content.hero.enabled ? (
          <section className="scroll-mt-24" id="home">
          <div className="mx-auto max-w-[1120px] px-5 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
            <div className="max-w-[72rem]">
              <p className="font-display text-3xl italic leading-none text-[#67c8c1] sm:text-4xl">
                {content.hero.introText}
              </p>

              <h1 className="mt-4 font-display text-[clamp(4.5rem,10vw,8.9rem)] leading-[0.88] tracking-[-0.05em] text-[#eb7a91]">
                {content.hero.name}
              </h1>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
              <div className="order-2 lg:order-1">
                <div className="border-t border-[#eb7a91]/75 pt-7 sm:pt-8 lg:max-w-[35rem] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <h2 className="max-w-[32rem] font-display text-4xl leading-[1.02] text-[#171111] sm:text-5xl lg:text-[3.65rem]">
                    {content.hero.headline}
                  </h2>

                  <p className="mt-6 max-w-[30rem] text-base leading-8 text-slate-600 sm:text-lg">
                    {content.hero.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      className="h-12 rounded-full bg-[#eb7a91] px-6 text-sm font-semibold text-white hover:bg-[#df6d86]"
                    >
                      <a href={content.hero.primaryAction.href}>
                        {content.hero.primaryAction.label}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </Button>

                    <Button
                      asChild
                      className="h-12 rounded-full border border-[#d7cfc7] bg-[#fafafa] px-6 text-sm font-semibold text-[#231814] hover:bg-[#f4f4f4]"
                      variant="outline"
                    >
                      <a href={content.hero.secondaryAction.href}>{content.hero.secondaryAction.label}</a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="order-1 mx-auto w-full max-w-[30rem] lg:order-2 lg:mx-0 lg:max-w-[33rem]">
                <div className="relative aspect-square rounded-full bg-gradient-to-br from-[#44c2dc] to-[#359dcf] p-5 shadow-[0_28px_70px_-40px_rgba(42,130,164,0.75)]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-2 rounded-full border border-[#77e8f6]/50"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-5 rounded-full border-2 border-[#57d7ea]/55"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_62%)]"
                  />

                  <div className="relative h-full w-full overflow-hidden rounded-full border-[14px] border-[#59e4f0]/75 bg-white/30">
                    <CmsImage
                      alt={content.hero.imageAlt}
                      className="h-full w-full rounded-full object-cover object-center"
                      height="680"
                      loading="eager"
                      src={content.hero.imageSrc}
                      width="680"
                    />
                  </div>

                  <Sparkles
                    aria-hidden="true"
                    className="absolute bottom-[12%] right-[11%] h-6 w-6 text-[#b6d9ff]"
                  />
                </div>
              </div>
            </div>
          </div>

          </section>
        ) : null}

        {content.channels.enabled ? (
          <section className="scroll-mt-24 relative overflow-hidden bg-[#cac8e4] pb-12 pt-24 lg:pb-16 lg:pt-32" id="canais">
          <SectionTopCurve fromColor={SHELL_BACKGROUND} />

          <div className="relative mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8 pt-16">
            <SectionHeading
              description={content.channels.heading.description}
              eyebrow={content.channels.heading.eyebrow}
              title={content.channels.heading.title}
            />

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {content.channels.cards.map(({ title, logo, description, href, cta }) => (
                <article
                  className="rounded-[2.6rem] bg-white p-6 shadow-[0_18px_45px_-28px_rgba(30,20,16,0.28)] ring-1 ring-black/5"
                  key={title}
                >
                  <div className="flex justify-center">
                    <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[1.75rem] bg-[#f8f5f1] shadow-[0_12px_24px_-18px_rgba(30,20,16,0.35)]">
                      <SocialBrandIcon logo={logo} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-center font-display text-4xl leading-none text-[#231814]">
                    {title}
                  </h3>

                  <p className="mt-4 text-center text-sm leading-7 text-slate-600">
                    {description}
                  </p>

                  <a
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-[#eb7a91] transition hover:gap-3"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {cta}
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
          </section>
        ) : null}

        {content.authored.enabled ? (
          <section className="scroll-mt-24 relative overflow-hidden bg-[#f6f0e4] pb-12 pt-24 lg:pb-16 lg:pt-32" id="conteudos">
          <SectionTopCurve fromColor="#cac8e4" />

          <div className="relative mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8 pt-16">
            <SectionHeading
              description={content.authored.heading.description}
              eyebrow={content.authored.heading.eyebrow}
              title={content.authored.heading.title}
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {content.authored.products.map((product) => (
                <article
                  className="flex h-full flex-col overflow-hidden rounded-[2.6rem] bg-white shadow-[0_18px_45px_-28px_rgba(30,20,16,0.28)] ring-1 ring-black/5"
                  key={product.href}
                >
                  <CmsImage
                    alt={product.name}
                    className="h-64 w-full object-cover"
                    height="320"
                    loading="lazy"
                    src={product.image}
                    width="420"
                  />

                  <div className="flex h-full flex-col px-5 pb-5 pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#eb7a91]">
                      {content.authored.badgeLabel}
                    </p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b665d]">
                      {product.price}
                    </p>
                    <h3 className="mt-3 font-display text-3xl leading-none text-[#231814]">
                      {product.name}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {product.description}
                    </p>

                    <Button
                      asChild
                      className="mt-auto h-11 rounded-full bg-[#eb7a91] px-5 text-white hover:bg-[#df6d86]"
                    >
                      <a href={product.href}>{product.cta}</a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
          </section>
        ) : null}

        {content.suggestions.enabled ? (
          <section className="scroll-mt-24 relative overflow-hidden bg-[#dcece6] pb-12 pt-24 lg:pb-16 lg:pt-32" id="materiais">
          <SectionTopCurve fromColor="#f6f0e4" />

          <div className="relative mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8 pt-16">
            <SectionHeading
              description={content.suggestions.heading.description}
              eyebrow={content.suggestions.heading.eyebrow}
              title={content.suggestions.heading.title}
            />

            <div className="mt-10">
              <div className="flex items-center gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#67c8c1]">
                  {content.suggestions.highlightedLabel}
                </p>
                <div className="h-px flex-1 bg-[#cfe1dd]" />
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {content.suggestions.highlighted.map((product) => (
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-[0_18px_45px_-28px_rgba(30,20,16,0.24)] ring-1 ring-black/5"
                    key={product.name}
                  >
                    <CmsImage
                      alt={product.name}
                      className="h-56 w-full object-cover"
                      height="280"
                      loading="lazy"
                      src={product.image}
                      width="360"
                    />

                    <div className="flex h-full flex-col px-5 pb-5 pt-5">
                      <h3 className="mt-3 font-display text-3xl leading-none text-[#231814]">
                        {product.name}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {product.description}
                      </p>

                      <Button
                        asChild
                        className="mt-auto h-11 rounded-full bg-[#eb7a91] text-white hover:bg-[#df6d86]"
                      >
                        <a href={product.href}>
                          {product.cta}
                          <ChevronRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-[#dce7e3] pt-10">
              <div className="flex items-center gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8b665d]">
                  {content.suggestions.additionalLabel}
                </p>
                <div className="h-px flex-1 bg-[#dce7e3]" />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {content.suggestions.additional.map((product) => (
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-[2.1rem] bg-white shadow-[0_18px_45px_-28px_rgba(30,20,16,0.24)] ring-1 ring-black/5"
                    key={product.name}
                  >
                    <CmsImage
                      alt={product.name}
                      className="h-44 w-full object-cover"
                      height="220"
                      loading="lazy"
                      src={product.image}
                      width="320"
                    />

                    <div className="flex h-full flex-col px-4 pb-4 pt-4">
                      <h3 className="mt-3 font-display text-[1.7rem] leading-none text-[#231814]">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {product.description}
                      </p>

                      <Button
                        asChild
                        className="mt-auto h-10 w-full rounded-full bg-[#eb7a91] text-white hover:bg-[#df6d86]"
                      >
                        <a href={product.href}>
                          {product.cta}
                          <ChevronRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          </section>
        ) : null}

        {content.testimonials.enabled || content.finalCta.enabled ? (
          <section className="relative overflow-hidden bg-[#c8e4df] pb-12 pt-24 lg:pb-16 lg:pt-32">
            <SectionTopCurve fromColor="#dcece6" />

            <div className="relative mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8">
              {content.testimonials.enabled ? (
                <>
                  <SectionHeading
                    description={content.testimonials.heading.description}
                    eyebrow={content.testimonials.heading.eyebrow}
                    title={content.testimonials.heading.title}
                  />

                  <div className="mt-10 overflow-hidden rounded-[2.8rem] bg-white p-6 shadow-[0_20px_55px_-34px_rgba(30,20,16,0.35)] ring-1 ring-black/5 sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <div className="h-40 w-40 overflow-hidden rounded-full bg-[#f6f0e4] ring-4 ring-[#f3ece2] sm:h-48 sm:w-48">
                          <CmsImage
                            alt={activeTestimonial.name}
                            className="h-full w-full object-cover"
                            height="192"
                            loading="lazy"
                            src={activeTestimonial.image}
                            width="192"
                          />
                        </div>

                        <p className="mt-5 font-display text-3xl leading-none text-[#231814]">
                          {activeTestimonial.name}
                        </p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b665d]">
                          {activeTestimonial.role}
                        </p>
                      </div>

                      <div>
                        <p className="font-display text-[2rem] leading-[1.08] text-[#231814] sm:text-[2.6rem]">
                          “{activeTestimonial.content}”
                        </p>

                        <div className="mt-8 flex items-center justify-between gap-4">
                          <div className="flex gap-2">
                            {testimonialCards.map((testimonial, index) => (
                              <span
                                aria-hidden="true"
                                className={`h-2.5 rounded-full transition-all ${
                                  index === currentTestimonial
                                    ? "w-8 bg-[#eb7a91]"
                                    : "w-2.5 bg-[#e7ddd5]"
                                }`}
                                key={testimonial.name}
                              />
                            ))}
                          </div>

                          <div className="flex gap-3">
                            <button
                              aria-label="Depoimento anterior"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#faf7f2] text-[#231814] ring-1 ring-[#eadfd6] transition hover:bg-[#f2ebe3]"
                              disabled={!hasMoreThanOneTestimonial}
                              onClick={showPreviousTestimonial}
                              type="button"
                            >
                              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                            </button>
                            <button
                              aria-label="Proximo depoimento"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#eb7a91] text-white transition hover:bg-[#df6d86]"
                              disabled={!hasMoreThanOneTestimonial}
                              onClick={showNextTestimonial}
                              type="button"
                            >
                              <ChevronRight aria-hidden="true" className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {content.finalCta.enabled ? (
                <div className="mt-10 overflow-hidden rounded-[2.8rem] bg-gradient-to-r from-[#ff611e] via-[#ff4d45] to-[#ff4d88] px-6 py-8 text-white shadow-[0_24px_60px_-30px_rgba(255,84,60,0.55)] sm:px-8 lg:px-10">
                  <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/75">
                        {content.finalCta.eyebrow}
                      </p>
                      <h2 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl">
                        {content.finalCta.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        {content.finalCta.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Button
                        asChild
                        className="h-12 w-full rounded-full bg-white px-6 text-[#ea4d38] hover:bg-white/95"
                      >
                        <a href={content.finalCta.primaryAction.href}>
                          {content.finalCta.primaryAction.label}
                          <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </Button>

                      <div className="flex flex-wrap gap-3">
                        {content.finalCta.secondaryActions.map((action) => (
                          <a
                            className="inline-flex h-11 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15"
                            href={action.href}
                            key={action.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {action.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
      </main>

      {content.footer.enabled ? (
        <footer className="border-t border-black/5 bg-[#f0efeb]" id="rodape">
        <div className="mx-auto max-w-[1120px] px-5 pb-12 pt-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <img
                alt="Logo Mundo Flavinha"
                className="h-10 w-auto"
                height="40"
                src="/images/logo_mundo-flavinha.png"
                width="122"
              />
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {content.footer.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {content.footer.socialLinks.map((link) => (
                <a
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[#231814] shadow-sm ring-1 ring-black/5 transition hover:text-[#f3542c]"
                  href={link.href}
                  key={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.platform === "instagram" ? (
                    <Instagram aria-hidden="true" className="mr-2 h-4 w-4" />
                  ) : null}
                  {link.platform === "tiktok" ? (
                    <MessageCircle aria-hidden="true" className="mr-2 h-4 w-4" />
                  ) : null}
                  {link.platform === "youtube" ? (
                    <Youtube aria-hidden="true" className="mr-2 h-4 w-4" />
                  ) : null}
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-black/5 pt-5 text-xs uppercase tracking-[0.24em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Mundo Flavinha</p>
            <div className="flex flex-wrap gap-4">
              {content.footer.legalLinks.map((link) => (
                <a className="transition hover:text-[#f3542c]" href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
              <a
                className="inline-flex items-center gap-2 transition hover:text-[#f3542c]"
                href={`mailto:${content.footer.email}`}
              >
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                {content.footer.email}
              </a>
            </div>
          </div>
        </div>
        </footer>
      ) : null}
    </div>
  );
};

export default HomeV2Experience;
