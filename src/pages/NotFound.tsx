import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary/10 px-4">
      <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Mundo Flavinha
        </p>
        <h1 className="mt-4 text-4xl font-bold text-primary">Pagina nao encontrada</h1>
        <p className="mt-4 text-lg text-gray-600">
          O endereco <span className="font-semibold">{location.pathname}</span> nao
          existe ou foi movido.
        </p>
        <a href="/" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
          Voltar para a pagina inicial
        </a>
      </div>
    </main>
  );
};

export default NotFound;
