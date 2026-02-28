import Footer from "../components/Footer";

const PoliticaDePrivacidade = () => {
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
          <h1 className="mt-3 text-4xl font-bold text-primary">
            Politica de Privacidade
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Este documento explica, de forma objetiva, como tratamos informacoes
            compartilhadas por visitantes, clientes e pessoas que entram em
            contato com o Mundo Flavinha.
          </p>
        </header>

        <div className="space-y-8 rounded-3xl bg-white p-8 shadow-sm">
          <section>
            <h2 className="text-2xl font-semibold text-primary">
              1. Informacoes coletadas
            </h2>
            <p className="mt-3 text-gray-700">
              Podemos receber dados fornecidos diretamente por voce, como nome,
              email e informacoes enviadas em formulários, mensagens ou compras.
              Tambem podem ser coletados dados tecnicos de navegacao por meio de
              cookies, analytics e ferramentas de marketing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              2. Como usamos esses dados
            </h2>
            <p className="mt-3 text-gray-700">
              Usamos essas informacoes para responder contatos, entregar
              materiais adquiridos, melhorar a experiencia no site, compreender
              interacoes com paginas e campanhas e divulgar conteudos ou ofertas
              relacionadas ao trabalho do Mundo Flavinha.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              3. Compartilhamento
            </h2>
            <p className="mt-3 text-gray-700">
              Dados podem ser processados por plataformas de pagamento,
              hospedagem, analytics, envio de emails e ferramentas de
              publicidade, sempre dentro da necessidade operacional do projeto.
              Nao comercializamos dados pessoais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              4. Direitos do titular
            </h2>
            <p className="mt-3 text-gray-700">
              Voce pode solicitar confirmacao de tratamento, correcao,
              atualizacao ou exclusao de dados pessoais, quando aplicavel, pelo
              email contato@mundoflavinha.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              5. Atualizacoes desta politica
            </h2>
            <p className="mt-3 text-gray-700">
              Esta politica pode ser revisada para refletir ajustes operacionais,
              legais ou tecnicos do projeto. A versao publicada nesta pagina deve
              ser considerada a referencia mais atual.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;
