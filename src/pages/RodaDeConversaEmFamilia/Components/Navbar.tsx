import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "../../../components/ui/button";

const MyProductsNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Grid de 3 colunas: esquerda (vazia), centro (logo), direita (botão/menu) */}
        <div className="relative grid grid-cols-3 items-center">
          {/* Esquerda (vazia, mas ocupa espaço para centralizar o logo) */}
          <div></div>
          {/* Centro: Logo centralizado em toda a largura */}
          <div className="flex justify-center">
            <a href="#" className="text-2xl font-bold text-primary flex justify-center w-full">
              <img 
                src="/images/logo_mundo-flavinha.png" 
                alt="Logo Mundo Flavinha - Product showcase" 
                className="mx-auto"
                width="120"
              />
            </a>
          </div>
          {/* Direita: Botão ou menu */}
          {/* <div className="flex justify-end items-center">
            <div className="hidden md:block">
              <Button className="group px-8 py-3 bg-transparent rounded-full font-medium text-primary hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-x">
                Ir para o site principal
              </Button>
            </div>
            <div className="md:hidden ml-2">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div> */}
        </div>
        {/* Mobile Navigation */}
        {/* {isMenuOpen && (
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
        )} */}
      </div>
    </nav>
  );
};

export default MyProductsNavbar;