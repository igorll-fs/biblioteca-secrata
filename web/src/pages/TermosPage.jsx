import React from 'react';

export default function TermosPage() {
  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="bg-[#0B2017] py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C59B5F 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#EADFC9] mb-2">Termos de Uso</h1>
          <p className="text-[#EADFC9]/60 text-base font-light">Condições e regras para utilização da plataforma</p>
          <div className="w-12 h-0.5 bg-[#C59B5F] mt-4 rounded-full" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-[#EADFC9] rounded-2xl p-8 sm:p-12 border border-[#C59B5F]/25 shadow-md">
          <div className="prose prose-lg text-[#434B3D] space-y-8 font-body">
            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">1. Aceitação dos Termos</h2>
              <p className="leading-relaxed">Ao utilizar a plataforma A Biblioteca Secrata, você concorda com estes Termos de Uso. Se não concordar, por favor não utilize nossos serviços.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">2. Serviços</h2>
              <p className="leading-relaxed">A Biblioteca Secrata é uma plataforma que conecta leitores para compra e aluguel de livros. Não somos proprietários dos livros listados — facilitamos a transação entre compradores e vendedores.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">3. Cadastro</h2>
              <p className="leading-relaxed">Para utilizar nossos serviços, é necessário criar uma conta com informações verídicas. Você é responsável pela segurança de sua conta.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">4. Aluguel de Livros</h2>
              <p className="leading-relaxed">O prazo de aluguel é definido no momento da compra. O não retorno no prazo pode resultar em multa. O livro deve ser devolvido nas mesmas condições em que foi recebido.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">5. Pagamentos</h2>
              <p className="leading-relaxed">Os pagamentos são processados via Stripe. Aceitamos cartão de crédito e débito. Reembolsos seguem nossa política de cancelamento.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">6. Cancelamento</h2>
              <p className="leading-relaxed">Pedidos podem ser cancelados antes do envio. Aluguéis podem ser cancelados até 24h após a retirada, sem custo.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">7. Propriedade Intelectual</h2>
              <p className="leading-relaxed">Todo o conteúdo da plataforma (logos, textos, design) é propriedade de A Biblioteca Secrata. Os livros listados são de responsabilidade dos vendedores.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">8. Limitação de Responsabilidade</h2>
              <p className="leading-relaxed">A Biblioteca Secrata não se responsabiliza pela qualidade dos livros listados. Mediações são feitas em caso de disputa.</p>
            </section>

            <div className="pt-6 border-t border-[#C59B5F]/20">
              <p className="text-sm text-[#434B3D]/70 font-medium">Última atualização: Julho 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
