import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { items } = useCart();

  const navLinks = [
    { to: '/livros', label: 'Catálogo' },
    { to: '/vendedor', label: 'Vender' },
  ];

  return (
    <header className="bg-[#0B2017] text-[#EADFC9] border-b border-[#C59B5F]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-[#C59B5F]" />
            <span className="font-display text-lg font-bold text-[#C59B5F]">
              A Biblioteca Secrata
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#EADFC9]/80 hover:text-[#C59B5F] transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/carrinho" className="relative p-2 hover:text-[#C59B5F] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C59B5F] text-[#0B2017] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/meu-painel" className="flex items-center gap-1 text-sm hover:text-[#C59B5F] transition-colors">
                  <User className="w-4 h-4" />
                  {currentUser.name || 'Minha Conta'}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-[#EADFC9]/60 hover:text-[#C59B5F] transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="text-sm hover:text-[#C59B5F] transition-colors">
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="bg-[#C59B5F] text-[#0B2017] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#b88d52] transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[#C59B5F]/20 mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#EADFC9]/80 hover:text-[#C59B5F] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {currentUser ? (
                <>
                  <Link to="/meu-painel" onClick={() => setMobileOpen(false)} className="hover:text-[#C59B5F]">
                    Minha Conta
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left hover:text-[#C59B5F]">
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="hover:text-[#C59B5F]">
                    Entrar
                  </Link>
                  <Link to="/cadastro" onClick={() => setMobileOpen(false)} className="hover:text-[#C59B5F]">
                    Cadastrar
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
