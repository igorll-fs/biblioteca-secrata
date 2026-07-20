import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, ArrowRight, SlidersHorizontal } from 'lucide-react';
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
      <div className="bg-[#0B2017] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#EADFC9] mb-2">Catálogo</h1>
          <p className="text-[#EADFC9]/60">Explore nossa coleção de livros para compra ou aluguel</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#EADFC9] px-4 py-2 rounded-xl text-[#0B2017] font-medium w-full justify-center"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
          </div>

          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-[#EADFC9] rounded-2xl p-6 sticky top-24">
              <h3 className="font-display text-lg font-bold text-[#0B2017] mb-4">Filtros</h3>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B2017] mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#434B3D]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Título ou autor..."
                    className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg pl-10 pr-4 py-2 text-sm text-[#0B2017] placeholder:text-[#434B3D]/50 focus:outline-none focus:border-[#C59B5F]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B2017] mb-2">Gênero</label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenre(g)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        selectedGenre === g
                          ? 'bg-[#C59B5F] text-[#0B2017] font-semibold'
                          : 'bg-[#F5F1EB] text-[#434B3D] hover:bg-[#C59B5F]/20'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B2017] mb-2">Condição</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-lg px-3 py-2 text-sm text-[#0B2017] focus:outline-none focus:border-[#C59B5F]"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#0B2017] mb-2">Tipo</label>
                <div className="flex gap-2">
                  {saleTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedSaleType(t)}
                      className={`flex-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                        selectedSaleType === t
                          ? 'bg-[#C59B5F] text-[#0B2017] font-semibold'
                          : 'bg-[#F5F1EB] text-[#434B3D] hover:bg-[#C59B5F]/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0B2017] mb-2">
                  Faixa de Preço: até R$ {priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-[#C59B5F]"
                />
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#434B3D] text-sm">
                {filtered.length} {filtered.length === 1 ? 'livro encontrado' : 'livros encontrados'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Filter className="w-12 h-12 text-[#434B3D]/30 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B2017] mb-2">Nenhum livro encontrado</h3>
                <p className="text-[#434B3D]">Tente ajustar seus filtros para encontrar o que procura.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((book) => (
                  <motion.div
                    key={book.id}
                    whileHover={{ y: -4 }}
                    className="bg-[#EADFC9] rounded-2xl shadow-md overflow-hidden group"
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-[#0B2017]/80 text-[#C59B5F] text-xs px-2 py-1 rounded-md font-medium">
                          {book.genre}
                        </span>
                        <span className="bg-[#C59B5F]/90 text-[#0B2017] text-xs px-2 py-1 rounded-md font-medium">
                          {book.condition}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-bold text-[#0B2017] mb-1 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-[#434B3D] text-sm mb-2">{book.author}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-[#C59B5F] text-[#C59B5F]" />
                        <span className="text-sm font-medium text-[#0B2017]">{book.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-[#0B2017]">R$ {book.price.toFixed(2)}</p>
                          <p className="text-xs text-[#434B3D]">Aluguel: R$ {book.rentPrice.toFixed(2)}/dia</p>
                        </div>
                        <Link
                          to={`/livro/${book.id}`}
                          className="bg-[#C59B5F] text-[#0B2017] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b88d52] transition-colors"
                        >
                          Ver mais
                        </Link>
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
