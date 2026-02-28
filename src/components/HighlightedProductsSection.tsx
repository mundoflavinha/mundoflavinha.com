import { HOME_CATALOG } from "../config/site";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const HighlightedProductsSection = () => {
  return (
    <section className="bg-primary/10 py-16 md:py-24" id="products">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Materiais digitais para comecar hoje
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Cada proposta foi pensada para ajudar voce a transformar momentos
            comuns em experiencias mais significativas dentro de casa.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
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

              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                  {product.price}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-primary">
                  {product.name}
                </h3>
                <p className="mt-4 min-h-24 text-gray-700">{product.description}</p>

                <Button asChild className="mt-6 w-full bg-primary text-white hover:bg-primary/90">
                  <a href={product.href}>{product.cta}</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightedProductsSection;
