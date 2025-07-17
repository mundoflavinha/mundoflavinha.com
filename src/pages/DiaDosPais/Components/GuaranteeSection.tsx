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
            Você vai entregar um momento inesquecível para o papai, feito com afeto e criatividade, sem sair de casa e gastando pouco. E se por qualquer motivo achar que não valeu a pena, você tem 7 dias de garantia incondicional.
            É simples: ou você ama a experiência… ou recebe seu dinheiro de volta.
          </p>
          <p className="text-base text-gray-600 max-w-2xl">
            Sua compra é 100% segura, com pagamento criptografado, ambiente protegido e entrega garantida. Você recebe o acesso a plataforma com os arquivos imediatamente após a confirmação do pagamento, direto no seu e-mail.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyProductsGuaranteeSection; 