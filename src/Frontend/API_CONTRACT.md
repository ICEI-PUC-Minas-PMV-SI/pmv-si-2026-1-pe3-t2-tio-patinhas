# Contrato de API (Frontend ↔ Backend)

Este documento descreve as rotas, requisições e respostas da API **Tio Patinhas**. O backend em `src/backend/TioPatinhas.Api` implementa este contrato; o frontend consome via `NEXT_PUBLIC_API_URL` (padrão: `http://localhost:5256`).

**Não utilizado:** rotas legadas `/api/Transactions`, `/api/Categories` ou CRUD público de categorias.

## Categorias (regra de negócio)

- Não existem endpoints `GET/POST/PUT/DELETE` de categorias.
- Em transações, o campo `category` é uma **string** enviada pelo frontend (lista pré-definida na tela).
- O backend cria ou reutiliza a categoria internamente conforme o nome e o `type` (`income` / `expense`).

## Autenticação (Headers)
Todas as rotas (exceto `/auth/login` e `/auth/register`) deverão ser protegidas. 
O frontend enviará o token recebido no momento do login ou cadastro através do header de Autorização:
`Authorization: Bearer <seu_token_aqui>`

Caso o token seja inválido ou esteja ausente, o backend deve retornar status HTTP `401 Unauthorized`.

---

## 1. Autenticação e Usuário

### 1.1 Cadastro de Usuário
- **Endpoint:** `POST /auth/register`
- **Body Request:**
  ```json
  {
    "name": "Nome do Usuário",
    "email": "email@exemplo.com",
    "password": "senha_segura"
  }
  ```
- **Response Esperada (Sucesso):** O frontend espera receber um Token JWT. Opcionalmente com dados do usuário (embora o token codificado seja o mais importante agora).
  ```json
  {
    "token": "ey..." 
  }
  ```
- **Response de Erro:**
  ```json
  {
    "error": "Mensagem descritiva de erro"
  }
  ```

### 1.2 Login de Usuário
- **Endpoint:** `POST /auth/login`
- **Body Request:**
  ```json
  {
    "email": "email@exemplo.com",
    "password": "senha_segura"
  }
  ```
- **Response Esperada (Sucesso):** 
  ```json
  {
    "token": "ey..." 
  }
  ```

### 1.3 Obter Perfil
- **Endpoint:** `GET /profile`
- **Response Esperada:**
  ```json
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "email@exemplo.com"
  }
  ```

### 1.4 Atualizar Perfil
- **Endpoint:** `PUT /profile`
- **Body Request:**
  ```json
  {
    "name": "Novo Nome",
    "email": "novoemail@exemplo.com"
  }
  ```

### 1.5 Atualizar Senha
- **Endpoint:** `PUT /profile/password`
- **Body Request:**
  ```json
  {
    "currentPassword": "senha_antiga",
    "newPassword": "senha_nova"
  }
  ```

---

## 2. Dashboard e Relatórios

### 2.1 Resumo de Saldo (liquidez)
- **Endpoint:** `GET /transactions/summary`
- **Regra:** `income` e `expense` somam **todas** as transações do usuário; `balance` = `income` - `expense` (liquidez de caixa).
- **Response Esperada:**
  ```json
  {
    "income": 5000.00,
    "expense": 1500.00,
    "balance": 3500.00
  }
  ```

### 2.2 Despesas por Categoria
- **Endpoint:** `GET /transactions/expenses-by-category`
- **Response Esperada:** Array ordenado do maior valor para o menor.
  ```json
  [
    { "name": "Moradia", "value": 1500.00 },
    { "name": "Alimentação", "value": 500.00 }
  ]
  ```

### 2.3 Evolução Mensal
- **Endpoint:** `GET /transactions/monthly-evolution`
- **Regra:** Retorna os **últimos 6 meses**. Em cada item, `income` e `expense` são totais **daquele mês**; `balance` é o **saldo acumulado** (patrimônio de caixa) ao fim do mês, incluindo transações anteriores ao intervalo exibido. O último `balance` deve coincidir com `balance` do resumo (2.1), salvo arredondamentos.
- **Response Esperada:**
  ```json
  [
    { "name": "01/2026", "income": 5000, "expense": 4000, "balance": 1000 },
    { "name": "02/2026", "income": 5000, "expense": 4200, "balance": 1800 }
  ]
  ```

---

## 3. Transações

### 3.1 Listar Transações
- **Endpoint:** `GET /transactions`
- **Response Esperada:** Array ordenado pela data mais recente (DESC).
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "description": "Salário",
      "category": "Trabalho",
      "date": "2026-04-01T00:00:00Z",
      "amount": 5000,
      "type": "income"
    }
  ]
  ```
  *(O tipo deve ser exclusivamente `"income"` ou `"expense"`).*

### 3.2 Criar Transação
- **Endpoint:** `POST /transactions`
- **Body Request:**
  ```json
  {
    "description": "Salário",
    "category": "Trabalho",
    "date": "2026-04-01",
    "amount": 5000,
    "type": "income"
  }
  ```

### 3.3 Atualizar Transação
- **Endpoint:** `PUT /transactions/:id`
- **Body Request:** Mesmo do `POST`.

### 3.4 Deletar Transação
- **Endpoint:** `DELETE /transactions/:id`

---

## 4. Investimentos

### 4.1 Listar Investimentos
- **Endpoint:** `GET /investments`
- **Response Esperada:**
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "asset": "Tesouro Direto",
      "amount": 10.5,
      "purchase_price": 100.00,
      "date": "2026-04-01T00:00:00Z"
    }
  ]
  ```

### 4.2 Criar Investimento
- **Endpoint:** `POST /investments`
- **Body Request:**
  ```json
  {
    "asset": "Tesouro Direto",
    "amount": 10.5,
    "purchase_price": 100.00,
    "date": "2026-04-01"
  }
  ```

### 4.3 Atualizar Investimento
- **Endpoint:** `PUT /investments/:id`
- **Body Request:** Mesmo do `POST`.

### 4.4 Deletar Investimento
- **Endpoint:** `DELETE /investments/:id`

---

## 5. Metas (Goals)

### 5.1 Listar Metas
- **Endpoint:** `GET /goals`
- **Response Esperada:**
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "title": "Viagem para Europa",
      "target_amount": 15000.00,
      "current_amount": 5000.00,
      "deadline": "2026-12-01T00:00:00Z",
      "type": "short_term"
    },
    {
      "id": 2,
      "user_id": 1,
      "title": "Aposentadoria",
      "target_amount": 1000000.00,
      "current_amount": 50000.00,
      "deadline": "2040-01-01T00:00:00Z",
      "type": "long_term"
    }
  ]
  ```
  *(O `type` pode ser `"short_term"` para metas em meses e `"long_term"` para metas em anos).*

### 5.2 Criar Meta
- **Endpoint:** `POST /goals`
- **Body Request:**
  ```json
  {
    "title": "Viagem para Europa",
    "target_amount": 15000.00,
    "current_amount": 0.00,
    "deadline": "2026-12-01",
    "type": "short_term"
  }
  ```

### 5.3 Atualizar Meta
- **Endpoint:** `PUT /goals/:id`
- **Body Request:** Mesmo do `POST` ou parcial (para atualizar apenas o `current_amount`, por exemplo).

### 5.4 Deletar Meta
- **Endpoint:** `DELETE /goals/:id`
