import { Button } from "./ui/button";

const ProductNavbar = () => {
  return (
    <nav
      aria-label="Navegacao da landing"
      className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a
          aria-label="Voltar para a pagina inicial do Mundo Flavinha"
          className="flex items-center"
          href="/"
        >
          <img
            alt="Logo Mundo Flavinha"
            className="h-10 w-auto"
            height="40"
            src="/images/logo_mundo-flavinha.png"
            width="120"
          />
        </a>

        <Button asChild className="bg-primary text-white hover:bg-primary/90">
          <a href={`mailto:contato@mundoflavinha.com?subject=${encodeURIComponent("Quero saber mais sobre os materiais do Mundo Flavinha")}`}>
            Falar com a Flavinha
          </a>
        </Button>
      </div>
    </nav>
  );
};

export default ProductNavbar;
