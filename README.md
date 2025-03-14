# WP Simplify Dashboard

Um dashboard moderno e eficiente para gerenciamento de sites WordPress.

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

- Node.js 18.0.0 ou superior
- npm 8.0.0 ou superior
- Site WordPress com REST API habilitada

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd wp-simplify-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

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

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes. 