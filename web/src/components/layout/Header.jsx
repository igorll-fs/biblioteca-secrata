import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, BookOpen, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const { items } = useCart();

  const navLinks = [
    { to: '/livros', label: 'Catálogo' },
    { to: '/vendedor', label: 'Vender' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-header bg-[#0B2017]/90 border-b border-[#C59B5F]/15" style={{paddingLeft: 16, paddingRight: 16}}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#C59B5F]/10 flex items-center justify-center group-hover:bg-[#C59B5F]/20 transition-colors">
              <BookOpen className="w-5 h-5 text-[#C59B5F]" />
            </div>
            <span className="font-display text-base font-bold text-[#C59B5F] tracking-wide">
              A Biblioteca Secrata
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-[#EADFC9]/70 hover:text-[#EADFC9] font-medium text-sm py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C59B5F] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/carrinho"
              className="relative p-2.5 rounded-xl text-[#EADFC9]/70 hover:text-[#C59B5F] hover:bg-[#C59B5F]/10 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C59B5F] text-[#0B2017] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-[#C59B5F]/30">
                  {items.length}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#C59B5F]/10 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C59B5F]/20 border border-[#C59B5F]/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#C59B5F]" />
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#EADFC9]/50 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 top-12 w-48 bg-[#0B2017] border border-[#C59B5F]/20 rounded-xl shadow-2xl shadow-black/40 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#C59B5F]/10">
                      <p className="text-sm font-medium text-[#EADFC9] truncate">{currentUser.name || 'Minha Conta'}</p>
                    </div>
                    <Link
                      to="/meu-painel"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#EADFC9]/70 hover:text-[#C59B5F] hover:bg-[#C59B5F]/5"
                    >
                      <User className="w-4 h-4" />
                      Meu Painel
                    </Link>
                    <button
                      onClick={() => { logout(); setUserDropdown(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#EADFC9]/70 hover:text-[#C59B5F] hover:bg-[#C59B5F]/5"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="text-sm text-[#EADFC9]/70 hover:text-[#EADFC9] transition-colors font-medium">
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="bg-[#C59B5F] text-[#0B2017] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#d4aa6e] hover:shadow-lg hover:shadow-[#C59B5F]/20 transition-all"
                >
                  Cadastrar
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 text-[#EADFC9]/70 hover:text-[#C59B5F] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[#C59B5F]/10 mt-2 pt-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#EADFC9]/70 hover:text-[#C59B5F] hover:bg-[#C59B5F]/5 transition-all font-medium px-3 py-2.5 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              {currentUser ? (
                <>
                  <Link to="/meu-painel" onClick={() => setMobileOpen(false)} className="text-[#EADFC9]/70 hover:text-[#C59B5F] hover:bg-[#C59B5F]/5 px-3 py-2.5 rounded-lg">
                    Minha Conta
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left text-[#EADFC9]/70 hover:text-[#C59B5F] hover:bg-[#C59B5F]/5 px-3 py-2.5 rounded-lg">
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-[#EADFC9]/70 hover:text-[#C59B5F] hover:bg-[#C59B5F]/5 px-3 py-2.5 rounded-lg">
                    Entrar
                  </Link>
                  <Link to="/cadastro" onClick={() => setMobileOpen(false)} className="text-[#C59B5F] font-semibold hover:bg-[#C59B5F]/5 px-3 py-2.5 rounded-lg">
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
