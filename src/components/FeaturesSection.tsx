import { 
    Heart, Check, Shield, Package, Star, Clock 
  } from "lucide-react";
  
  const features = [
    {
      icon: <Heart className="h-12 w-12 text-primary mb-4" />,
      title: "Customer Favorite",
      description: "Our products are loved by customers for their quality and design."
    },
    {
      icon: <Check className="h-12 w-12 text-primary mb-4" />,
      title: "Quality Assured",
      description: "Every item undergoes strict quality control before shipping."
    },
    {
      icon: <Shield className="h-12 w-12 text-primary mb-4" />,
      title: "Secure Purchase",
      description: "Your transactions are protected with advanced security."
    },
    // {
    //   icon: <Package className="h-12 w-12 text-primary mb-4" />,
    //   title: "Fast Delivery",
    //   description: "Quick shipping options available for all products."
    // },
    // {
    //   icon: <Star className="h-12 w-12 text-primary mb-4" />,
    //   title: "Top Rated",
    //   description: "Products with high ratings and positive reviews."
    // },
    // {
    //   icon: <Clock className="h-12 w-12 text-primary mb-4" />,
    //   title: "24/7 Support",
    //   description: "Our customer service team is always ready to help."
    // }
  ];
  
  const FeaturesSection = () => {
    return (
      <section id="features" className="py-16 md:pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Momento de Des-Conexão</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Transforme o tempo com o seu filho em um momento de aprendizado e afeto! Tudo isso longe das telas!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-secondary bg-opacity-30 p-8 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;