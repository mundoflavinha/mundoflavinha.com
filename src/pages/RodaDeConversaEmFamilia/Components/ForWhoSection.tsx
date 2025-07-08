import { Button } from "../../../components/ui/button";

const profiles = [
  "Pais que querem brincar mais e melhor em casa",
  "Famílias em busca de conexão verdadeira no tempo de tela",
  "Profissionais que usam jogos educativos em sala",
  "Terapeutas e fonoaudiólogos que trabalham com crianças",
  "Escolas que valorizam o brincar com propósito"
];

const MyProductsForWhoSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 lg:gap-12 items-center">
        <div className="order-1 md:order-1 flex justify-end md:justify-center sm:justify-center">
            <img 
              src="/images/products/mae-filho-brincando.jpg"
              alt="Família brincando com o jogo Olhou Achou"
              className="rounded-lg shadow-lg w-80 h-50 object-contain"
            />
          </div>

          <div className="order- md:order-1">
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-6">Para quem é esse jogo?</h2>
            <ul className="mb-8 space-y-3">
              {profiles.map((profile, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2 mt-0.5">•</span>
                  <span className="text-gray-700 text-base">{profile}</span>
                </li>
              ))}
            </ul>
            <Button className="group px-8 py-3 bg-primary text-lg hover:bg-opacity-90 text-white rounded-full font-medium text-white hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Eu quero esse jogo!
            </Button>
            {/* <Button className="bg-primary hover:bg-opacity-90 text-white px-8 py-6 text-lg">
              Eu quero esse jogo
            </Button> */}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default MyProductsForWhoSection; 