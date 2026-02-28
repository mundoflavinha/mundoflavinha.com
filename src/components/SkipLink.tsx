const SkipLink = () => {
  return (
    <a
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-lg"
      href="#main-content"
    >
      Pular para o conteudo principal
    </a>
  );
};

export default SkipLink;
