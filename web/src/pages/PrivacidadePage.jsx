import React from 'react';

export default function PrivacidadePage() {
  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      <div className="bg-[#0B2017] py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C59B5F 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#EADFC9] mb-2">Política de Privacidade</h1>
          <p className="text-[#EADFC9]/60 text-base font-light">Como tratamos e protegemos seus dados pessoais</p>
          <div className="w-12 h-0.5 bg-[#C59B5F] mt-4 rounded-full" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-[#EADFC9] rounded-2xl p-8 sm:p-12 border border-[#C59B5F]/25 shadow-md">
          <div className="prose prose-lg text-[#434B3D] space-y-8 font-body">
            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">1. Dados Coletados</h2>
              <p className="leading-relaxed">Coletamos: nome, e-mail, telefone, endereço de entrega, histórico de compras e aluguéis. Dados de pagamento são processados pelo Stripe — não armazenamos dados de cartão.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">2. Uso dos Dados</h2>
              <p className="leading-relaxed">Utilizamos seus dados para: processar pedidos, enviar comunicações sobre seu pedido, melhorar nossos serviços e cumprir obrigações legais.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">3. Compartilhamento</h2>
              <p className="leading-relaxed">Compartilhamos dados com: vendedores (nome e endereço para envio), Stripe (pagamentos), serviços de entrega. Não vendemos seus dados para terceiros.</p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">4. Seus Direitos (LGPD)</h2>
              <p className="leading-relaxed">Conforme a Lei Geral de Proteção de Dados, você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar consentimento</li>
                <li>Portabilidade dos dados</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">5. Segurança</h2>
              <p className="leading-relaxed">Utilizamos criptografia SSL/TLS e práticas de segurança recomendadas pela indústria para proteger seus dados.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">6. Cookies</h2>
              <p className="leading-relaxed">Utilizamos cookies essenciais para funcionamento da plataforma e cookies de analytics para melhorar a experiência.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">7. Exclusão de Conta</h2>
              <p className="leading-relaxed">Para solicitar a exclusão de sua conta e dados, acesse Configurações → Deletar Conta, ou entre em contato conosco.</p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#0B2017] flex items-center gap-2">8. Contato</h2>
              <p className="leading-relaxed">Dúvidas sobre privacidade: <span className="font-semibold text-[#0B2017]">privacidade@abibliotecaseacrata.com.br</span></p>
            </section>

            <div className="pt-6 border-t border-[#C59B5F]/20">
              <p className="text-sm text-[#434B3D]/70 font-medium">Última atualização: Julho 2026. Em conformidade com a LGPD (Lei 13.709/2018).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
