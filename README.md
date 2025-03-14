# WP Simplify Dashboard

Um dashboard moderno e intuitivo para gerenciar múltiplos sites WordPress.

## Características

- Interface moderna e responsiva com TailwindCSS
- Gerenciamento de múltiplos sites WordPress
- Painel de controle unificado
- Gerenciamento de conteúdo
- Gerenciamento de usuários
- Integração com LMS
- Estatísticas e relatórios
- Sistema de backup

## Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- WordPress >= 6.0.0 com REST API habilitada

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/wp-simplify-dashboard.git
cd wp-simplify-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

## Build e Deploy

### Build Local

Para criar uma build de produção:
```bash
npm run build
```

Para testar a build localmente:
```bash
npm run preview
```

### Deploy com Docker

1. Build da imagem:
```bash
docker build -t wp-simplify-dashboard .
```

2. Executar o container:
```bash
docker run -p 3000:3000 wp-simplify-dashboard
```

### Deploy com Docker Compose

1. Iniciar a aplicação:
```bash
docker-compose up -d
```

2. Parar a aplicação:
```bash
docker-compose down
```

## Configuração do WordPress

1. Instale e ative o plugin JWT Authentication for WP REST API
2. Configure o .htaccess:
```apache
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

3. Adicione ao wp-config.php:
```php
define('JWT_AUTH_SECRET_KEY', 'sua-chave-secreta');
define('JWT_AUTH_CORS_ENABLE', true);
```

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| PORT | Porta do servidor | 3000 |
| VITE_APP_NAME | Nome da aplicação | WP Simplify Dashboard |
| VITE_APP_VERSION | Versão da aplicação | 0.1.0 |
| VITE_API_TIMEOUT | Timeout das requisições (ms) | 30000 |
| VITE_STORAGE_PREFIX | Prefixo para localStorage | wp_simplify_ |

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa os testes
- `npm run test:coverage` - Executa os testes com cobertura
- `npm run preview` - Visualiza a build de produção localmente

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── contexts/      # Contextos React (WordPress, Auth, etc)
  ├── pages/         # Componentes de página
  ├── types/         # Definições de tipos TypeScript
  ├── utils/         # Funções utilitárias
  └── App.tsx        # Componente principal
```

## Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## Licença

MIT 