import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-quinary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">MUNDO FLAVINHA</h3>
            <p className="text-quaternary mb-4">
              Proporcionando momentos de conexão e diversão para você e seu filho.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/FlaviaGuimaraesOficial" target='_blank' className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a> */}
              <a href="https://www.instagram.com/euflaviaguimaraes" target='_blank' className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a> */}
            </div>
          </div>
          
          <div>
            <h4 className="text-primary text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-quaternary hover:text-primary transition-colors">Home</a></li>
              <li><a href="#features" className="text-quaternary hover:text-primary transition-colors">Features</a></li>
              <li><a href="#products" className="text-quaternary hover:text-primary transition-colors">Products</a></li>
              <li><a href="#testimonials" className="text-quaternary hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-quaternary hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* <div>
            <h4 className="text-primary text-lg font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-quaternary hover:text-primary transition-colors">Premium Product 1</a></li>
              <li><a href="#" className="text-quaternary hover:text-primary transition-colors">Premium Product 2</a></li>
              <li><a href="#" className="text-quaternary hover:text-primary transition-colors">Premium Product 3</a></li>
              <li><a href="#" className="text-quaternary hover:text-primary transition-colors">Premium Product 4</a></li>
              <li><a href="#" className="text-quaternary hover:text-primary transition-colors">View All</a></li>
            </ul>
          </div> */}
          
          <div>
            <h4 className="text-primary text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-4">
              {/* <li className="flex items-start">
                <MapPin size={20} className="text-primary mr-3 mt-1" />
                <span className="text-white">123 Business Avenue, New York, NY 10001</span>
              </li> */}
              <li className="flex items-center">
                <Phone size={20} className="text-primary mr-3" />
                <span className="text-quaternary">+55 (21) 99999-99</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary mr-3" />
                <span className="text-quaternary">info@mundoflavinha.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-quaternary mb-4 md:mb-0">
              © {new Date().getFullYear()} Mundo Flavinha. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-quaternary hover:text-primary transition-colors">Política de Privacidade</a>
              <a href="#" className="text-quaternary hover:text-primary transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;