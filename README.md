<<<<<<< HEAD
# 🏪 Ticnes Store - Frontend

Uma aplicação moderna de App Store desenvolvida com **React + TypeScript**, oferecendo uma interface completa para navegação, busca, visualização e avaliação de aplicativos.

## ✨ Funcionalidades

### 🎯 Principais
- **Navegação completa** entre páginas usando React Router
- **Sistema de busca** com filtros por categoria, rating e ordenação
- **Visualização detalhada** de apps com screenshots, descrições e avaliações
- **Sistema de autenticação** (login e cadastro de usuários)
- **Dashboard do usuário** com apps baixados e estatísticas
- **Avaliações e comentários** para cada aplicativo
- **Dark Mode** com toggle e persistência no localStorage

### 🎨 Interface
- Design moderno e responsivo (desktop + mobile)
- Componentização clara e reutilizável
- Animações e transições suaves
- Tailwind CSS para estilização

### 🔧 Tecnologias
- **React 18** com TypeScript
- **React Router v6** para navegação
- **Tailwind CSS** para estilização
- **Context API** para gerenciamento de estado
- **Vite** como build tool
- **Lucide React** para ícones

## 📁 Estrutura do Projeto

```
app-store-frontend/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── AppCard.tsx
│   │   ├── AppList.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Rating.tsx
│   │   ├── ScreenshotGallery.tsx
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── pages/            # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── AppDetails.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── Dashboard.tsx
│   ├── context/          # Context API
│   │   ├── AppContext.tsx
│   │   └── ThemeContext.tsx
│   ├── types/            # Tipos TypeScript
│   │   └── index.ts
│   ├── data/             # Mock de dados
│   │   └── mockData.ts
│   ├── App.tsx           # Componente principal
│   ├── index.tsx         # Entry point
│   └── index.css         # Estilos globais
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. **Clone o repositório ou navegue até a pasta do projeto**

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

O build será gerado na pasta `dist/`.

### Preview do Build

```bash
npm run preview
```

## 📱 Páginas da Aplicação

### 🏠 Home (`/`)
- Apps em destaque
- Apps mais baixados
- Apps melhor avaliados
- Apps organizados por categoria

### 🔍 Search (`/search`)
- Barra de pesquisa com debounce
- Filtros por categoria e rating mínimo
- Ordenação (popular, rating, downloads, newest)
- Resultados em tempo real

### 📱 App Details (`/app/:id`)
- Informações completas do app
- Galeria de screenshots com navegação
- Lista de avaliações e comentários
- Formulário para adicionar avaliação
- Botão de download/comprar

### 🔐 Login (`/login`)
- Formulário de autenticação
- Validação de campos
- Redirecionamento após login

### 📝 Signup (`/signup`)
- Formulário de cadastro
- Validação de senha
- Confirmação de senha

### 👤 Dashboard (`/dashboard`)
- Estatísticas do usuário
- Lista de apps baixados
- Informações do perfil

## 🎨 Componentes Principais

### `AppCard`
Card reutilizável que exibe informações resumidas de um app.

### `AppList`
Lista responsiva de cards de apps em formato de grid.

### `SearchBar`
Barra de pesquisa com debounce e limpeza de texto.

### `Rating`
Componente de estrelas para avaliações (1-5 estrelas).

### `ScreenshotGallery`
Galeria de screenshots com navegação e miniaturas.

### `Header`
Barra de navegação fixa com links, dark mode toggle e menu do usuário.

### `Footer`
Rodapé com links de contato, termos e redes sociais.

## 🔧 Context API

### `AppContext`
Gerencia:
- Estado do usuário logado
- Lista de apps
- Filtros e busca
- Operações de download e avaliação

### `ThemeContext`
Gerencia:
- Tema claro/escuro
- Persistência no localStorage
- Preferência do sistema

## 📊 Mock de Dados

O projeto inclui dados mockados em `src/data/mockData.ts`:
- 8 aplicativos de exemplo
- 2 usuários de exemplo
- Avaliações e reviews

**Nota:** Em produção, esses dados viriam de uma API backend.

## 🧪 Testando a Aplicação

### Login de Teste
- Use qualquer email válido
- Senha com 6+ caracteres
- Exemplo: `joao@example.com` / `senha123`

### Cadastro
- Preencha nome, email e senha (6+ caracteres)
- O sistema criará um novo usuário automaticamente

## 🎯 Funcionalidades Implementadas

✅ Navegação entre páginas  
✅ Busca e filtros  
✅ Visualização de detalhes  
✅ Sistema de avaliações  
✅ Login e cadastro  
✅ Dashboard do usuário  
✅ Dark mode  
✅ Design responsivo  
✅ Componentização  
✅ TypeScript com tipagem completa  
✅ Mock de dados  

## 📝 Notas Importantes

- **Autenticação:** O sistema de login/cadastro é simulado. Em produção, seria necessário integrar com um backend real.
- **Persistência:** O estado do usuário e tema são salvos no localStorage, mas não persistem entre sessões do mock.
- **Reviews:** As avaliações são adicionadas localmente, mas não persistem após recarregar a página (seria necessário backend).

## 🛠️ Próximos Passos (Melhorias Futuras)

- [ ] Integração com API backend
- [ ] Persistência real de dados
- [ ] Sistema de pagamento
- [ ] Notificações
- [ ] Histórico de downloads
- [ ] Favoritos
- [ ] Compartilhamento de apps
- [ ] Testes unitários e E2E
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto é apenas para fins educacionais e demonstração.

## 👨‍💻 Desenvolvido com

- React + TypeScript
- Tailwind CSS
- React Router
- Context API
- Vite

---

**Desenvolvido como demonstração de uma App Store moderna e completa! 🚀**
=======
# TicnesStore
Para ser o meu repo da TicnesStore
>>>>>>> 7f9d722798c9ab6b758c0cdc31d8ead70434c2ec
# TicnesStoreAi
