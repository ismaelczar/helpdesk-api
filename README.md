# 🚀 Helpdesk API

Este repositório contém a API para um sistema de Helpdesk (Central de Suporte), projetado para gerenciar o fluxo de chamados de clientes de forma eficiente. A aplicação permite o registro, atribuição, acompanhamento e finalização de tickets de suporte.

A base do projeto utiliza uma arquitetura sólida e escalável com **Node.js**, **Express**, **TypeScript** e **Clean Architecture** orientada a domínio.

> Desenvolvido e mantido por [Ismaelczar](https://www.linkedin.com/in/ismaelcezar/)

## 🗂️ Estrutura de Pastas

```
.
├── @types                    # Tipagens globais e customizações do Express
├── shared                    # Provedores, cache, storage, etc.
│   ├── dtos/errors           # DTOs de erros
│   ├── providers             # Redis, TypeORM
│   ├── http/docs             # Decorators
│   ├── container             # Inversão de dependência (tsyringe)
├── main
│   ├── app.ts                # Criação da aplicação Express
│   ├── bootstrap.ts          # Inicialização da aplicação
│   ├── server.ts             # Entrada principal
│   ├── http/middlewares      # Middlewares globais
│   ├── http/routes           # Rotas agrupadas por domínio
├── modules                   # Domínios da aplicação (auth, users, mail)
│   ├── example
```

## 🛠️ Requisitos

-   Node.js v18+
-   Yarn
-   Docker
-   PostgreSQL, Redis

## ⚙️ Instalação

```bash
git clone https://github.com/ismaelczar/helpdesk-api.git
cd helpdesk-api
yarn install
cp .env.example .env
```

Configure suas variáveis de ambiente no `.env`.

## ▶️ Executando o Projeto

### Desenvolvimento

```bash
yarn dev
```

### Produção

```bash
yarn build
yarn start
```

## 🧪 Testes

```bash
yarn test
```

O projeto já disponibiliza integrações prontas para:

-   Postgres via TypeORM em `shared/providers/typeorm`
-   Redis em `shared/providers/redis`

## 📚 Arquitetura Clean

-   `modules`: separação por domínio (ex: `users`, `auth`)
-   `application/useCases`: casos de uso isolados
-   `domain/entities` e `domain/dtos`: regras de negócio
-   `infra/repositories`: integração com banco

Desenvolvido com ❤️ por **Ismael Cézar**

## 🪪 Licença

Distribuído sob a Licença MIT. Veja [LICENSE](./LICENSE) para mais informações.
