import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';

const genres = ['Todos', 'Fantasia', 'Ficção Gótica', 'Ficção Histórica', 'Suspense', 'Romance', 'Clássicos', 'Sci-Fi', 'Não-Ficção'];
const types = ['Todos', 'Novo', 'Usado - Excelente', 'Usado - Bom', 'Usado - Regular'];
const saleTypes = ['Todos', 'Venda', 'Aluguel'];

const allBooks = [
  { id: '1', title: 'O Nome do Vento', author: 'Patrick Rothfuss', price: 49.90, rentPrice: 5.90, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', rating: 4.8, genre: 'Fantasia', condition: 'Novo', type: 'Venda' },
  { id: '2', title: 'A Sombra do Vento', author: 'Carlos Ruiz Zafón', price: 44.90, rentPrice: 4.90, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop', rating: 4.7, genre: 'Ficção Gótica', condition: 'Usado - Excelente', type: 'Venda' },
  { id: '3', title: 'O Perfume', author: 'Patrick Süskind', price: 39.90, rentPrice: 4.50, cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop', rating: 4.6, genre: 'Ficção Histórica', condition: 'Novo', type: 'Aluguel' },
  { id: '4', title: 'Rebecca', author: 'Daphne du Maurier', price: 42.90, rentPrice: 5.00, cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=450&fit=crop', rating: 4.5, genre: 'Suspense', condition: 'Usado - Bom', type: 'Venda' },
  { id: '5', title: 'Drácula', author: 'Bram Stoker', price: 35.90, rentPrice: 3.90, cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=450&fit=crop', rating: 4.4, genre: 'Clássicos', condition: 'Usado - Excelente', type: 'Venda' },
  { id: '6', title: 'Orgulho e Preconceito', author: 'Jane Austen', price: 38.90, rentPrice: 4.20, cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop', rating: 4.9, genre: 'Romance', condition: 'Novo', type: 'Venda' },
  { id: '7', title: 'Frankenstein', author: 'Mary Shelley', price: 32.90, rentPrice: 3.50, cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop', rating: 4.3, genre: 'Sci-Fi', condition: 'Usado - Regular', type: 'Aluguel' },
  { id: '8', title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', price: 54.90, rentPrice: 6.00, cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=450&fit=crop', rating: 4.8, genre: 'Clássicos', condition: 'Novo', type: 'Venda' },
];

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedSaleType, setSelectedSaleType] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const filtered = allBooks.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = selectedGenre === 'Todos' || book.genre === selectedGenre;
    const matchType = selectedType === 'Todos' || book.condition === selectedType;
    const matchSaleType = selectedSaleType === 'Todos' || book.type === selectedSaleType;
    const matchPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    return matchSearch && matchGenre && matchType && matchSaleType && matchPrice;
  });

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      {/* Hero header */}
      <div className="bg-[#0B2017] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#C59B5F] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#434B3D] rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#EADFC9] mb-2">Catálogo</h1>
          <p className="text-[#EADFC9]/50 text-lg">Explore nossa coleção de livros para compra ou aluguel</p>
          <div className="w-12 h-0.5 bg-[#C59B5F] mt-4" />
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg shadow-[#0B2017]/8 border border-[#C59B5F]/15 p-2 flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C59B5F]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título ou autor..."
              className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none font-medium"
            />
          </div>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="p-2 text-[#434B3D]/40 hover:text-[#C59B5F] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#0B2017] px-5 py-3 rounded-xl text-[#C59B5F] font-medium w-full justify-center border border-[#C59B5F]/20"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilters ? 'Ocultar Filtros' : 'Filtros'}
            </button>
          </div>

          {/* Sidebar */}
          <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 sticky top-24 border border-[#C59B5F]/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-[#0B2017]">Filtros</h3>
                <Filter className="w-4 h-4 text-[#C59B5F]" />
              </div>

              <div className="mb-7">
                <label className="block text-xs font-bold text-[#0B2017] uppercase tracking-wider mb-3">Gênero</label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenre(g)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        selectedGenre === g
                          ? 'bg-[#0B2017] text-[#C59B5F] font-semibold shadow-sm'
                          : 'bg-[#F5F1EB] text-[#434B3D] hover:bg-[#C59B5F]/10 hover:text-[#0B2017]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <label className="block text-xs font-bold text-[#0B2017] uppercase tracking-wider mb-3">Condição</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/15 rounded-xl px-4 py-2.5 text-sm text-[#0B2017] focus:outline-none focus:border-[#C59B5F] focus:ring-1 focus:ring-[#C59B5F]/30 transition-all"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="mb-7">
                <label className="block text-xs font-bold text-[#0B2017] uppercase tracking-wider mb-3">Tipo</label>
                <div className="flex gap-2">
                  {saleTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedSaleType(t)}
                      className={`flex-1 text-xs px-3 py-2 rounded-xl transition-all duration-200 font-medium ${
                        selectedSaleType === t
                          ? 'bg-[#0B2017] text-[#C59B5F] shadow-sm'
                          : 'bg-[#F5F1EB] text-[#434B3D] hover:bg-[#C59B5F]/10 hover:text-[#0B2017]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2017] uppercase tracking-wider mb-3">
                  Faixa de Preço: até R$ {priceRange[1]}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full h-1.5 bg-[#EADFC9] rounded-full appearance-none cursor-pointer accent-[#C59B5F]"
                    style={{
                      background: `linear-gradient(to right, #C59B5F 0%, #C59B5F ${priceRange[1]}%, #EADFC9 ${priceRange[1]}%, #EADFC9 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-[#434B3D]/60">R$ 0</span>
                  <span className="text-[10px] text-[#434B3D]/60">R$ 100</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Book grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#434B3D] text-sm">
                <span className="font-semibold text-[#0B2017]">{filtered.length}</span> {filtered.length === 1 ? 'livro encontrado' : 'livros encontrados'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#C59B5F]/10">
                <Filter className="w-12 h-12 text-[#C59B5F]/20 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B2017] mb-2">Nenhum livro encontrado</h3>
                <p className="text-[#434B3D] text-sm">Tente ajustar seus filtros para encontrar o que procura.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -6 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#C59B5F]/10 hover:border-[#C59B5F]/25 hover:shadow-xl hover:shadow-[#0B2017]/8 transition-all duration-500">
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2017]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <span className="bg-[#0B2017]/85 text-[#C59B5F] text-[11px] px-2.5 py-1 rounded-lg font-medium backdrop-blur-sm border border-[#C59B5F]/20 w-fit">
                            {book.genre}
                          </span>
                          <span className="bg-[#C59B5F] text-[#0B2017] text-[11px] px-2.5 py-1 rounded-lg font-bold w-fit shadow-lg">
                            {book.condition}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-base font-bold text-[#0B2017] mb-1 line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-[#434B3D] text-sm mb-3">{book.author}</p>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < Math.round(book.rating) ? 'fill-[#C59B5F] text-[#C59B5F]' : 'text-[#C59B5F]/20'}`}
                            />
                          ))}
                          <span className="text-xs text-[#434B3D] ml-1">{book.rating}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[#C59B5F]/10">
                          <div>
                            <p className="text-lg font-bold text-[#0B2017]">R$ {book.price.toFixed(2)}</p>
                            <p className="text-xs text-[#434B3D]">Aluguel: R$ {book.rentPrice.toFixed(2)}/dia</p>
                          </div>
                          <Link
                            to={`/livro/${book.id}`}
                            className="bg-[#0B2017] text-[#C59B5F] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#C59B5F] hover:text-[#0B2017] transition-all duration-300"
                          >
                            Ver mais
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
