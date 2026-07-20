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
      <section className="relative bg-[#0B2017] text-[#EADFC9] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C59B5F] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#434B3D] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-[#C59B5F] font-body text-sm uppercase tracking-[0.3em] mb-6">
              Onde a sabedoria encontra o pergaminho
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-[#C59B5F]">A Biblioteca</span>
              <br />
              Secrata
            </h1>
            <p className="text-[#EADFC9]/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Um refúgio para mentes inquietas. Descubra livros raros, compre edições exclusivas
              ou alugue por tempo limitado. Cada página, um segredo revelado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/livros"
                className="bg-[#C59B5F] text-[#0B2017] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#b88d52] transition-all inline-flex items-center justify-center gap-2 text-lg"
              >
                Explorar Catálogo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/cadastro"
                className="border border-[#C59B5F]/40 text-[#C59B5F] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#C59B5F]/10 transition-all inline-flex items-center justify-center gap-2 text-lg"
              >
                Criar Conta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F5F1EB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C59B5F] text-sm uppercase tracking-[0.2em] mb-3">Seleção Especial</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B2017]">
              Livros em Destaque
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -4 }}
                className="bg-[#EADFC9] rounded-2xl shadow-md overflow-hidden group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[#C59B5F] text-xs font-semibold uppercase tracking-wider mb-1">
                    {book.genre}
                  </p>
                  <h3 className="font-display text-base font-bold text-[#0B2017] mb-1 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-[#434B3D] text-sm mb-3">{book.author}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-[#C59B5F] text-[#C59B5F]" />
                    <span className="text-sm font-medium text-[#0B2017]">{book.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-[#0B2017]">R$ {book.price.toFixed(2)}</p>
                      <p className="text-xs text-[#434B3D]">Alugar a partir de R$ {book.rentPrice.toFixed(2)}/dia</p>
                    </div>
                    <Link
                      to={`/livro/${book.id}`}
                      className="bg-[#C59B5F] text-[#0B2017] p-2 rounded-lg hover:bg-[#b88d52] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/livros"
              className="inline-flex items-center gap-2 text-[#0B2017] font-semibold hover:text-[#C59B5F] transition-colors"
            >
              Ver todo o catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0B2017] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C59B5F] text-sm uppercase tracking-[0.2em] mb-3">Simples e Seguro</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#EADFC9]">
              Como Funciona
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl border border-[#C59B5F]/10 bg-[#0B2017]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C59B5F]/10 mb-6">
                  <step.icon className="w-8 h-8 text-[#C59B5F]" />
                </div>
                <div className="text-[#C59B5F] font-display text-sm font-bold mb-2">
                  Passo {index + 1}
                </div>
                <h3 className="font-display text-xl font-bold text-[#EADFC9] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#EADFC9]/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F1EB] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Qualidade Garantida', desc: 'Todos os livros usados passam por avaliação rigorosa de conservação antes de chegar até você.' },
              { icon: Clock, title: 'Aluguel Flexível', desc: 'Escolha entre 7, 14 ou 30 dias. Renove facilmente se precisar de mais tempo com a história.' },
              { icon: Users, title: 'Comunidade de Leitores', desc: 'Conecte-se com outros amantes da literatura. Avalie, comente e descubra novas recomendações.' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#C59B5F]/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#C59B5F]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0B2017] mb-2">{item.title}</h3>
                  <p className="text-[#434B3D] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#4E3621] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#EADFC9] mb-4">
            Pronto para sua próxima aventura literária?
          </h2>
          <p className="text-[#EADFC9]/70 mb-8 text-lg">
            Junte-se a milhares de leitores que já descobriram o segredo da Biblioteca Secrata.
          </p>
          <Link
            to="/cadastro"
            className="bg-[#C59B5F] text-[#0B2017] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#b88d52] transition-all inline-flex items-center justify-center gap-2 text-lg"
          >
            Comece Agora
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
