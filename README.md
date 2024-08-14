# Desafio Banco PLL - API

Esta é uma API para gerenciar contas bancárias e transações. A API permite criar contas, criar transações e consultar informações sobre contas e transações.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Testes](#testes)
- [Endpoints](#endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Requisitos

- Node.js (v14 ou superior)
- NPM (v6 ou superior)
- TypeScript

## Instalação
1. Clone o repositório:

   ```bash
   git clone https://github.com/elipesodair/PLL-BANCO_API.git
   cd seu-repositorio

2. Instale as dependências:
   npm install

Configuração
1. O projeto utiliza SQLite e cria um banco de dados local (`database.sqlite`). Certifique-se de que o banco de dados seja inicializado corretamente:

2. (Opcional) Configure a port para o servidor no arquivo src/index.ts:
const PORT = process.env.PORT || 4000;

Execução
1. Compile o código TypeScript:
npm run build

npm start

O servidor será iniciado na porta 4000 por padrão. Você pode acessar a API em http://localhost:4000.


Testes
1. Para rodar os testes, primeiro certifique-se de que o banco de dados está configurado corretamente e que a API está em execução.

Endpoints
Aqui estão alguns dos principais endpoints disponíveis na API:
GET http://localhost:4000/ - Página inicial.
GET http://localhost:4000/validate-token - Validação de token.
POST http://localhost:4000/account - Criação de uma nova conta.
POST http://localhost:4000/transaction - Criação de uma nova transação.
GET http://localhost:4000/account/001 - Obtenção de uma conta pelo número.
GET http://localhost:4000/transaction/001 - Obtenção de uma transação pelo ID.

Cabeçalhos
Authorization: Bearer YOUR_VALID_TOKEN

Corpo da requisição:
POST /account
{
  "accountNumber": "001",
  "balance": 1000,
  "ownerName": "João Silva",
  "document": "123.456.789-10"
}

POST /transaction
{
  "accountId": 1,
  "type": "deposit",
  "amount": 50
}

