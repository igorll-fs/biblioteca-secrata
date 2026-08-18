import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { items, removeItem, updateItem, clearCart, total } = useCart();

  function handleQuantity(bookId, type, delta) {
    const item = items.find((i) => i.bookId === bookId && i.type === type);
    if (!item) return;
    const newQty = (item.quantity || 1) + delta;
    if (newQty < 1) {
      removeItem(bookId, type);
    } else {
      updateItem(bookId, type, { quantity: newQty });
    }
  }

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="bg-[#0B2017] py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C59B5F 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#EADFC9] mb-2">Carrinho</h1>
          <p className="text-[#EADFC9]/60 text-base font-light">Revise suas escolhas antes de finalizar o pedido</p>
          <div className="w-12 h-0.5 bg-[#C59B5F] mt-4 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#EADFC9]/40 rounded-2xl border border-[#C59B5F]/15 max-w-xl mx-auto p-8">
            <div className="w-20 h-20 rounded-full bg-[#C59B5F]/15 border border-[#C59B5F]/25 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <ShoppingBag className="w-10 h-10 text-[#C59B5F]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2017] mb-3">Seu carrinho está vazio</h2>
            <p className="text-[#434B3D] mb-8 max-w-md mx-auto leading-relaxed text-sm">Explore nosso catálogo e encontre sua próxima leitura.</p>
            <Link
              to="/livros"
              className="bg-[#C59B5F] text-[#0B2017] px-8 py-3.5 rounded-xl font-bold hover:bg-[#d4aa6e] hover:shadow-xl hover:shadow-[#C59B5F]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center gap-2 text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Ir ao Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.bookId}-${item.type}`} className="bg-[#EADFC9] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 border border-[#C59B5F]/20 shadow-sm hover:shadow-md hover:border-[#C59B5F]/35 transition-all">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-20 h-28 object-cover rounded-xl shadow-md border border-[#C59B5F]/20 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-[#0B2017] text-lg mb-1 leading-snug">{item.title}</h3>
                      <p className="text-[#434B3D] text-sm mb-3">{item.author}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          item.type === 'rent' ? 'bg-[#C59B5F]/20 text-[#4E3621] border-[#C59B5F]/30' : 'bg-[#0B2017]/10 text-[#0B2017] border-[#0B2017]/15'
                        }`}>
                          {item.type === 'rent' ? `Aluguel ${item.days} dias` : 'Compra'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#C59B5F]/15">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantity(item.bookId, item.type, -1)}
                          className="w-8 h-8 bg-[#F5F1EB] rounded-lg flex items-center justify-center border border-[#C59B5F]/20 hover:bg-[#C59B5F] hover:text-[#0B2017] hover:border-transparent transition-all shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-[#0B2017] w-6 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => handleQuantity(item.bookId, item.type, 1)}
                          className="w-8 h-8 bg-[#F5F1EB] rounded-lg flex items-center justify-center border border-[#C59B5F]/20 hover:bg-[#C59B5F] hover:text-[#0B2017] hover:border-transparent transition-all shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-display font-bold text-[#0B2017] text-lg">
                          R$ {((item.type === 'rent' ? item.price * (item.days || 7) : item.price) * (item.quantity || 1)).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.bookId, item.type)}
                          className="p-1.5 rounded-lg text-[#434B3D]/70 hover:text-red-600 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-[#434B3D] hover:text-red-600 transition-colors"
                >
                  Limpar carrinho
                </button>
              </div>
            </div>

            <div>
              <div className="bg-[#EADFC9] rounded-2xl p-6 sm:p-7 sticky top-24 border border-[#C59B5F]/20 shadow-md">
                <h3 className="font-display text-xl font-bold text-[#0B2017] mb-5 pb-3 border-b border-[#C59B5F]/15">Resumo do Pedido</h3>
                <div className="space-y-3.5 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#434B3D]">Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                    <span className="font-semibold text-[#0B2017]">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#434B3D]">Frete</span>
                    <span className="font-medium text-[#434B3D]">Calculado no checkout</span>
                  </div>
                  <div className="border-t border-[#C59B5F]/20 pt-4 flex justify-between items-baseline">
                    <span className="font-bold text-[#0B2017] text-base">Total</span>
                    <span className="font-display font-bold text-[#0B2017] text-2xl">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-[#C59B5F] text-[#0B2017] py-3.5 rounded-xl font-bold hover:bg-[#d4aa6e] hover:shadow-xl hover:shadow-[#C59B5F]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all text-center text-base"
                >
                  Finalizar Compra
                </Link>
                <Link
                  to="/livros"
                  className="block w-full text-center text-[#434B3D] hover:text-[#C59B5F] transition-colors text-sm mt-4 font-medium"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
