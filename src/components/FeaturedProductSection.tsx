import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { ArrowRight } from "lucide-react";

const FeaturedProductSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Get more out of <br />Prolend Watch</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Fully layered dolor sit amet, consectetur adipisicing elit. Facere, nobis, 
                  id expedita dolores officiis laboriosam.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Customizable design dolor sit amet, consectetur adipisicing elit. 
                  Facere, nobis, id expedita dolores officiis laboriosam.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Drop ipsum dolor sit amet, consectetur adipisicing elit. Facere, nobis, 
                  id expedita dolores officiis laboriosam.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Marketing chart dolor sit amet, consectetur adipisicing elit. Facere, 
                  nobis, id expedita dolores officiis laboriosam.
                </p>
              </div>
            </div>
            
            <Button className="text-primary hover:bg-primary hover:text-white border-primary flex items-center gap-2 px-0 border-0">
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12"
              alt="Premium Smartwatch"
              className="max-h-96 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSection;
