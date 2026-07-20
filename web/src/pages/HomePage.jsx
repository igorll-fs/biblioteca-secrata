import { Link } from 'react-router-dom';
import { BookOpen, ShoppingBag, RotateCcw, Star, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredBooks = [
  {
    id: '1',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    price: 49.90,
    rentPrice: 5.90,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop',
    rating: 4.8,
    genre: 'Fantasia',
  },
  {
    id: '2',
    title: 'A Sombra do Vento',
    author: 'Carlos Ruiz Zafón',
    price: 44.90,
    rentPrice: 4.90,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop',
    rating: 4.7,
    genre: 'Ficção Gótica',
  },
  {
    id: '3',
    title: 'O Perfume',
    author: 'Patrick Süskind',
    price: 39.90,
    rentPrice: 4.50,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop',
    rating: 4.6,
    genre: 'Ficção Histórica',
  },
  {
    id: '4',
    title: 'Rebecca',
    author: 'Daphne du Maurier',
    price: 42.90,
    rentPrice: 5.00,
    cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=450&fit=crop',
    rating: 4.5,
    genre: 'Suspense Gótico',
  },
];

const steps = [
  {
    icon: BookOpen,
    title: 'Explore o Catálogo',
    description: 'Navegue por centenas de títulos cuidadosamente selecionados, dos clássicos atemporais às obras contemporâneas.',
  },
  {
    icon: ShoppingBag,
    title: 'Compre ou Alugue',
    description: 'Escolha entre adquirir para sua estante pessoal ou alugar por 7, 14 ou 30 dias com preços acessíveis.',
  },
  {
    icon: RotateCcw,
    title: 'Receba em Casa',
    description: 'Entrega rápida e segura. Livros usados passam por rigorosa avaliação de conservação antes do envio.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden bg-[#0B2017]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2017] via-[#0B2017]/95 to-[#0f2e1f]" />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#C59B5F] rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#434B3D] rounded-full blur-[100px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C59B5F] rounded-full blur-[200px] opacity-30" />
        </div>

        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C59B5F 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#C59B5F] font-body text-xs uppercase tracking-[0.35em] mb-8"
            >
              Onde a sabedoria encontra o pergaminho
            </motion.p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6">
              <span className="text-[#C59B5F] block">A Biblioteca</span>
              <span className="text-[#EADFC9] block mt-2">Secrata</span>
            </h1>

            <div className="flex justify-center my-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                className="h-0.5 animate-gold-shimmer rounded-full"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[#EADFC9]/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light"
            >
              Um refúgio para mentes inquietas. Descubra livros raros, compre edições exclusivas
              ou alugue por tempo limitado. Cada página, um segredo revelado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/livros"
                className="bg-[#C59B5F] text-[#0B2017] px-10 py-4 rounded-xl font-semibold hover:bg-[#d4aa6e] hover:shadow-xl hover:shadow-[#C59B5F]/20 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 text-base"
              >
                Explorar Catálogo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/cadastro"
                className="border border-[#C59B5F]/30 text-[#C59B5F] px-10 py-4 rounded-xl font-semibold hover:bg-[#C59B5F]/10 hover:border-[#C59B5F]/50 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 text-base"
              >
                Criar Conta
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-[#C59B5F]/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-[#C59B5F]/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-[#F5F1EB] py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C59B5F] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">Seleção Especial</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0B2017] mb-4">
              Livros em Destaque
            </h2>
            <div className="w-16 h-0.5 bg-[#C59B5F] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#C59B5F]/10 hover:border-[#C59B5F]/30 hover:shadow-xl hover:shadow-[#0B2017]/10 transition-all duration-500">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2017]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#0B2017]/85 text-[#C59B5F] text-[11px] px-2.5 py-1 rounded-lg font-medium backdrop-blur-sm border border-[#C59B5F]/20">
                        {book.genre}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#C59B5F] text-[#0B2017] text-[11px] px-2.5 py-1 rounded-lg font-bold shadow-lg">
                        R$ {book.price.toFixed(2)}
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
                      <p className="text-xs text-[#434B3D]">Alugar a partir de <span className="text-[#0B2017] font-semibold">R$ {book.rentPrice.toFixed(2)}/dia</span></p>
                      <Link
                        to={`/livro/${book.id}`}
                        className="bg-[#0B2017] text-[#C59B5F] p-2 rounded-lg hover:bg-[#C59B5F] hover:text-[#0B2017] transition-all duration-300"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/livros"
              className="inline-flex items-center gap-2 text-[#0B2017] font-semibold hover:text-[#C59B5F] transition-colors group"
            >
              Ver todo o catálogo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-[#0B2017] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C59B5F 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-[#C59B5F] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">Simples e Seguro</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#EADFC9] mb-4">
              Como Funciona
            </h2>
            <div className="w-16 h-0.5 bg-[#C59B5F] mx-auto mt-4" />
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-16 left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px bg-gradient-to-r from-transparent via-[#C59B5F]/30 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center relative"
                >
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="w-20 h-20 rounded-full border-2 border-[#C59B5F]/30 flex items-center justify-center bg-[#0B2017]">
                      <span className="font-display text-2xl font-bold text-[#C59B5F]">{index + 1}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#C59B5F]/10 flex items-center justify-center border border-[#C59B5F]/20">
                      <step.icon className="w-5 h-5 text-[#C59B5F]" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#EADFC9] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#EADFC9]/50 leading-relaxed max-w-xs mx-auto text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F5F1EB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Qualidade Garantida', desc: 'Todos os livros usados passam por avaliação rigorosa de conservação antes de chegar até você.' },
              { icon: Clock, title: 'Aluguel Flexível', desc: 'Escolha entre 7, 14 ou 30 dias. Renove facilmente se precisar de mais tempo com a história.' },
              { icon: Users, title: 'Comunidade de Leitores', desc: 'Conecte-se com outros amantes da literatura. Avalie, comente e descubra novas recomendações.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-[#C59B5F]/10 hover:border-[#C59B5F]/25 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#C59B5F]/10 flex items-center justify-center border border-[#C59B5F]/15">
                  <item.icon className="w-6 h-6 text-[#C59B5F]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0B2017] mb-2">{item.title}</h3>
                  <p className="text-[#434B3D] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0B2017] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C59B5F] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#C59B5F] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              <span className="text-[#C59B5F]">Pronto para sua próxima</span>
              <br />
              <span className="text-[#EADFC9]">aventura literária?</span>
            </h2>
            <p className="text-[#EADFC9]/50 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
              Junte-se a milhares de leitores que já descobriram o segredo da Biblioteca Secrata.
            </p>
            <Link
              to="/cadastro"
              className="bg-[#C59B5F] text-[#0B2017] px-12 py-4 rounded-xl font-bold hover:bg-[#d4aa6e] hover:shadow-xl hover:shadow-[#C59B5F]/25 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 text-lg"
            >
              Comece Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
