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
      <div className="bg-[#0B2017] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#EADFC9]">Carrinho</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-[#434B3D]/30 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-[#0B2017] mb-2">Seu carrinho está vazio</h2>
            <p className="text-[#434B3D] mb-6">Explore nosso catálogo e encontre sua próxima leitura.</p>
            <Link
              to="/livros"
              className="bg-[#C59B5F] text-[#0B2017] px-6 py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Ir ao Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.bookId}-${item.type}`} className="bg-[#EADFC9] rounded-2xl p-5 flex gap-5">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-[#0B2017] mb-1">{item.title}</h3>
                    <p className="text-[#434B3D] text-sm mb-2">{item.author}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.type === 'rent' ? 'bg-[#C59B5F]/20 text-[#4E3621]' : 'bg-[#0B2017]/10 text-[#0B2017]'
                      }`}>
                        {item.type === 'rent' ? `Aluguel ${item.days} dias` : 'Compra'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantity(item.bookId, item.type, -1)}
                          className="w-8 h-8 bg-[#F5F1EB] rounded-lg flex items-center justify-center hover:bg-[#C59B5F]/20 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-[#0B2017]">{item.quantity || 1}</span>
                        <button
                          onClick={() => handleQuantity(item.bookId, item.type, 1)}
                          className="w-8 h-8 bg-[#F5F1EB] rounded-lg flex items-center justify-center hover:bg-[#C59B5F]/20 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-[#0B2017] text-lg">
                          R$ {((item.type === 'rent' ? item.price * (item.days || 7) : item.price) * (item.quantity || 1)).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.bookId, item.type)}
                          className="text-[#434B3D] hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="text-sm text-[#434B3D] hover:text-red-500 transition-colors"
              >
                Limpar carrinho
              </button>
            </div>

            <div>
              <div className="bg-[#EADFC9] rounded-2xl p-6 sticky top-24">
                <h3 className="font-display text-xl font-bold text-[#0B2017] mb-4">Resumo do Pedido</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#434B3D]">Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                    <span className="font-medium text-[#0B2017]">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#434B3D]">Frete</span>
                    <span className="font-medium text-[#434B3D]">Calculado no checkout</span>
                  </div>
                  <div className="border-t border-[#C59B5F]/20 pt-3 flex justify-between">
                    <span className="font-bold text-[#0B2017]">Total</span>
                    <span className="font-bold text-[#0B2017] text-xl">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-[#C59B5F] text-[#0B2017] py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors text-center"
                >
                  Finalizar Compra
                </Link>
                <Link
                  to="/livros"
                  className="block w-full text-center text-[#434B3D] hover:text-[#C59B5F] transition-colors text-sm mt-3"
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
