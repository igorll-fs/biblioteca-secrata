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
      <div className="bg-[#F5F1EB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-[#0B2017] mb-2">Carrinho vazio</h2>
          <p className="text-[#434B3D] mb-4">Adicione itens ao carrinho antes de finalizar.</p>
          <Link to="/livros" className="bg-[#C59B5F] text-[#0B2017] px-6 py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors">
            Ir ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="bg-[#F5F1EB] min-h-screen flex items-center justify-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#EADFC9] rounded-2xl p-10 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-[#C59B5F] mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-[#0B2017] mb-2">Pedido Confirmado!</h2>
          <p className="text-[#434B3D] mb-6">Seu pedido foi recebido e está sendo processado. Você receberá um e-mail de confirmação em breve.</p>
          <Link to="/meu-painel" className="bg-[#C59B5F] text-[#0B2017] px-6 py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors inline-block">
            Meus Pedidos
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="bg-[#0B2017] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#EADFC9]">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/carrinho" className="inline-flex items-center gap-2 text-[#434B3D] hover:text-[#C59B5F] transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Voltar ao carrinho
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-[#EADFC9] rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-4">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B2017] mb-1">Nome completo</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B2017] mb-1">E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                </div>
              </div>
            </div>

            <div className="bg-[#EADFC9] rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-4">Endereço de Entrega</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B2017] mb-1">Endereço</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B2017] mb-1">Cidade</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B2017] mb-1">Estado</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B2017] mb-1">CEP</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#EADFC9] rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#C59B5F]" /> Pagamento
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B2017] mb-1">Número do cartão</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B2017] mb-1">Validade</label>
                    <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleChange} placeholder="MM/AA" required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B2017] mb-1">CVC</label>
                    <input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleChange} placeholder="123" required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-4 py-2.5 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C59B5F] text-[#0B2017] py-4 rounded-xl font-bold text-lg hover:bg-[#b88d52] transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Pagar R$ {total.toFixed(2)}
            </button>
          </form>

          <div>
            <div className="bg-[#EADFC9] rounded-2xl p-6 sticky top-24">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-4">Seu Pedido</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.bookId}-${item.type}`} className="flex items-center gap-3">
                    <img src={item.cover} alt={item.title} className="w-12 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0B2017] truncate">{item.title}</p>
                      <p className="text-xs text-[#434B3D]">{item.type === 'rent' ? `Aluguel ${item.days}d` : 'Compra'} x{item.quantity || 1}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#0B2017]">
                      R$ {((item.type === 'rent' ? item.price * (item.days || 7) : item.price) * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#C59B5F]/20 pt-3 flex justify-between">
                <span className="font-bold text-[#0B2017]">Total</span>
                <span className="font-bold text-[#0B2017] text-xl">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
