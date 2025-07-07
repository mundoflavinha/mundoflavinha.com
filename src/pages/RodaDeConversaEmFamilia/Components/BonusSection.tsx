import { Gift, MessageCircle } from "lucide-react";

const bonuses = [
  {
    image: "/src/assets/products/bonus-mae-conversando-filhos.jpg",
    icon: <Gift className="h-10 w-10 text-primary mb-2" />, // Ícone de presente
    title: "BÔNUS 1",
    subtitle: "Roda de Conversa em Família",
    description: "Um convite para sentar, ouvir, falar e se conectar de verdade. 48 cartões de perguntas prontas para facilitar o diálogo, fortalecer vínculos e criar um ambiente de escuta entre todos."
  },
  {
    image: "/src/assets/products/bonus-rede-apoio-2.jpg",
    icon: <MessageCircle className="h-10 w-10 text-primary mb-2" />, // Ícone de mensagem
    title: "BÔNUS 2",
    subtitle: "Acesso à Comunidade",
    description: "O espaço <b>Rede de Apoio Mundo Flavinha</b> no WhatsApp é lugar seguro e acolhedor para mães, pais, com trocas e vivências. Acesso a conteúdos exclusivos, dicas, lives e apoio de outras famílias."
  }
];

const MyProductsBonusSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary bg-opacity-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-4">Desbloqueie até 2 bônus</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {bonuses.map((bonus, idx) => (
        <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          {/* Container da imagem com posicionamento relativo */}
          <div className="relative w-full h-100 md:h-100 overflow-hidden">
            <img 
              src={bonus.image} 
              alt={bonus.subtitle}
              className="w-full h-[600px] object-cover transition-transform hover:scale-105" 
            />
            
            {/* Título sobreposto na imagem */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-xl md:text-5xl font-bold text-white mb-2 text-center">{bonus.title}</h3>
            </div>
          </div>
          
          {/* Conteúdo de texto com padding - apenas descrição */}
          <div className="p-6 md:p-8 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-primary mb-2">{bonus.subtitle}</h4>
            <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: bonus.description }} />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


  );
};

export default MyProductsBonusSection; 