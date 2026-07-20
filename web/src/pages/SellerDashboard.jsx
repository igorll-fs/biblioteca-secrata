import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, DollarSign, BookOpen, ShoppingBag, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const mockListings = [
  { id: '1', title: 'O Nome do Vento', author: 'Patrick Rothfuss', price: 49.90, rentPrice: 5.90, stock: 3, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop', status: 'ativo' },
  { id: '2', title: 'A Sombra do Vento', author: 'Carlos Ruiz Zafón', price: 44.90, rentPrice: 4.90, stock: 1, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop', status: 'ativo' },
  { id: '3', title: 'Drácula', author: 'Bram Stoker', price: 35.90, rentPrice: 3.90, stock: 0, cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop', status: 'esgotado' },
  { id: '4', title: 'Rebecca', author: 'Daphne du Maurier', price: 42.90, rentPrice: 5.00, stock: 5, cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=200&h=300&fit=crop', status: 'ativo' },
];

const mockStats = {
  totalRevenue: 1247.60,
  booksSold: 28,
  activeRentals: 5,
};

const mockRecentOrders = [
  { id: 'ORD-001', buyer: 'Ana Silva', book: 'O Nome do Vento', amount: 49.90, date: '2025-06-22', type: 'venda' },
  { id: 'ORD-002', buyer: 'Carlos Souza', book: 'Rebecca', amount: 42.90, date: '2025-06-21', type: 'venda' },
  { id: 'ORD-003', buyer: 'Maria Oliveira', book: 'A Sombra do Vento', amount: 14.70, date: '2025-06-20', type: 'aluguel' },
  { id: 'ORD-004', buyer: 'João Santos', book: 'Drácula', amount: 35.90, date: '2025-06-19', type: 'venda' },
];

export default function SellerDashboard() {
  const [listings, setListings] = useState(mockListings);

  function deleteListing(id) {
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="bg-[#0B2017] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#EADFC9]">Painel do Vendedor</h1>
            <p className="text-[#EADFC9]/60">Gerencie seus anúncios e acompanhe suas vendas</p>
          </div>
          <Link
            to="/vendedor/novo"
            className="inline-flex items-center gap-2 bg-[#C59B5F] text-[#0B2017] px-5 py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Novo Anúncio
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#EADFC9] rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C59B5F]/15 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#C59B5F]" />
            </div>
            <div>
              <p className="text-[#434B3D] text-sm">Receita Total</p>
              <p className="font-display text-2xl font-bold text-[#0B2017]">R$ {mockStats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-[#EADFC9] rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C59B5F]/15 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-[#C59B5F]" />
            </div>
            <div>
              <p className="text-[#434B3D] text-sm">Livros Vendidos</p>
              <p className="font-display text-2xl font-bold text-[#0B2017]">{mockStats.booksSold}</p>
            </div>
          </div>
          <div className="bg-[#EADFC9] rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C59B5F]/15 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#C59B5F]" />
            </div>
            <div>
              <p className="text-[#434B3D] text-sm">Aluguéis Ativos</p>
              <p className="font-display text-2xl font-bold text-[#0B2017]">{mockStats.activeRentals}</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-[#0B2017]">Meus Anúncios</h2>
            <span className="text-sm text-[#434B3D]">{listings.length} {listings.length === 1 ? 'item' : 'itens'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -4 }}
                className="bg-[#EADFC9] rounded-2xl shadow-md overflow-hidden group"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                      book.status === 'ativo' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                    }`}>
                      {book.status === 'ativo' ? 'Ativo' : 'Esgotado'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-[#0B2017] mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-[#434B3D] text-xs mb-2">{book.author}</p>
                  <div className="flex items-center justify-between text-xs text-[#434B3D] mb-3">
                    <span>Estoque: {book.stock}</span>
                    <span>Aluguel: R$ {book.rentPrice.toFixed(2)}/dia</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#0B2017]">R$ {book.price.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <Link to={`/vendedor/novo`} className="p-2 rounded-lg bg-[#C59B5F]/15 text-[#C59B5F] hover:bg-[#C59B5F]/25 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => deleteListing(book.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B2017] mb-6">Pedidos Recentes</h2>
          <div className="bg-[#EADFC9] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#C59B5F]/20">
                    <th className="px-6 py-4 text-xs font-semibold text-[#434B3D] uppercase tracking-wider">Pedido</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#434B3D] uppercase tracking-wider">Comprador</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#434B3D] uppercase tracking-wider">Livro</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#434B3D] uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#434B3D] uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#434B3D] uppercase tracking-wider">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#C59B5F]/10 last:border-0">
                      <td className="px-6 py-4 text-sm font-medium text-[#0B2017]">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-[#434B3D]">{order.buyer}</td>
                      <td className="px-6 py-4 text-sm text-[#434B3D]">{order.book}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          order.type === 'venda' ? 'bg-[#C59B5F]/15 text-[#C59B5F]' : 'bg-blue-500/10 text-blue-600'
                        }`}>
                          {order.type === 'venda' ? 'Venda' : 'Aluguel'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#0B2017]">R$ {order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-[#434B3D]">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
