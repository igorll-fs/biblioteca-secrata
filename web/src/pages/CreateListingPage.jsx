import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, BookOpen, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const genres = [
  'Fantasia', 'Ficção Gótica', 'Ficção Histórica', 'Suspense', 'Romance',
  'Clássicos', 'Sci-Fi', 'Não-Ficção', 'Terror', 'Aventura', 'Poesia', 'Biografia',
];

const conditions = [
  { value: 'novo', label: 'Novo' },
  { value: 'excelente', label: 'Usado - Excelente' },
  { value: 'bom', label: 'Usado - Bom' },
  { value: 'regular', label: 'Usado - Regular' },
];

export default function CreateListingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', author: '', isbn: '', genre: '', condition: '',
    synopsis: '', cover: null, coverPreview: '', priceSell: '',
    priceRent: '', stock: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCover(e) {
    const file = e.target.files?.[0];
    if (file) {
      update('cover', file);
      update('coverPreview', URL.createObjectURL(file));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const steps = [
    { title: 'Informações do Livro', description: 'Dados básicos da obra' },
    { title: 'Detalhes', description: 'Gênero, estado e sinopse' },
    { title: 'Preço & Estoque', description: 'Valores e quantidade' },
  ];

  const canNext = () => {
    if (step === 0) return form.title && form.author;
    if (step === 1) return form.genre && form.condition;
    if (step === 2) return form.priceSell && form.stock;
    return true;
  };

  if (submitted) {
    return (
      <div className="bg-[#F5F1EB] min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#EADFC9] rounded-2xl p-10 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 rounded-full bg-[#C59B5F]/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#C59B5F]" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0B2017] mb-2">Anúncio Criado!</h2>
          <p className="text-[#434B3D] mb-6">Seu livro "{form.title}" foi publicado com sucesso no catálogo.</p>
          <div className="flex flex-col gap-3">
            <Link to="/vendedor" className="bg-[#C59B5F] text-[#0B2017] py-3 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors">
              Ir para o Painel
            </Link>
            <button onClick={() => { setSubmitted(false); setStep(0); setForm({ title: '', author: '', isbn: '', genre: '', condition: '', synopsis: '', cover: null, coverPreview: '', priceSell: '', priceRent: '', stock: '' }); }} className="text-[#C59B5F] font-semibold hover:underline">
              Criar Outro Anúncio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/vendedor" className="inline-flex items-center gap-2 text-[#434B3D] hover:text-[#0B2017] transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </Link>

        <h1 className="font-display text-3xl font-bold text-[#0B2017] mb-2">Novo Anúncio</h1>
        <p className="text-[#434B3D] mb-8">Adicione um livro ao catálogo para venda ou aluguel</p>

        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                i < step ? 'bg-[#C59B5F] text-[#0B2017]' : i === step ? 'bg-[#0B2017] text-[#C59B5F]' : 'bg-[#EADFC9] text-[#434B3D]'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <div className="hidden sm:block">
                <p className={`text-xs font-semibold ${i <= step ? 'text-[#0B2017]' : 'text-[#434B3D]/50'}`}>{s.title}</p>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-[#C59B5F]' : 'bg-[#EADFC9]'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#EADFC9] rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Título *</label>
                    <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required placeholder="Nome do livro" className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Autor *</label>
                    <input type="text" value={form.author} onChange={(e) => update('author', e.target.value)} required placeholder="Nome do autor" className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">ISBN</label>
                    <input type="text" value={form.isbn} onChange={(e) => update('isbn', e.target.value)} placeholder="978-0-000-00000-0" className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]" />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Gênero *</label>
                    <select value={form.genre} onChange={(e) => update('genre', e.target.value)} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]">
                      <option value="">Selecione um gênero</option>
                      {genres.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Condição *</label>
                    <select value={form.condition} onChange={(e) => update('condition', e.target.value)} required className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] focus:outline-none focus:border-[#C59B5F]">
                      <option value="">Selecione a condição</option>
                      {conditions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Sinopse</label>
                    <textarea value={form.synopsis} onChange={(e) => update('synopsis', e.target.value)} rows={5} placeholder="Descreva brevemente o livro..." className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F] resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Foto da Capa</label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#C59B5F]/30 rounded-xl cursor-pointer hover:border-[#C59B5F]/60 transition-colors bg-[#F5F1EB] overflow-hidden">
                      {form.coverPreview ? (
                        <img src={form.coverPreview} alt="Capa" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-[#C59B5F]/50 mx-auto mb-2" />
                          <p className="text-sm text-[#434B3D]">Clique para enviar uma imagem</p>
                          <p className="text-xs text-[#434B3D]/50 mt-1">PNG, JPG até 5MB</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleCover} className="hidden" />
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Preço de Venda (R$) *</label>
                      <input type="number" step="0.01" min="0" value={form.priceSell} onChange={(e) => update('priceSell', e.target.value)} required placeholder="0,00" className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Aluguel por Dia (R$)</label>
                      <input type="number" step="0.01" min="0" value={form.priceRent} onChange={(e) => update('priceRent', e.target.value)} placeholder="0,00" className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B2017] mb-1.5">Quantidade em Estoque *</label>
                    <input type="number" min="0" value={form.stock} onChange={(e) => update('stock', e.target.value)} required placeholder="1" className="w-full bg-[#F5F1EB] border border-[#C59B5F]/20 rounded-xl px-4 py-3 text-[#0B2017] placeholder:text-[#434B3D]/40 focus:outline-none focus:border-[#C59B5F]" />
                  </div>

                  <div className="bg-[#F5F1EB] rounded-xl p-5 border border-[#C59B5F]/10">
                    <h3 className="font-display text-sm font-bold text-[#0B2017] mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#C59B5F]" />
                      Resumo do Anúncio
                    </h3>
                    <div className="space-y-1 text-sm text-[#434B3D]">
                      <p><span className="font-semibold text-[#0B2017]">Título:</span> {form.title || '—'}</p>
                      <p><span className="font-semibold text-[#0B2017]">Autor:</span> {form.author || '—'}</p>
                      <p><span className="font-semibold text-[#0B2017]">Gênero:</span> {form.genre || '—'}</p>
                      <p><span className="font-semibold text-[#0B2017]">Condição:</span> {conditions.find((c) => c.value === form.condition)?.label || '—'}</p>
                      <p><span className="font-semibold text-[#0B2017]">Venda:</span> {form.priceSell ? `R$ ${Number(form.priceSell).toFixed(2)}` : '—'}</p>
                      <p><span className="font-semibold text-[#0B2017]">Aluguel:</span> {form.priceRent ? `R$ ${Number(form.priceRent).toFixed(2)}/dia` : '—'}</p>
                      <p><span className="font-semibold text-[#0B2017]">Estoque:</span> {form.stock || '—'}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors ${step === 0 ? 'text-[#434B3D]/30 cursor-not-allowed' : 'text-[#0B2017] hover:bg-[#EADFC9]'}`}>
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>
            {step < 2 ? (
              <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="flex items-center gap-2 bg-[#C59B5F] text-[#0B2017] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Próximo
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" className="flex items-center gap-2 bg-[#C59B5F] text-[#0B2017] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#b88d52] transition-colors">
                <Check className="w-4 h-4" />
                Publicar Anúncio
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
