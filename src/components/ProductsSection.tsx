import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Product 1",
    description: "High-quality product with advanced features for everyday use.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    price: "$99.99"
  },
  {
    id: 2,
    name: "Premium Product 2",
    description: "Elegant design combined with powerful performance.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: "$129.99"
  },
  {
    id: 3,
    name: "Premium Product 3",
    description: "Innovative technology that simplifies your daily routine.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    price: "$79.99"
  },
  {
    id: 4,
    name: "Premium Product 4",
    description: "Compact and portable solution for modern lifestyles.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    price: "$149.99"
  },
  {
    id: 5,
    name: "Premium Product 5",
    description: "State-of-the-art technology with intuitive interface.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: "$199.99"
  },
  {
    id: 6,
    name: "Premium Product 6",
    description: "Advanced features packaged in a sleek and modern design.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    price: "$89.99"
  },
  {
    id: 7,
    name: "Premium Product 7",
    description: "Versatile product suitable for professionals and enthusiasts.",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    price: "$159.99"
  },
  {
    id: 8,
    name: "Premium Product 8",
    description: "Premium quality with a focus on durability and performance.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: "$119.99"
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-16 md:py-24 bg-tertiary bg-opacity-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Featured Products</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our most popular and highly rated products that customers love.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow h-full">
              <div className="h-40 md:h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-4 text-xs md:text-sm">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold">{product.price}</span>
                  <Button size="sm" className="bg-primary hover:bg-opacity-90 flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden md:inline">Add to Cart</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;