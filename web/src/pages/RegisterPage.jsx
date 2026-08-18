import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirm) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, passwordConfirm, name);
      navigate('/meu-painel');
    } catch (err) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#0B2017] min-h-[calc(100vh-var(--header-height))] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#C59B5F] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#434B3D] rounded-full blur-[140px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-[#C59B5F]/15 border border-[#C59B5F]/30 flex items-center justify-center group-hover:bg-[#C59B5F]/25 transition-all shadow-md">
              <BookOpen className="w-6 h-6 text-[#C59B5F]" />
            </div>
            <span className="font-display text-2xl font-bold text-[#C59B5F] group-hover:text-[#d4aa6e] transition-colors">A Biblioteca Secrata</span>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#EADFC9] mb-2">Crie sua conta</h1>
          <p className="text-[#EADFC9]/60 font-light">Junte-se à comunidade de leitores</p>
        </div>

        <div className="bg-[#EADFC9] rounded-2xl p-8 sm:p-10 border border-[#C59B5F]/25 shadow-2xl shadow-black/50">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#434B3D]/70" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Seu nome"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl pl-11 pr-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#434B3D]/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl pl-11 pr-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#434B3D]/70" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl pl-11 pr-12 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#434B3D]/70 hover:text-[#0B2017] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#434B3D]/70" />
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  placeholder="Repita a senha"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl pl-11 pr-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C59B5F] text-[#0B2017] py-3.5 rounded-xl font-bold hover:bg-[#d4aa6e] hover:shadow-xl hover:shadow-[#C59B5F]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="text-center text-sm text-[#434B3D] mt-6">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#0B2017] font-bold hover:text-[#C59B5F] underline decoration-[#C59B5F]/40 underline-offset-4 transition-colors">
              Entrar
            </Link>
          </p>

          <p className="text-center text-xs text-[#434B3D]/70 mt-4 leading-relaxed">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link to="/termos" className="text-[#0B2017] font-semibold hover:text-[#C59B5F] underline transition-colors">Termos de Uso</Link>
            {' '}e{' '}
            <Link to="/privacidade" className="text-[#0B2017] font-semibold hover:text-[#C59B5F] underline transition-colors">Política de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
