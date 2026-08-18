import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Clock, CheckCircle, XCircle, RotateCcw, Star, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const mockOrders = [
  { id: 'ORD-001', date: '2025-06-15', items: [{ title: 'O Nome do Vento', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=80&h=120&fit=crop', price: 49.90 }], total: 49.90, status: 'entregue' },
  { id: 'ORD-002', date: '2025-06-20', items: [{ title: 'Rebecca', cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=80&h=120&fit=crop', price: 42.90 }], total: 42.90, status: 'enviado' },
  { id: 'ORD-003', date: '2025-06-22', items: [{ title: 'Drácula', cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=80&h=120&fit=crop', price: 35.90 }], total: 35.90, status: 'processando' },
];

const mockRentals = [
  { id: 'REN-001', title: 'O Perfume', author: 'Patrick Süskind', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=180&fit=crop', startDate: '2025-06-10', endDate: '2025-06-24', dailyRate: 4.50, status: 'ativo' },
  { id: 'REN-002', title: 'Frankenstein', author: 'Mary Shelley', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=180&fit=crop', startDate: '2025-05-01', endDate: '2025-05-15', dailyRate: 3.50, status: 'concluido' },
];

const mockFavorites = [
  { id: '1', title: 'Orgulho e Preconceito', author: 'Jane Austen', price: 38.90, cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&h=300&fit=crop', rating: 4.9 },
  { id: '2', title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', price: 54.90, cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=300&fit=crop', rating: 4.8 },
];

const statusConfig = {
  entregue: { label: 'Entregue', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
  enviado: { label: 'Enviado', icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  processando: { label: 'Processando', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  cancelado: { label: 'Cancelado', icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
};

export default function BuyerDashboard() {
  const [tab, setTab] = useState('orders');
  const [favorites, setFavorites] = useState(mockFavorites);

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }

  const tabs = [
    { key: 'orders', label: 'Meus Pedidos', icon: Package },
    { key: 'rentals', label: 'Meus Aluguéis', icon: Clock },
    { key: 'favorites', label: 'Favoritos', icon: Heart },
  ];

  return (
    <div className="bg-[#0B2017] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-[#EADFC9] mb-2">Meu Painel</h1>
        <p className="text-[#EADFC9]/60 mb-8 font-light text-base">Gerencie seus pedidos, aluguéis e favoritos</p>

        <div className="flex gap-2.5 mb-10 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                tab === t.key
                  ? 'bg-[#C59B5F] text-[#0B2017] shadow-lg shadow-[#C59B5F]/20'
                  : 'bg-[#0B2017] text-[#EADFC9]/70 border border-[#C59B5F]/20 hover:border-[#C59B5F]/50 hover:text-[#EADFC9]'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const st = statusConfig[order.status];
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0B2017] border border-[#C59B5F]/20 rounded-2xl p-6 shadow-md hover:border-[#C59B5F]/40 hover:shadow-lg hover:shadow-[#C59B5F]/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-[#C59B5F]/10">
                    <div>
                      <p className="font-display text-[#EADFC9] font-bold text-base">{order.id}</p>
                      <p className="text-[#EADFC9]/50 text-xs mt-0.5">Pedido em {new Date(order.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-current/20 ${st.bg} ${st.color}`}>
                        <st.icon className="w-3.5 h-3.5" />
                        {st.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {order.items.map((item, i) => (
                      <img key={i} src={item.cover} alt={item.title} className="w-14 h-20 object-cover rounded-xl border border-[#C59B5F]/20 shadow-sm" />
                    ))}
                    <div className="flex-1 min-w-0">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-[#EADFC9] font-medium text-sm truncate">{item.title}</p>
                      ))}
                    </div>
                    <p className="font-display text-[#C59B5F] font-bold text-xl">R$ {order.total.toFixed(2)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {tab === 'rentals' && (
          <div className="space-y-5">
            <h2 className="font-display text-xl font-bold text-[#C59B5F] mb-4">Aluguéis Ativos</h2>
            {mockRentals.filter((r) => r.status === 'ativo').map((rental) => (
              <motion.div
                key={rental.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0B2017] border border-[#C59B5F]/20 rounded-2xl p-6 shadow-md hover:border-[#C59B5F]/40 hover:shadow-lg hover:shadow-[#C59B5F]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-5"
              >
                <img src={rental.cover} alt={rental.title} className="w-20 h-28 object-cover rounded-xl border border-[#C59B5F]/20 shadow-sm flex-shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#EADFC9] mb-1">{rental.title}</h3>
                    <p className="text-[#EADFC9]/60 text-sm mb-3">{rental.author}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-[#EADFC9]/60 mb-4">
                      <span>Início: <strong className="text-[#EADFC9]">{new Date(rental.startDate).toLocaleDateString('pt-BR')}</strong></span>
                      <span>Devolução: <strong className="text-[#EADFC9]">{new Date(rental.endDate).toLocaleDateString('pt-BR')}</strong></span>
                      <span className="text-[#C59B5F] font-semibold">R$ {rental.dailyRate.toFixed(2)}/dia</span>
                    </div>
                  </div>
                  <div>
                    <button className="flex items-center gap-2 bg-[#C59B5F] text-[#0B2017] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#d4aa6e] hover:shadow-lg hover:shadow-[#C59B5F]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                      <RotateCcw className="w-4 h-4" />
                      Devolver Livro
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <h2 className="font-display text-xl font-bold text-[#C59B5F] mt-10 mb-4">Aluguéis Anteriores</h2>
            {mockRentals.filter((r) => r.status === 'concluido').map((rental) => (
              <div
                key={rental.id}
                className="bg-[#0B2017] border border-[#C59B5F]/15 rounded-2xl p-5 flex gap-5 opacity-70 hover:opacity-100 transition-opacity"
              >
                <img src={rental.cover} alt={rental.title} className="w-16 h-24 object-cover rounded-xl border border-[#C59B5F]/15 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-base font-bold text-[#EADFC9]">{rental.title}</h3>
                  <p className="text-[#EADFC9]/60 text-xs mb-2">{rental.author}</p>
                  <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-[#C59B5F]/10 border border-[#C59B5F]/20 text-[#C59B5F] font-medium">
                    Concluído
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <div className="text-center py-20 bg-[#0B2017] border border-[#C59B5F]/20 rounded-2xl max-w-md mx-auto p-8">
                <div className="w-16 h-16 rounded-full bg-[#C59B5F]/15 border border-[#C59B5F]/25 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[#C59B5F]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#EADFC9] mb-2">Nenhum favorito ainda</h3>
                <p className="text-[#EADFC9]/60 text-sm mb-6">Explore o catálogo e salve seus livros favoritos.</p>
                <Link to="/livros" className="inline-block bg-[#C59B5F] text-[#0B2017] px-6 py-2.5 rounded-xl font-bold hover:bg-[#d4aa6e] hover:shadow-lg hover:shadow-[#C59B5F]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm">
                  Ver Catálogo
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favorites.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    className="bg-[#0B2017] border border-[#C59B5F]/20 rounded-2xl overflow-hidden group shadow-md hover:border-[#C59B5F]/50 hover:shadow-xl hover:shadow-[#C59B5F]/15 transition-all duration-300"
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-sm font-bold text-[#EADFC9] mb-1 line-clamp-1 group-hover:text-[#C59B5F] transition-colors">{book.title}</h3>
                      <p className="text-[#EADFC9]/60 text-xs mb-3">{book.author}</p>
                      <div className="flex items-center gap-1 mb-4">
                        <Star className="w-3.5 h-3.5 fill-[#C59B5F] text-[#C59B5F]" />
                        <span className="text-xs text-[#EADFC9]/80 font-medium">{book.rating}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#C59B5F]/15">
                        <p className="font-display text-[#C59B5F] font-bold text-base">R$ {book.price.toFixed(2)}</p>
                        <button onClick={() => removeFavorite(book.id)} className="p-1.5 rounded-lg text-[#EADFC9]/40 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
