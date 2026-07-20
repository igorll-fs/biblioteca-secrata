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
    <div className="bg-[#0B2017] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <BookOpen className="w-10 h-10 text-[#C59B5F]" />
            <span className="font-display text-2xl font-bold text-[#C59B5F]">A Biblioteca Secrata</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-[#EADFC9] mb-2">Crie sua conta</h1>
          <p className="text-[#EADFC9]/60">Junte-se à comunidade de leitores</p>
        </div>

        <div className="bg-[#EADFC9] rounded-2xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#0B2017] mb-1.5">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#434B3D]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Seu nome"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl pl-11 pr-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B2017] mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#434B3D]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl pl-11 pr-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B2017] mb-1.5">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#434B3D]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl pl-11 pr-12 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#434B3D] hover:text-[#0B2017]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B2017] mb-1.5">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#434B3D]" />
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  placeholder="Repita a senha"
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl pl-11 pr-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C59B5F] text-[#0B2017] py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors disabled:opacity-50"
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="text-center text-sm text-[#434B3D] mt-6">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#C59B5F] font-semibold hover:underline">
              Entrar
            </Link>
          </p>

          <p className="text-center text-xs text-[#434B3D]/60 mt-4">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link to="/termos" className="text-[#C59B5F] hover:underline">Termos de Uso</Link>
            {' '}e{' '}
            <Link to="/privacidade" className="text-[#C59B5F] hover:underline">Política de Privacidade</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
