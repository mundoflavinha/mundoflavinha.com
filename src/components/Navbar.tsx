import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "./ui/button";

const navItems = [
  { href: "#home", label: "Inicio" },
  { href: "#features", label: "Como funciona" },
  { href: "#products", label: "Materiais" },
  { href: "#testimonials", label: "Resultados" },
  { href: "#contact", label: "Contato" },
] as const;

interface NavbarProps {
  homeVersion?: "v1" | "v2";
}

const Navbar = ({ homeVersion = "v1" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const alternateHome = homeVersion === "v2"
    ? { href: "/_old", label: "Ver home _OLD" }
    : { href: "/", label: "Ver home atual" };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm" role="navigation" aria-label="Navegação principal">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary" aria-label="Mundo Flavinha - Página inicial">
              <img 
                src="/images/logo_mundo-flavinha.png" 
                alt="Logo Mundo Flavinha" 
                className=""
                width="120"
                height="40"
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 list-none">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-gray-700 hover:text-primary transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="hidden md:block">
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="border-primary/30 px-5 text-primary hover:bg-primary hover:text-white">
                <a href={alternateHome.href}>{alternateHome.label}</a>
              </Button>
              <Button asChild className="bg-primary hover:bg-opacity-90 text-white px-6">
                <a href="/dia-dos-pais">Ver material em destaque</a>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-2"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm animate-fade-in">
            <ul className="flex flex-col space-y-4 list-none">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-primary/5 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Button asChild variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white">
                  <a href={alternateHome.href} onClick={() => setIsMenuOpen(false)}>
                    {alternateHome.label}
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild className="bg-primary hover:bg-opacity-90 text-white w-full">
                  <a href="/dia-dos-pais" onClick={() => setIsMenuOpen(false)}>Ver material em destaque</a>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
