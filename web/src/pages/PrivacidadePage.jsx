import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-3xl text-[#0B2017] mb-8">Política de Privacidade</h1>
        <div className="prose prose-lg text-[#434B3D] space-y-6 font-body">
          <h2 className="font-display text-xl text-[#0B2017]">1. Dados Coletados</h2>
          <p>Coletamos: nome, e-mail, telefone, endereço de entrega, histórico de compras e aluguéis. Dados de pagamento são processados pelo Stripe — não armazenamos dados de cartão.</p>

          <h2 className="font-display text-xl text-[#0B2017]">2. Uso dos Dados</h2>
          <p>Utilizamos seus dados para: processar pedidos, enviar comunicações sobre seu pedido, melhorar nossos serviços e cumprir obrigações legais.</p>

          <h2 className="font-display text-xl text-[#0B2017]">3. Compartilhamento</h2>
          <p>Compartilhamos dados com: vendedores (nome e endereço para envio), Stripe (pagamentos), serviços de entrega. Não vendemos seus dados para terceiros.</p>

          <h2 className="font-display text-xl text-[#0B2017]">4. Seus Direitos (LGPD)</h2>
          <p>Conforme a Lei Geral de Proteção de Dados, você tem direito a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Revogar consentimento</li>
            <li>Portabilidade dos dados</li>
          </ul>

          <h2 className="font-display text-xl text-[#0B2017]">5. Segurança</h2>
          <p>Utilizamos criptografia SSL/TLS e práticas de segurança recomendadas pela indústria para proteger seus dados.</p>

          <h2 className="font-display text-xl text-[#0B2017]">6. Cookies</h2>
          <p>Utilizamos cookies essenciais para funcionamento da plataforma e cookies de analytics para melhorar a experiência.</p>

          <h2 className="font-display text-xl text-[#0B2017]">7. Exclusão de Conta</h2>
          <p>Para solicitar a exclusão de sua conta e dados, acesse Configurações → Deletar Conta, ou entre em contato conosco.</p>

          <h2 className="font-display text-xl text-[#0B2017]">8. Contato</h2>
          <p>Dúvidas sobre privacidade: privacidade@abibliotecaseacrata.com.br</p>

          <p className="text-sm text-[#434B3D]/60 mt-8">Última atualização: Julho 2026. Em conformidade com a LGPD (Lei 13.709/2018).</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
