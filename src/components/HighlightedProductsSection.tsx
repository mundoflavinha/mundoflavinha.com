import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle } from "lucide-react";

const highlightedProducts = [
  {
    id: 1,
    name: "Brinquedo Educativo Mesa Play Time",
    description: "Monitoramento avançado de atividades com alta precisão.",
    image: "/src/assets/products/cotiplas_brinquedo-educativo_mesa-play-time.jpg",
    features: [
      "High-Resolution Audio compatible",
      "Smart listening experience by Adaptive Sound Control",
      "Ergonomic, enfolding design earpads"
    ],
    price: "R$899,99"
  },
  {
    id: 2,
    name: "Brinquedo Interativo Musical ",
    description: "Experiência sonora imersiva com cancelamento de ruído.",
    image: "/src/assets/products/fisher-price_zebra_blocos-surpresa.jpg",
    features: [
      "High-Resolution Audio compatible",
      "Smart listening experience by Adaptive Sound Control",
      "Ergonomic, enfolding design earpads"
    ],
    price: "R$499,99"
  },
  {
    id: 3,
    name: "Zebra Blocos Surpresa",
    description: "Elegância e tecnologia com monitoramento completo de saúde.",
    image: "/src/assets/products/dm-toys_brinquedo-interativo-musical.jpg",
    features: [
      "High-Resolution Audio compatible",
      "Smart listening experience by Adaptive Sound Control", 
      "Ergonomic, enfolding design earpads"
    ],
    price: "R$1.299,99"
  }
];

const HighlightedProductsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos em Destaque</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Conheça nossos produtos mais populares com tecnologia de ponta e design exclusivo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlightedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow rounded-2xl border-none">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
                <div className="h-64 overflow-hidden flex items-center justify-center p-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-auto h-full object-contain transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2 mt-0.5">•</span>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{product.price}</span>
                    <Button className="bg-primary hover:bg-opacity-90">
                      Comprar agora
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightedProductsSection;