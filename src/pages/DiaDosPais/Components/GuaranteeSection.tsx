const MyProductsGuaranteeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-quaternary/20">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="mb-6">
            <img src="/images/products/selo-satisfacao-garantida.png" alt="Garantia" className="w-80 h-67" />
          </div>
          <h2 className="text-primary text-2xl md:text-3xl font-bold mb-4">Garantia & Segurança</h2>
          <p className="text-lg text-gray-700 mb-4 max-w-2xl">
            Eu confio de coração no valor que o Olhou, Achou! pode trazer para sua família. Ele foi criado com muito carinho para garantir experiências reais e afetivas. Se por qualquer motivo você achar que não valeu a pena, basta enviar um e-mail em até 7 dias e devolvo 100% do seu investimento. Simples, sem burocracia e sem perguntas.
          </p>
          <p className="text-base text-gray-600 max-w-2xl">
            Sua compra é 100% segura, com pagamento criptografado, ambiente protegido e entrega garantida. Você recebe o acesso ao jogo imediatamente após a confirmação do pagamento, direto no seu e-mail.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyProductsGuaranteeSection; 