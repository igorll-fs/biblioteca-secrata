import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Clock, Shield, ArrowLeft, Heart, Share2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const booksData = {
  '1': { id: '1', title: 'O Nome do Vento', author: 'Patrick Rothfuss', price: 49.90, rentPrice: 5.90, cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', rating: 4.8, reviews: 234, genre: 'Fantasia', condition: 'Novo', pages: 662, publisher: 'Arqueiro', year: 2007, isbn: '978-85-8041-038-8', description: 'Kvothe, um homem que se tornou lenda viva, narra sua própria história: a infância entre uma trupe de artistas itinerantes, os anos passados como órfão em uma cidade cruel, o ingresso na prestigiada Universidade e a busca por respostas sobre o assassinato de seus pais. Uma obra-prima da fantasia contemporânea que combina prosa poética, magia inovadora e uma narrativa envolvente.', seller: { name: 'Livraria Arcanum', rating: 4.9, sales: 1247 }, reviewsList: [{ user: 'Morgana S.', rating: 5, text: 'Uma das melhores fantasias que já li. A prosa de Rothfuss é simplesmente hipnotizante.', date: '2024-11-15' }, { user: 'Eduardo P.', rating: 5, text: 'Comprei para minha estante e já é um dos meus livros favoritos. Recomendo fortemente.', date: '2024-10-22' }, { user: 'Camila R.', rating: 4, text: 'História incrível, mas o final fica devendo. Ainda assim, uma obra obrigatória.', date: '2024-09-18' }] },
  '2': { id: '2', title: 'A Sombra do Vento', author: 'Carlos Ruiz Zafón', price: 44.90, rentPrice: 4.90, cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', rating: 4.7, reviews: 189, genre: 'Ficção Gótica', condition: 'Usado - Excelente', pages: 545, publisher: 'Suma', year: 2001, isbn: '978-85-8041-029-6', description: 'Barcelona, 1945. Daniel Sempere, filho de um livreiro, descobre um livro misterioso que mudará sua vida. Ao buscar outros livros do autor, ele mergulha em uma trama de segredos, amor e vingança que se estende por décadas. Uma homenagem à literatura e à cidade de Barcelona.', seller: { name: 'Sebo Literário', rating: 4.7, sales: 856 }, reviewsList: [{ user: 'Ana L.', rating: 5, text: 'Zafón é um mestre da atmosfera. Cada página é um convite a Barcelona.', date: '2024-12-01' }, { user: 'Pedro M.', rating: 4, text: 'Enredo magnífico. Um dos melhores livros que li este ano.', date: '2024-11-10' }] },
};

const defaultBook = { id: '0', title: 'Livro', author: 'Autor', price: 39.90, rentPrice: 4.50, cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop', rating: 4.5, reviews: 120, genre: 'Ficção', condition: 'Novo', pages: 350, publisher: 'Editora', year: 2020, isbn: '978-00-0000-000-0', description: 'Um livro fascinante que prende o leitor do início ao fim. Uma narrativa envolvente com personagens profundos e uma trama surpreendente.', seller: { name: 'Livraria', rating: 4.8, sales: 500 }, reviewsList: [] };

export default function BookDetailPage() {
  const { id } = useParams();
  const book = booksData[id] || { ...defaultBook, id };
  const { addItem } = useCart();
  const [rentDays, setRentDays] = useState(7);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  function handleAddToCart(type) {
    addItem({
      bookId: book.id,
      title: book.title,
      author: book.author,
      price: type === 'rent' ? book.rentPrice : book.price,
      type,
      days: type === 'rent' ? rentDays : undefined,
      cover: book.cover,
      sellerId: book.seller.name,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/livros" className="inline-flex items-center gap-2 text-[#434B3D] hover:text-[#C59B5F] transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img src={book.cover} alt={book.title} className="w-full rounded-2xl shadow-xl" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white/90 p-2 rounded-full shadow hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-[#4E3621]" />
                </button>
                <button className="bg-white/90 p-2 rounded-full shadow hover:bg-white transition-colors">
                  <Share2 className="w-5 h-5 text-[#4E3621]" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#C59B5F]/20 text-[#4E3621] text-xs font-semibold px-3 py-1 rounded-full">{book.genre}</span>
              <span className="bg-[#0B2017]/10 text-[#0B2017] text-xs font-semibold px-3 py-1 rounded-full">{book.condition}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#0B2017] mb-2">{book.title}</h1>
            <p className="text-[#434B3D] text-lg mb-4">por <span className="font-semibold">{book.author}</span></p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-[#C59B5F] text-[#C59B5F]' : 'text-[#C59B5F]/30'}`} />
                ))}
                <span className="ml-2 font-semibold text-[#0B2017]">{book.rating}</span>
                <span className="text-[#434B3D] text-sm">({book.reviews} avaliações)</span>
              </div>
            </div>

            <div className="bg-[#EADFC9] rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[#434B3D] text-sm mb-1">Preço de Venda</p>
                  <p className="text-2xl font-bold text-[#0B2017]">R$ {book.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[#434B3D] text-sm mb-1">Aluguel por Dia</p>
                  <p className="text-2xl font-bold text-[#C59B5F]">R$ {book.rentPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#0B2017] mb-2">Dias de Aluguel</label>
                <div className="flex gap-2">
                  {[7, 14, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setRentDays(d)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        rentDays === d
                          ? 'bg-[#C59B5F] text-[#0B2017]'
                          : 'bg-[#F5F1EB] text-[#434B3D] hover:bg-[#C59B5F]/20'
                      }`}
                    >
                      {d} dias
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#434B3D] mt-2">
                  Total aluguel {rentDays} dias: R$ {(book.rentPrice * rentDays).toFixed(2)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToCart('buy')}
                  className="flex-1 bg-[#C59B5F] text-[#0B2017] py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Comprar
                </button>
                <button
                  onClick={() => handleAddToCart('rent')}
                  className="flex-1 border border-[#C59B5F] text-[#C59B5F] py-3 rounded-xl font-semibold hover:bg-[#C59B5F]/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Clock className="w-5 h-5" />
                  Alugar
                </button>
              </div>

              {added && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[#434B3D] text-sm mt-3 font-medium">
                  Adicionado ao carrinho!
                </motion.p>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-[#434B3D] mb-6">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#C59B5F]" /> Qualidade garantida</div>
              <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#C59B5F]" /> {book.pages} páginas</div>
            </div>

            <div className="border-t border-[#C59B5F]/20 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C59B5F]/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#C59B5F]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0B2017] text-sm">{book.seller.name}</p>
                  <p className="text-[#434B3D] text-xs">{book.seller.rating} estrelas · {book.seller.sales} vendas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12">
          <div className="flex gap-6 border-b border-[#C59B5F]/20 mb-6">
            {['description', 'details', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? 'text-[#C59B5F] border-b-2 border-[#C59B5F]'
                    : 'text-[#434B3D] hover:text-[#0B2017]'
                }`}
              >
                {tab === 'description' ? 'Descrição' : tab === 'details' ? 'Detalhes' : `Avaliações (${book.reviewsList.length})`}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="bg-[#EADFC9] rounded-2xl p-8">
              <p className="text-[#0B2017] leading-relaxed text-base">{book.description}</p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="bg-[#EADFC9] rounded-2xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Editora', value: book.publisher },
                  { label: 'Ano', value: book.year },
                  { label: 'Páginas', value: book.pages },
                  { label: 'ISBN', value: book.isbn },
                ].map((d) => (
                  <div key={d.label}>
                    <p className="text-[#434B3D] text-sm mb-1">{d.label}</p>
                    <p className="font-semibold text-[#0B2017]">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {book.reviewsList.map((review, i) => (
                <div key={i} className="bg-[#EADFC9] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-[#0B2017]">{review.user}</p>
                      <p className="text-[#434B3D] text-xs">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-[#C59B5F] text-[#C59B5F]' : 'text-[#C59B5F]/30'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#0B2017]">{review.text}</p>
                </div>
              ))}
              {book.reviewsList.length === 0 && (
                <div className="text-center py-8 text-[#434B3D]">Nenhuma avaliação ainda.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
