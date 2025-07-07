import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
// import { ShoppingCart } from "lucide-react";

const HeroSection = () => {
  return (
    
    <section id="home" className="pt-16 md:pt-24 bg-gradient-to-b from-secondary to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Olá, meu nome é<br />Flávia Guimarães
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
            E vou te ajudar a transformar o tempo com seus filhos em momentos mágicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-opacity-90 text-white px-8 py-6">
                Sobre mim
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6">
                Contate-me
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-tertiary rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-full opacity-50"></div>
              <img 
                src="/src/assets/eu-flavinha.png" 
                alt="Product showcase" 
                className="rounded-lg shadow-xl relative z-10 w-meddium max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Minhas Redes</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Abaixo os lugares onde publico meus conteúdos. Vailá, me segue!
          </p>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <Card key="1" className="flex items-center pl-5">
              <div className="h-40 md:h-48 content-center">
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Instagram</h3>
                <p className="text-gray-700 mb-4 text-xs md:text-sm">27.530 seguidores</p>
                <div className="flex justify-between items-center">
                  {/* <span className="text-base md:text-lg font-bold pr-2">Me siga!</span> */}
                  <Button size="sm" className="bg-primary hover:bg-opacity-90 flex items-center gap-1">
                    {/* <ShoppingCart className="h-4 w-4" /> */}
                    <span className="hidden md:inline">Me siga</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card key="1" className="flex items-center pl-5">
              <div className="h-40 md:h-48 content-center">
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Facebook</h3>
                <p className="text-gray-700 mb-4 text-xs md:text-sm">27.530 seguidores</p>
                <div className="flex justify-between items-center">
                  {/* <span className="text-base md:text-lg font-bold pr-2">Me siga!</span> */}
                  <Button size="sm" className="bg-primary hover:bg-opacity-90 flex items-center gap-1">
                    {/* <ShoppingCart className="h-4 w-4" /> */}
                    <span className="hidden md:inline">Me siga</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card key="1" className="flex items-center pl-5">
              <div className="h-40 md:h-48 content-center">
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Tik Tok</h3>
                <p className="text-gray-700 mb-4 text-xs md:text-sm">27.530 seguidores</p>
                <div className="flex justify-between items-center">
                  {/* <span className="text-base md:text-lg font-bold pr-2">Me siga!</span> */}
                  <Button size="sm" className="bg-primary hover:bg-opacity-90 flex items-center gap-1">
                    {/* <ShoppingCart className="h-4 w-4" /> */}
                    <span className="hidden md:inline">Me siga</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card key="1" className="flex items-center pl-5">
              <div className="h-40 md:h-48 content-center">
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">YouTube</h3>
                <p className="text-gray-700 mb-4 text-xs md:text-sm">27.530 seguidores</p>
                <div className="flex justify-between items-center">
                  {/* <span className="text-base md:text-lg font-bold pr-2">Me siga!</span> */}
                  <Button size="sm" className="bg-primary hover:bg-opacity-90 flex items-center gap-1">
                    {/* <ShoppingCart className="h-4 w-4" /> */}
                    <span className="hidden md:inline">Me siga</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
        </div>
      </div>
    </section>

  );
};

export default HeroSection;