import { Button } from "../../../components/ui/button";
import { useScrollToSection } from "../../../hooks/useSmoothScroll";

const HeroSection = () => {
  
  const scrollToSection = useScrollToSection({
    duration: 700,
    offset: 80
  });
  
  return (
    <section className="md:pt-0 bg-gradient-to-b from-secondary to-white">
      
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-cyan-500 to-blue-400">
        
        <div className="absolute inset-0 bg-black bg-opacity-5">
          <div className="absolute inset-0 bg-funky-pattern"></div>
        </div>

        <div className="absolute top-[10%] left-[5%] transform rotate-12 animate-pulse-slow">
          <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
        </div>
        <div className="absolute top-[80%] left-[15%] transform -rotate-12 animate-pulse-slow">
          <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
        </div>
        <div className="absolute top-[20%] left-[90%] transform rotate-45 animate-pulse-slow">
          <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
        </div>
        <div className="absolute top-[70%] left-[80%] transform -rotate-45 animate-pulse-slow">
          <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
        </div>

        
        <div className="relative flex items-center justify-center px-4 py-1 md:py-12 mb-10">
          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <div className="text-center md:text-left space-y-6 z-10">
              <div className="inline-block mb-4">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium">
                  <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  <span>Quero te ajudar a se conectar com seu filho!</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                <span className="">
                Dia dos pais está chegando!
                </span>
                <br />
                <span className="inline-block bg-clip-text text-tertiary">
                  Que tal fazer algo diferente?
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white text-opacity-90">
                Transforme carinho em presente com os cartões criativos para o dia dos pais.
                Feito para imprimir, montar com as crianças e emocionar o coração do papai.
              </p>
              <p className="text-lg md:text-xl text-white text-opacity-90">
                Queremos te ajudar a criar memórias afetivas com seu filho.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                
              <Button 
                id="btnHeroGoCheckout"
                data-track="checkout-button"
                data-button-location="hero-section"
                data-button-text="Quero esse kit agora"
                onClick={() => scrollToSection("#limited-offer")} 
                className="...suas classes..."
              >
                Quero esse kit agora
              </Button>
              </div>
            </div>
        
            <div className="relative h-64 md:h-full flex items-center justify-center sm:mt-16 sm:mb-16 mt-5">
              {/* <img 
                src="/images/products/dia-dos-pais/dia-dos-pais-filha-dando-cartao.png" 
                alt="Dia dos pais - Filho dando cartão para o pai" 
                className="h-60 w-60 object-cover md:h-auto md:w-80 z-10 rounded-full object-cover shadow-[0px_0px_45px_10px_rgba(0,253,255,1)]"
                /> */}

              <video className="w-full max-w-[320px] h-auto aspect-square object-cover sm:max-w-[384px] md:max-w-[768px] lg:max-w-[1280px] xl:max-w-[1600px] z-10 rounded-full shadow-[0px_0px_45px_10px_rgba(0,253,255,1)]" 
                controls 
                autoPlay 
                muted 
                loop 
                poster="/products/dia-dos-pais/videos/2025/capa-cartoes-dia-dos-pais.jpg" 
                width="640" 
                height="360">
                <source src="/products/dia-dos-pais/videos/2025/cartoes-dia-dos-pais.mp4" type="video/mp4" />
                <source src="/products/dia-dos-pais/videos/2025/cartoes-dia-dos-pais.webm" type="video/webm" />
                Desculpe, seu navegador não suporta o formato de vídeo.
              </video>
              {/* Div decorativa 1: Fundo com gradiente pulsante */}
              <div className="absolute w-[calc(100%+4rem)] h-[calc(100%+4rem)] md:w-[calc(100%+2rem)] md:h-[calc(80%+1rem)] bg-gradient-to-br from-white/50 to-purple-@00 rounded-full animate-pulse-slow z-1"></div>

              {/* Div decorativa 2: Borda giratória */}
              <div className="absolute w-[calc(100%+6rem)] h-[calc(100%+6rem)] md:w-[calc(100%+1rem)] md:h-[calc(90%+1rem)] border-4 border-white border-opacity-20 rounded-full transform rotate-45 animate-spin-slow z-1"></div>

              {/* Div decorativa 3: Círculo flutuante amarelo/laranja */}
              {/* <div className="absolute w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full top-3/4 left-1/4 animate-float z-1"></div> */}

              {/* Div decorativa 4: Círculo flutuante azul/verde */}
              {/* <div className="absolute w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-blue-400 to-teal-300 rounded-full top-1/4 right-1/4 animate-float-delay z-1"></div> */}
              
            </div>
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path fill="rgba(255, 255, 255, 0.1)" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V92.83C0,92.83,260.94,84.31,321.39,56.44Z"></path>
          </svg>
        </div>


        <div className="absolute inset-x-0 bottom-0">
          <svg viewBox="0 0 224 12" fill="currentColor" className="-mb-1 w-full text-white" preserveAspectRatio="none">
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
          </svg>
        </div>

        
      </div>
      
    </section>
  );
};

export default HeroSection; 