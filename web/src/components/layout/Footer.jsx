import { Link } from 'react-router-dom';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2017] text-[#EADFC9]/70 border-t border-[#C59B5F]/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-9 h-9 rounded-lg bg-[#C59B5F]/10 border border-[#C59B5F]/20 flex items-center justify-center group-hover:bg-[#C59B5F]/20 group-hover:border-[#C59B5F]/40 group-hover:shadow-md group-hover:shadow-[#C59B5F]/20 transition-all duration-300">
                <BookOpen className="w-5 h-5 text-[#C59B5F]" />
              </div>
              <span className="font-display text-lg font-bold text-[#C59B5F] group-hover:text-[#d4aa6e] transition-colors">
                A Biblioteca Secrata
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#EADFC9]/60">
              Um refúgio para mentes inquietas. Descubra, compre e alugue livros em um ambiente que celebra a sabedoria atemporal.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[#C59B5F] mb-5 uppercase tracking-[0.15em]">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/livros" className="hover:text-[#C59B5F] hover:translate-x-1 transition-all inline-block">Catálogo</Link></li>
              <li><Link to="/vendedor" className="hover:text-[#C59B5F] hover:translate-x-1 transition-all inline-block">Vender Livros</Link></li>
              <li><Link to="/carrinho" className="hover:text-[#C59B5F] hover:translate-x-1 transition-all inline-block">Carrinho</Link></li>
              <li><Link to="/meu-painel" className="hover:text-[#C59B5F] hover:translate-x-1 transition-all inline-block">Minha Conta</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[#C59B5F] mb-5 uppercase tracking-[0.15em]">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/termos" className="hover:text-[#C59B5F] hover:translate-x-1 transition-all inline-block">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-[#C59B5F] hover:translate-x-1 transition-all inline-block">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[#C59B5F] mb-5 uppercase tracking-[0.15em]">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-[#EADFC9]/70">
              <li className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#C59B5F]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#C59B5F]" />
                </div>
                contato@bibliotecasecrata.com
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#C59B5F]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#C59B5F]" />
                </div>
                (11) 99999-0000
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#C59B5F]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B5F]" />
                </div>
                São Paulo, SP — Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#C59B5F]/15 mt-12 pt-8 text-center text-xs text-[#EADFC9]/60">
          <p>&copy; {new Date().getFullYear()} A Biblioteca Secrata. Todos os direitos reservados.</p>
          <p className="mt-1.5 text-[#EADFC9]/40">
            Feito com tinta, pergaminho e código.
          </p>
        </div>
      </div>
    </footer>
  );
}
