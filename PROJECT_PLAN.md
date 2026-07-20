# A Biblioteca Secrata — Plano Completo do Projeto

## 🎯 Visão Geral
Plataforma de **venda e aluguel de livros** com identidade visual Dark Academia. 
Site completo: catálogo, carrinho, checkout, painel do cliente, painel do vendedor, Google OAuth.

## 🎨 Brand Identity

### Paleta de Cores
| Cor | Hex | Uso |
|---|---|---|
| Forest Green (Primary) | `#0B2017` | Fundo escuro, nav, sidebar |
| Olive Green (Secondary) | `#434B3D` | Cards escuros, bordas |
| Chocolate Brown | `#4E3621` | Accent secundário |
| Antique Gold (Accent) | `#C59B5F` | Botões, links, destaques |
| Parchment Cream | `#EADFC9` | Fundo claro, cards |
| Light BG | `#F5F1EB` | Fundo de páginas claras |

### Tipografia
- **Headers/Logo:** Cinzel Decorative (Google Fonts) — serif, elegante
- **Body/UI:** Montserrat (Google Fonts) — sans-serif, limpa

### Elementos Visuais
- Chave ornada (símbolo principal)
- Porta arcada com fechadura
- Lua crescente + estrelas
- Pilha de livros
- Livro aberto com estrelas

## 🏗️ Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** PocketBase 0.39.3
- **Pagamento:** Stripe (checkout + webhooks)
- **Auth:** Google OAuth + Email/Senha
- **Deploy:** VPS + Caddy + Cloudflare
- **Modelo AI:** Xiaomi MiMo V2.5 Pro

## 📦 Features — MVP (Fase 1)

### Auth & User
- [ ] Google OAuth login/signup
- [ ] Email + senha login/signup
- [ ] Perfil do usuário (foto, bio, endereço)
- [ ] Dois roles: `buyer` (comprador) e `seller` (vendedor/livraria)

### Catálogo de Livros
- [ ] Listagem com filtros (gênero, preço, tipo: venda/aluguel, condição)
- [ ] Busca por título, autor, ISBN
- [ ] Página de detalhe do livro (fotos, sinopse, preço, avaliações)
- [ ] Cards com design Dark Academia

### Sistema de Anúncios (Vendedor)
- [ ] Criar anúncio: título, autor, ISBN, sinopse, fotos, preço venda, preço aluguel/dia, condição
- [ ] Editar/Desativar/Excluir anúncio
- [ ] Dashboard do vendedor (meus livros, vendas, aluguéis ativos)

### Carrinho & Checkout
- [ ] Carrinho de compras (venda + aluguel misturados)
- [ ] Checkout Stripe (pagamento único pra venda, recorrente pra aluguel)
- [ ] Confirmação de pedido por email

### Aluguel
- [ ] Selecionar período de aluguel (7, 14, 30 dias)
- [ ] Cálculo automático do preço
- [ ] Lembrete de devolução (WhatsApp/email)
- [ ] Status: pendente → ativo → devolvido / atrasado

### Avaliações
- [ ] Cliente avalia livro após compra/aluguel
- [ ] Nota (1-5 estrelas) + comentário
- [ ] Média visível no card do livro

### Páginas
- [ ] Homepage (hero + destaques + como funciona)
- [ ] Catálogo (/livros)
- [ ] Detalhe do livro (/livro/:id)
- [ ] Carrinho (/carrinho)
- [ ] Checkout (/checkout)
- [ ] Login/Cadastro (/login, /cadastro)
- [ ] Dashboard do comprador (/meu-painel)
- [ ] Dashboard do vendedor (/vendedor)
- [ ] Criar anúncio (/vendedor/novo)
- [ ] Termos de uso (/termos)
- [ ] Política de privacidade (/privacidade)

## 🚀 Features — Fase 2 (pós-MVP)
- Chat entre comprador e vendedor
- Sistema de favoritos/wishlist
- Notificações push
- Programa de fidelidade
- Clube de assinatura (1 livro/mês)
- Integração com Correios (rastreamento)
- App PWA

## 📐 Estrutura do Projeto
```
biblioteca-secrata/
├── web/                    # Frontend React
│   ├── src/
│   │   ├── pages/          # Páginas
│   │   ├── components/     # Componentes
│   │   ├── contexts/       # Contextos (Auth, Cart)
│   │   ├── hooks/          # Hooks customizados
│   │   ├── lib/            # PocketBase client
│   │   ├── i18n/           # Traduções
│   │   └── index.css       # Estilos globais + brand
│   ├── public/             # Assets (logos, favicons)
│   ├── tailwind.config.js  # Cores da marca
│   └── package.json
├── pb_hooks/               # PocketBase hooks
├── pb_migrations/          # Migrations
└── pb_data/                # Dados PB
```

## 🗄️ Collections (PocketBase)

### users
- name, email, password, avatar, bio, phone, address
- role: "buyer" | "seller" | "both"
- oauth2 (Google)

### books
- title, author, isbn, synopsis, cover (file)
- genre: select (Ficção, Romance, Fantasia, etc.)
- condition: "new" | "like_new" | "good" | "acceptable"
- priceSell (number, cents) — preço de venda
- priceRentDay (number, cents) — preço por dia de aluguel
- sellerId → relation users
- status: "active" | "sold" | "rented" | "inactive"
- stock (number)

### orders
- buyerId → relation users
- items (JSON: [{bookId, type: "sell"|"rent", days, price}])
- total (number, cents)
- status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
- paymentMethod: "card" | "pix"
- stripeSessionId
- shippingAddress

### rentals
- orderId → relation orders
- bookId → relation books
- buyerId → relation users
- startDate, endDate, returnDate
- status: "active" | "returned" | "overdue"
- dailyRate, totalPaid

### reviews
- bookId → relation books
- userId → relation users
- rating (1-5)
- comment
- orderId → relation orders

### categories
- name, slug, icon, description
