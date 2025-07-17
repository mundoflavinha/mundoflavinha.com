import {MailCheck, Printer, Heart } from "lucide-react";

const features = [
  {
    icon: <MailCheck className="h-12 w-12 text-primary mb-4 inline" />, // Ícone de e-mail
    title: "Chega direto no seu e-mail",
    description: "Assim que concluir sua compra, você recebe o jogo para imprimir e brincar quantas vezes quiser. Prático, rápido e sem frete!"
  },
  {
    icon: <Printer className="h-12 w-12 text-primary mb-4 inline" />, // Ícone de sorriso
    title: "Você imprime em casa",
    description: "Simples assim! Você só precisa de uma impressora comum. O jogo foi pensado para ser fácil de montar e brincar."
  },
  {
    icon: <Heart className="h-12 w-12 text-primary mb-4 inline" />, // Ícone de coração
    title: "Se divirta com seu fihlo",
    description: "Se divirta em família, crie memórias afetivas e fortaleça o vínculo com seu filho, longe das telas."
  }
];

const MyProductsFeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary text-3xl md:text-4xl font-bold mb-4">Você vai obter o material de forma fácil e prática!</h2>
          <p>Assim que concluir sua compra será enviado em seu e-mail os dados de acesso à plataforma para realizar o download.</p>
          <p>Certifique-se de verificar sua caixa de entrada e, se necessário, sua pasta de spam.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-quaternary/20 p-8 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyProductsFeaturesSection; 