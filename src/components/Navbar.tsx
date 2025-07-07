import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-primary">
              <img 
                  src="/src/assets/logo_mundo-flavinha.png" 
                  alt="Product showcase" 
                  className=""
                  width="120"
                />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary transition-colors">Home</a>
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a>
            <a href="#products" className="text-gray-700 hover:text-primary transition-colors">Products</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
          </div>
          
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-opacity-90 text-white px-6">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-primary transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a>
              <a href="#products" className="text-gray-700 hover:text-primary transition-colors">Products</a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
              <Button className="bg-primary hover:bg-opacity-90 text-white w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;