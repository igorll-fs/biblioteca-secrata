import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-3xl text-[#0B2017] mb-8">Termos de Uso</h1>
        <div className="prose prose-lg text-[#434B3D] space-y-6 font-body">
          <h2 className="font-display text-xl text-[#0B2017]">1. Aceitação dos Termos</h2>
          <p>Ao utilizar a plataforma A Biblioteca Secrata, você concorda com estes Termos de Uso. Se não concordar, por favor não utilize nossos serviços.</p>

          <h2 className="font-display text-xl text-[#0B2017]">2. Serviços</h2>
          <p>A Biblioteca Secrata é uma plataforma que conecta leitores para compra e aluguel de livros. Não somos proprietários dos livros listados — facilitamos a transação entre compradores e vendedores.</p>

          <h2 className="font-display text-xl text-[#0B2017]">3. Cadastro</h2>
          <p>Para utilizar nossos serviços, é necessário criar uma conta com informações verídicas. Você é responsável pela segurança de sua conta.</p>

          <h2 className="font-display text-xl text-[#0B2017]">4. Aluguel de Livros</h2>
          <p>O prazo de aluguel é definido no momento da compra. O não retorno no prazo pode resultar em multa. O livro deve ser devolvido nas mesmas condições em que foi recebido.</p>

          <h2 className="font-display text-xl text-[#0B2017]">5. Pagamentos</h2>
          <p>Os pagamentos são processados via Stripe. Aceitamos cartão de crédito e débito. Reembolsos seguem nossa política de cancelamento.</p>

          <h2 className="font-display text-xl text-[#0B2017]">6. Cancelamento</h2>
          <p>Pedidos podem ser cancelados antes do envio. Aluguéis podem ser cancelados até 24h após a retirada, sem custo.</p>

          <h2 className="font-display text-xl text-[#0B2017]">7. Propriedade Intelectual</h2>
          <p>Todo o conteúdo da plataforma (logos, textos, design) é propriedade de A Biblioteca Secrata. Os livros listados são de responsabilidade dos vendedores.</p>

          <h2 className="font-display text-xl text-[#0B2017]">8. Limitação de Responsabilidade</h2>
          <p>A Biblioteca Secrata não se responsabiliza pela qualidade dos livros listados. Mediações são feitas em caso de disputa.</p>

          <p className="text-sm text-[#434B3D]/60 mt-8">Última atualização: Julho 2026</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
