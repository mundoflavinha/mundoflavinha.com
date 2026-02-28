import { HOME_CATALOG } from "../config/site";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ProductsSection = () => {
  return (
    <section className="bg-secondary/15 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Sugestoes para ampliar o repertorio da brincadeira
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Alem dos materiais digitais, o Mundo Flavinha tambem compartilha
            referencias de brinquedos e recursos que podem apoiar a interacao em
            familia.
          </p>
        </div>

        <div className="mt-12">
          <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">
                Produtos em destaque
              </p>
              <h3 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
                Recomendacoes principais da Flavinha
              </h3>
            </div>
            <div className="hidden h-px flex-1 bg-primary/15 md:block" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_CATALOG.produtos_destaque.map((product) => (
              <Card
                className="overflow-hidden rounded-[2rem] border-none bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                key={product.href}
              >
                <div className="flex h-64 items-center justify-center bg-secondary/10 p-6">
                  <img
                    alt={product.name}
                    className="h-full w-full object-contain"
                    height="320"
                    loading="lazy"
                    src={product.image}
                    width="320"
                  />
                </div>

                <div className="flex h-full flex-col p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                    {product.price}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-primary">
                    {product.name}
                  </h3>
                  <p className="mt-4 flex-1 text-gray-700 md:min-h-24">{product.description}</p>

                  <Button asChild className="mt-6 w-full bg-primary text-white hover:bg-primary/90">
                    <a href={product.href}>{product.cta}</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-primary/10 pt-12">
          <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">
                Outros produtos
              </p>
              <h3 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
                Mais sugestoes para recomendar aos pais
              </h3>
            </div>
            <div className="hidden h-px flex-1 bg-primary/15 md:block" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {HOME_CATALOG.produtos.map((product) => (
              <Card
                className="overflow-hidden rounded-[2rem] border-none bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                key={product.name}
              >
                <img
                  alt={product.name}
                  className="h-56 w-full object-cover"
                  height="320"
                  loading="lazy"
                  src={product.image}
                  width="420"
                />
                <div className="flex h-full flex-col p-6">
                  <h3 className="text-xl font-semibold text-primary">
                    {product.name}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-6 text-gray-700">
                    {product.description}
                  </p>
                  <Button asChild className="mt-6 w-full bg-primary text-white hover:bg-primary/90">
                    <a href={product.href}>{product.cta}</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
