import { Button } from "../../../components/ui/button";

const MyProductsAboutFlavinhaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-tertiary bg-opacity-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6 text-right">Quem está por trás do <br />Mundo Flavinha?</h2>
            <p className="text-lg text-gray-700 text-right mb-4">
              Olá, eu sou a Flávia Guimarães.<br />
              Sou mãe, fonoaudióloga e publicitária, especializada por Infância, Comunicação e Desenvolvimento Infantil. Minha missão é ajudar famílias a criarem memórias afetivas e fortalecerem vínculos longe das telas, com brincadeiras e jogos educativos. <br /><br />
              Se você chegou até aqui, é porque acredita no poder do brincar e quer transformar o tempo com seu filho em momentos de conexão verdadeira. Vamos juntas?
            </p>
            {/* <Button className="bg-primary hover:bg-opacity-90 text-white px-8 py-6 text-lg mt-4">
              Quero garantir o meu jogo agora!
            </Button> */}
          </div>
          <div className="order-1 md:order-2 flex justify-left">
            <img 
              src="../images/eu-flavinha.png"
              alt="Flávia Guimarães - Mundo Flavinha"
              className="rounded-lg shadow-lg w-72 h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProductsAboutFlavinhaSection; 