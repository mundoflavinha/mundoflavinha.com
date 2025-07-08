import { Button } from "../../../components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-16 md:pt-0 bg-gradient-to-b from-secondary to-white">
      
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-00 via-cyan-500 to-blue-400">
        
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

        
        <div className="relative  flex items-center justify-center px-4 py-16 md:py-24">
          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <div className="text-center md:text-left space-y-6 z-10">
              <div className="inline-block mb-4">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium">
                  <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  <span>Quero te ajudar a se conectar com seu filho!</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                <span className="">
                Seu filho está passando tempo demais nas telas?
                </span>
                <br />
                <span className="inline-block bg-clip-text text-primary animate-float">
                  Vou te ajudar!
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white text-opacity-90">
                Você sente que falta conexão e momentos juntos?<br />
                Com "Olhou, Achou!", você brinca, ensina e cria memórias afetivas com um jogo educativo e 100% inovador.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                
                <Button className="group px-8 py-6 md:text-1x2 bg-white rounded-full font-medium text-primary hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Clique aqui e veja como
                </Button>
                
                <Button className="group px-8 py-6 bg-transparent border-2 border-white border-opacity-50 rounded-full font-medium text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    Fale comigo
                    <svg className="w-4 h-4 text-white group-hover:animate-ping" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </span>  
                </Button>
              </div>
            </div>
            
        
            <div className="relative h-64 md:h-full flex items-center justify-center">
              <img 
                src="/images/products/filho-celular.png" 
                alt="Olhou Achou - Jogo Educativo" 
                className="rounded-lg  w-128 h-128 object-contain mb-4 w-max-lg z-10"
                />
              <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-white-500 to-purple-600 rounded-full animate-pulse-slow"></div>
              
        
              <div className="absolute w-64 h-64 md:w-80 md:h-80 border-4 border-white border-opacity-20 rounded-full transform rotate-45 animate-spin-slow"></div>
              
        
              <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float"></div>
              
        
              <div className="absolute w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-300 rounded-full top-1/4 right-1/4 animate-float-delay"></div>
              
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

        <div className="absolute inset-x-0 bottom-0">
          {/* <svg viewBox="0 0 67 9" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="-mb-1 w-full text-white" preserveAspectRatio="none">
            <path  d="M0 9C0 9 7.87258 8.28414 29.1451 4.50005C50.4176 0.715962 67 9 67 9V2.16745e-07H0V9Z"/>
          </svg> */}

        </div>
        
      </div>
      
      {/* <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-left md:text-left">
              Seu filho está passando tempo demais nas telas?
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg text-left md:text-left">
              Você sente que falta conexão e momentos juntos?<br />
              Com "Olhou, Achou!", você brinca, ensina e cria memórias afetivas com um jogo educativo e 100% inovador.
            </p>
            <Button className="bg-primary hover:bg-opacity-90 text-white px-8 py-6 text-lg">
              Quero garantir o meu jogo agora!
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
                src="/src/assets/products/filho-celular.png" 
                alt="Olhou Achou - Jogo Educativo" 
                className="rounded-lg  w-128 h-128 object-contain mb-4 w-max-lg"
                />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection; 