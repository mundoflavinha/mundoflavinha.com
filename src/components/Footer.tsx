import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-quinary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <section aria-labelledby="footer-about">
            <h3 id="footer-about" className="text-xl font-bold mb-4 text-primary">MUNDO FLAVINHA</h3>
            <p className="text-quaternary mb-4">
              Proporcionando momentos de conexão e diversão para você e seu filho.
            </p>
            <nav aria-label="Redes sociais">
              <ul className="flex space-x-4">
                <li>
                  <a 
                    href="https://www.instagram.com/mundoflavinhaoficial" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Visite nosso Instagram"
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.tiktok.com/@mundoflavinha" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Visite nosso TikTok"
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/@mundoflavinha" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Visite nosso YouTube"
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </section>
          
          <section aria-labelledby="footer-contact">
            <h4 id="footer-contact" className="text-primary text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={20} className="text-primary mr-3" aria-hidden="true" />
                <a href="mailto:contato@mundoflavinha.com" className="text-quaternary hover:text-primary transition-colors">
                  contato@mundoflavinha.com
                </a>
              </li>
            </ul>
          </section>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-quaternary mb-4 md:mb-0">
              © {new Date().getFullYear()} Mundo Flavinha. Todos os direitos reservados.
            </p>
            <nav aria-label="Links legais">
              <ul className="flex space-x-6">
                <li>
                  <a href="/politica-de-privacidade" className="text-quaternary hover:text-primary transition-colors">Política de Privacidade</a>
                </li>
                <li>
                  <a href="/termos-de-uso" className="text-quaternary hover:text-primary transition-colors">Termos de Uso</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
