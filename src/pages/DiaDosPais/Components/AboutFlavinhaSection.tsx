import { Button } from "../../../components/ui/button";

const AboutFlavinhaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6 text-right">Quem está por trás do <br />Mundo Flavinha?</h2>
            <p className="text-lg text-gray-700 text-right mb-4">Olá, eu sou a Flávia Guimarães.</p>
            <p className="text-lg text-gray-700 text-right mb-4">
              
              Sou mãe e publicitária, especializada por Infância, comunicação e desenvolvimento Infantil. Minha missão é ajudar famílias a criarem memórias afetivas e fortalecerem vínculos longe das telas, com brincadeiras e jogos educativos. <br /><br />
              Se você chegou até aqui, é porque acredita no poder do brincar e quer transformar o tempo com seu filho em momentos de conexão verdadeira.
            </p>
            <p className="text-lg text-gray-700 text-right mb-4">
              Vamos juntas?
            </p>
            {/* <Button className="bg-primary hover:bg-opacity-90 text-white px-8 py-6 text-lg mt-4">
              Quero garantir o meu jogo agora!
            </Button> */}
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-start">
            <img 
              src="../images/eu-flavinha.jpg"
              alt="Flávia Guimarães - Mundo Flavinha"
              className="rounded-lg shadow-lg w-72 h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFlavinhaSection; 