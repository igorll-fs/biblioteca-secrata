import { Link } from 'react-router-dom';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2017] text-[#EADFC9]/70 border-t border-[#C59B5F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-7 h-7 text-[#C59B5F]" />
              <span className="font-display text-lg font-bold text-[#C59B5F]">
                A Biblioteca Secrata
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Um refúgio para mentes inquietas. Descubra, compre e alugue livros em um ambiente que celebra a sabedoria atemporal.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[#C59B5F] mb-4 uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/livros" className="hover:text-[#C59B5F] transition-colors">Catálogo</Link></li>
              <li><Link to="/vendedor" className="hover:text-[#C59B5F] transition-colors">Vender Livros</Link></li>
              <li><Link to="/carrinho" className="hover:text-[#C59B5F] transition-colors">Carrinho</Link></li>
              <li><Link to="/meu-painel" className="hover:text-[#C59B5F] transition-colors">Minha Conta</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[#C59B5F] mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/termos" className="hover:text-[#C59B5F] transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-[#C59B5F] transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[#C59B5F] mb-4 uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C59B5F]" />
                contato@bibliotecasecrata.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C59B5F]" />
                (11) 99999-0000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C59B5F]" />
                São Paulo, SP — Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#C59B5F]/10 mt-8 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} A Biblioteca Secrata. Todos os direitos reservados.</p>
          <p className="mt-1 text-[#EADFC9]/40">
            Feito com tinta, pergaminho e código.
          </p>
        </div>
      </div>
    </footer>
  );
}
