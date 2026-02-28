import Footer from "../components/Footer";

const TermosDeUso = () => {
  return (
    <div className="min-h-screen bg-secondary/10">
      <main className="container mx-auto max-w-4xl px-4 py-16" id="main-content">
        <a className="text-primary underline-offset-4 hover:underline" href="/">
          Voltar para a pagina inicial
        </a>

        <header className="mt-8 mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Mundo Flavinha
          </p>
          <h1 className="mt-3 text-4xl font-bold text-primary">Termos de Uso</h1>
          <p className="mt-4 text-lg text-gray-700">
            Ao acessar este site, voce concorda com as condicoes gerais de uso
            descritas abaixo. Elas podem ser atualizadas sempre que necessario.
          </p>
        </header>

        <div className="space-y-8 rounded-3xl bg-white p-8 shadow-sm">
          <section>
            <h2 className="text-2xl font-semibold text-primary">
              1. Uso do conteudo
            </h2>
            <p className="mt-3 text-gray-700">
              Os conteudos, textos, imagens, materiais digitais e organizacao do
              site pertencem ao Mundo Flavinha, salvo quando indicado de outra
              forma. O uso deve respeitar a finalidade contratada e a legislacao
              aplicavel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              2. Materiais e produtos digitais
            </h2>
            <p className="mt-3 text-gray-700">
              Produtos digitais disponibilizados pelo projeto destinam-se ao uso
              pessoal ou ao uso profissional permitido na oferta contratada. A
              redistribuicao, revenda ou compartilhamento nao autorizado do
              material nao e permitido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              3. Responsabilidades do usuario
            </h2>
            <p className="mt-3 text-gray-700">
              O usuario se compromete a utilizar o site e seus materiais de forma
              licita, respeitosa e compativel com sua finalidade, sem tentar
              comprometer o funcionamento da plataforma ou de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              4. Links e plataformas externas
            </h2>
            <p className="mt-3 text-gray-700">
              Algumas paginas podem direcionar para plataformas de pagamento,
              redes sociais ou servicos externos. Nessas situacoes, o uso tambem
              fica sujeito aos termos dessas plataformas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              5. Contato
            </h2>
            <p className="mt-3 text-gray-700">
              Duvidas sobre estes termos podem ser encaminhadas para
              contato@mundoflavinha.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosDeUso;
