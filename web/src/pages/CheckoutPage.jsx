import { Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', state: '', zip: '', cardNumber: '', cardExpiry: '', cardCvc: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStep('success');
    clearCart();
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="bg-[#F5F1EB] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="text-center bg-[#EADFC9]/50 p-10 rounded-2xl border border-[#C59B5F]/20 max-w-md w-full shadow-md">
          <div className="w-16 h-16 rounded-full bg-[#C59B5F]/15 border border-[#C59B5F]/25 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#C59B5F]" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0B2017] mb-2">Carrinho vazio</h2>
          <p className="text-[#434B3D] mb-6 text-sm">Adicione itens ao carrinho antes de finalizar.</p>
          <Link to="/livros" className="bg-[#C59B5F] text-[#0B2017] px-8 py-3.5 rounded-xl font-bold hover:bg-[#d4aa6e] hover:shadow-xl hover:shadow-[#C59B5F]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all inline-block">
            Ir ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="bg-[#F5F1EB] min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#EADFC9] rounded-2xl p-10 max-w-md text-center border border-[#C59B5F]/30 shadow-2xl shadow-[#0B2017]/10">
          <div className="w-20 h-20 rounded-full bg-[#C59B5F]/20 border border-[#C59B5F]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#C59B5F]" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0B2017] mb-2">Pedido Confirmado!</h2>
          <p className="text-[#434B3D] mb-8 leading-relaxed text-sm">Seu pedido foi recebido e está sendo processado. Você receberá um e-mail de confirmação em breve.</p>
          <Link to="/meu-painel" className="bg-[#C59B5F] text-[#0B2017] px-8 py-3.5 rounded-xl font-bold hover:bg-[#d4aa6e] hover:shadow-xl hover:shadow-[#C59B5F]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all inline-block">
            Meus Pedidos
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="bg-[#0B2017] py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C59B5F 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#EADFC9] mb-2">Checkout</h1>
          <p className="text-[#EADFC9]/60 text-base font-light">Finalize seu pedido com segurança</p>
          <div className="w-12 h-0.5 bg-[#C59B5F] mt-4 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <Link to="/carrinho" className="inline-flex items-center gap-2 text-[#434B3D] hover:text-[#C59B5F] transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Voltar ao carrinho
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-[#EADFC9] rounded-2xl p-6 sm:p-8 border border-[#C59B5F]/20 shadow-sm">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-5 pb-2 border-b border-[#C59B5F]/15">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Nome completo</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                </div>
              </div>
            </div>

            <div className="bg-[#EADFC9] rounded-2xl p-6 sm:p-8 border border-[#C59B5F]/20 shadow-sm">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-5 pb-2 border-b border-[#C59B5F]/15">Endereço de Entrega</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Endereço</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Cidade</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Estado</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">CEP</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#EADFC9] rounded-2xl p-6 sm:p-8 border border-[#C59B5F]/20 shadow-sm">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-5 pb-2 border-b border-[#C59B5F]/15 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#C59B5F]" /> Pagamento
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Número do cartão</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">Validade</label>
                    <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} placeholder="MM/AA" required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2017] uppercase tracking-wider mb-1.5">CVC</label>
                    <input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleChange} placeholder="123" required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/25 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] focus:ring-2 focus:ring-[#C59B5F]/20 transition-all font-medium" />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C59B5F] text-[#0B2017] py-4 rounded-xl font-bold text-lg hover:bg-[#d4aa6e] hover:shadow-2xl hover:shadow-[#C59B5F]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Pagar R$ {total.toFixed(2)}
            </button>
          </form>

          <div>
            <div className="bg-[#EADFC9] rounded-2xl p-6 sm:p-7 sticky top-24 border border-[#C59B5F]/20 shadow-md">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-5 pb-3 border-b border-[#C59B5F]/15">Seu Pedido</h3>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={`${item.bookId}-${item.type}`} className="flex items-center gap-3">
                    <img src={item.cover} alt={item.title} className="w-12 h-16 object-cover rounded-lg border border-[#C59B5F]/20 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0B2017] truncate">{item.title}</p>
                      <p className="text-xs text-[#434B3D]">{item.type === 'rent' ? `Aluguel ${item.days}d` : 'Compra'} x{item.quantity || 1}</p>
                    </div>
                    <p className="text-sm font-bold text-[#0B2017]">
                      R$ {((item.type === 'rent' ? item.price * (item.days || 7) : item.price) * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#C59B5F]/20 pt-4 flex justify-between items-baseline">
                <span className="font-bold text-[#0B2017] text-base">Total</span>
                <span className="font-display font-bold text-[#0B2017] text-2xl">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
