# Tio Patinhas - Grupo 5

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Design de Centrado no Usuário`

`SEMESTRE: 3º`

A organização das finanças pessoais é um aspecto fundamental para garantir equilíbrio financeiro e auxiliar na tomada de decisões no cotidiano. O controle adequado de receitas e despesas permite que indivíduos planejem melhor seus gastos, evitem endividamentos e tenham maior consciência sobre sua situação financeira.

Este projeto propõe o desenvolvimento de uma solução web funcional e acessível denominada “Tio Patinhas”, que permite ao usuário registrar, categorizar e visualizar seus movimentos financeiros de maneira simples e intuitiva.

## Integrantes

* Isadora Silva Matos
* Pedro Henrique Lyra Barbosa
* André Bacelar Gonçalves
* Raphael Caracci Bustamante
* Wesley Azevedo Gomes
* Igor Fernando Costa Cecílio

## Orientador

* Joana Gabriela Ribeiro de Souza

# Planejamento

| Etapa         | Atividades |
|  :----:   | ----------- |
| ETAPA 1         |[Introdução](docs/introducao.md) <br> [Estado da Arte](docs/estado.md) <br> [Referências](docs/referencias.md) |
| ETAPA 2         |[Especificação de Requisitos de Software](docs/especificacao.md) |
| ETAPA 3         |[Design de Interação](docs/design.md) |
| ETAPA 4        |[Testes de Software](docs/testes.md) |
| ETAPA 5         | [Apresentação](docs/apresentacao.md) |

Documentação alinhada à implementação atual: [Especificação — seção 3.5](docs/especificacao.md#35-notas-da-implementação-atual).

# Código

<li><a href="src/codigo.md"> Código Fonte</a></li>

<li><a href="src/Frontend/API_CONTRACT.md"> Contrato da API (frontend ↔ backend)</a></li>

## Arquitetura e regras de negócio (implementação)

A aplicação em produção de desenvolvimento integra **Next.js** (`src/Frontend`) com **API REST** (`src/backend/TioPatinhas.Api`). Detalhes acadêmicos permanecem em [docs/especificacao.md](docs/especificacao.md) (seção **3.5** traz o alinhamento com o código).

| Tema | Comportamento implementado |
|------|----------------------------|
| **Autenticação** | Cadastro e login em `/auth/*`; JWT no cookie `session`; senhas com BCrypt no backend |
| **Categorias** | Não há CRUD de categorias na API. O usuário escolhe uma categoria **pré-definida no frontend** ao cadastrar a transação; o backend cria/vincula a categoria internamente a partir do texto enviado |
| **Transações** | Tipos `income` e `expense`; listagem ordenada por data (mais recente primeiro) |
| **Resumo (dashboard)** | `GET /transactions/summary` retorna receitas, despesas e **liquidez** (saldo) considerando **todas** as transações do usuário |
| **Patrimônio exibido** | **Nível da Caixa-Forte** = liquidez + valor estimado de BTC (cotação fixa R$ 340.000 no MVP, apenas ativos `BTC`/`BITCOIN`) |
| **Gráfico de evolução** | Últimos **6 meses**; saldo acumulado por mês inclui movimentos anteriores ao período; o último ponto de **Saldo acumulado (patrimônio)** coincide com a liquidez do resumo |
| **Despesas por categoria** | Agrupamento das despesas pelo nome da categoria informado nas transações |
| **Investimentos** | CRUD em `/investments` (ativo, quantidade, preço de compra, data); sem cotação em tempo real na API |
| **Metas** | CRUD em `/goals` com tipos `short_term` e `long_term` |
| **Perfil** | Atualização de nome/e-mail e troca de senha em `/profile` |
| **Não implementado** | Recuperação de senha por e-mail (RF09); filtros avançados de transações por período (RF08) |

Rotas legadas `/api/Transactions` e `/api/Categories` **não existem** — usar apenas o contrato documentado em `src/Frontend/API_CONTRACT.md`.

## Como rodar a aplicação

A solução é composta por uma **API .NET** (backend) e um **frontend Next.js**. Em desenvolvimento, rode os dois ao mesmo tempo em terminais separados.

| Camada | Tecnologia | Pasta | URL padrão |
|--------|------------|-------|------------|
| Frontend | Next.js 16 + React 19 | `src/Frontend` | http://localhost:3000 |
| Backend | ASP.NET Core 10 | `src/backend/TioPatinhas.Api` | http://localhost:5256 |
| Banco | SQLite | `src/backend/TioPatinhas.Api/tiopatinhas.db` | — |
| Documentação da API | Swagger | — | http://localhost:5256/swagger |

O frontend consome a API pela variável `NEXT_PUBLIC_API_URL`. O login e o cadastro retornam um token **JWT**, usado nas requisições autenticadas.

### Pré-requisitos

1. **[.NET SDK 10](https://dotnet.microsoft.com/download)** — verifique com `dotnet --version` (deve ser 10.x).
2. **[Node.js 20+](https://nodejs.org/)** (LTS recomendado) e **npm** — verifique com `node --version` e `npm --version`.
3. **Git**, para clonar o repositório.

### Ordem de execução

| Ordem | Terminal | Pasta | Comando |
|-------|----------|-------|---------|
| 1º | Backend | `src/backend/TioPatinhas.Api` | `dotnet run` |
| 2º | Frontend | `src/Frontend` | `npm run dev` |

Confirme que o Swagger abre em http://localhost:5256/swagger antes de usar o frontend em http://localhost:3000.

---

### Backend (API .NET)

#### 1. Entrar na pasta do projeto

**Windows (PowerShell):**

```powershell
cd src\backend\TioPatinhas.Api
```

**Linux / macOS:**

```bash
cd src/backend/TioPatinhas.Api
```

#### 2. Restaurar dependências e compilar

```bash
dotnet restore
dotnet build
```

#### 3. Banco de dados (SQLite)

A API usa o arquivo `tiopatinhas.db` na pasta do projeto (configurado em `appsettings.json`).

Ao iniciar em **Development**, o `Program.cs`:

1. Aplica migrações automaticamente (`Database.Migrate()`).
2. Executa o seed de demonstração (`ExampleDataSeeder`) **somente se** o e-mail `demo@tiopatinhas.dev` ainda não existir.

Para atualizar o banco manualmente (opcional):

```bash
dotnet ef database update
```

Se o comando `dotnet ef` não for reconhecido:

```bash
dotnet tool install --global dotnet-ef
```

##### O que vai para o Git

| Arquivo | Versionado? | Motivo |
|---------|-------------|--------|
| `tiopatinhas.db` | Sim | Banco com **estrutura** (tabelas/migrações) e **registros de exemplo** para testar sem cadastrar tudo |
| `tiopatinhas.db-shm` | Não | Arquivo temporário do SQLite (API em execução) — ignorado em `.gitignore` |
| `tiopatinhas.db-wal` | Não | Arquivo temporário do SQLite (API em execução) — ignorado em `.gitignore` |

**Estrutura no repositório:** além das tabelas já existentes (`Users`, `Categories`, `Transactions`, `Goals`, etc.), a migração `AddInvestments` criou a tabela **`Investments`**. Não há colunas novas nas tabelas antigas — apenas essa tabela extra.

**Registros de exemplo** (usuário demo): 12 transações (receitas/despesas em vários meses), 2 investimentos (BTC e Tesouro Direto) e 2 metas (curto e longo prazo).

##### Usuário de demonstração

Use no **frontend** (http://localhost:3000 → Login) ou no Swagger (`POST /auth/login`):

| Campo | Valor |
|-------|--------|
| E-mail | `demo@tiopatinhas.dev` |
| Senha | `Demo@123` |

Com esse login você já vê dashboard, gráficos, investimentos e metas populados.

##### Recriar o banco do zero

Com a API **parada**:

```powershell
# Windows — na pasta TioPatinhas.Api
Remove-Item tiopatinhas.db -ErrorAction SilentlyContinue
dotnet run
```

```bash
# Linux / macOS
rm -f tiopatinhas.db
dotnet run
```

Na próxima subida, as migrações recriam o arquivo e o seed insere o usuário demo novamente.

#### 4. Configuração

Em `appsettings.json`:

| Chave | Descrição |
|-------|-----------|
| `ConnectionStrings:DefaultConnection` | Caminho do SQLite (`Data Source=tiopatinhas.db`) |
| `Jwt:Key` | Chave para assinar tokens JWT |

Os valores padrão do repositório funcionam em desenvolvimento local. Não reutilize a chave JWT de desenvolvimento em produção.

#### 5. Subir a API

```bash
dotnet run
```

A API ficará disponível em **http://localhost:5256**.

Alternativa, a partir da raiz do repositório:

```bash
dotnet run --project src/backend/TioPatinhas.Api/TioPatinhas.Api.csproj
```

#### 6. Testar no Swagger

1. Acesse http://localhost:5256/swagger
2. Use `POST /auth/register` ou `POST /auth/login` e copie o `token`
3. Clique em **Authorize** e informe: `Bearer {seu_token}`
4. Teste as rotas protegidas (`/profile`, `/transactions`, `/investments`, `/goals`, etc.)

#### Principais rotas

| Grupo | Rotas |
|-------|--------|
| Auth (público) | `POST /auth/register`, `POST /auth/login` |
| Perfil | `GET/PUT /profile`, `PUT /profile/password` |
| Transações | `GET/POST /transactions`, `PUT/DELETE /transactions/{id}` |
| Relatórios | `GET /transactions/summary`, `GET /transactions/expenses-by-category`, `GET /transactions/monthly-evolution` |
| Investimentos | `GET/POST /investments`, `PUT/DELETE /investments/{id}` |
| Metas | `GET/POST /goals`, `PUT/DELETE /goals/{id}` |

Rotas protegidas exigem o header: `Authorization: Bearer <token>`.

#### CORS

Em desenvolvimento, a API aceita requisições originadas de **http://localhost:3000**. Se o Next.js subir em outra porta (por exemplo 3001), ajuste `WithOrigins` em `Program.cs` ou libere a porta 3000.

---

### Frontend (Next.js)

#### 1. Entrar na pasta do frontend

**Windows (PowerShell):**

```powershell
cd src\Frontend
```

**Linux / macOS:**

```bash
cd src/Frontend
```

#### 2. Instalar dependências

```bash
npm install
```

#### 3. Variáveis de ambiente

Crie ou confira o arquivo `src/Frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5256
```

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_API_URL` | Sim | URL base da API (sem barra no final) |

Reinicie o `npm run dev` após alterar o `.env.local`.

#### 4. Subir o frontend

```bash
npm run dev
```

Acesse **http://localhost:3000**.

**Teste rápido com dados de exemplo:** faça login com `demo@tiopatinhas.dev` / `Demo@123` (ver [banco de dados](#3-banco-de-dados-sqlite)). Você também pode cadastrar um usuário novo em **Registrar**.

Navegue pelo dashboard, transações, investimentos e metas.

#### 5. Build de produção (opcional)

```bash
npm run build
npm run start
```

#### 6. Lint (opcional)

```bash
npm run lint
```

---

### Verificação rápida

- [ ] `dotnet --version` retorna 10.x
- [ ] `node --version` retorna 20 ou superior
- [ ] Swagger abre em http://localhost:5256/swagger
- [ ] `.env.local` aponta para `http://localhost:5256`
- [ ] Frontend abre em http://localhost:3000
- [ ] Login com `demo@tiopatinhas.dev` / `Demo@123` abre o dashboard com dados
- [ ] Cadastro ou login funcionam sem erro de conexão

### Problemas comuns

| Problema | O que fazer |
|----------|-------------|
| Porta **5256** em uso | Encerre o processo anterior da API (`Ctrl+C` no terminal do `dotnet run`) ou altere a porta em `Properties/launchSettings.json` e em `NEXT_PUBLIC_API_URL` |
| Porta **3000** em uso | Feche outro `next dev` ou rode `npm run dev -- -p 3000` e alinhe o CORS no backend |
| Frontend não conecta na API | Confirme que a API está rodando, que `NEXT_PUBLIC_API_URL` está correto e reinicie o frontend |
| `dotnet build` falha (arquivo em uso) | Pare a API antes de compilar |
| Banco inconsistente | Com a API parada, apague `tiopatinhas.db` e execute `dotnet run` (migrações + seed recriam o demo) |
| Arquivos `tiopatinhas.db-shm` / `.db-wal` no Git | Não commite; estão no `.gitignore`. Pare a API antes de `git add` do `.db` |
| `dotnet build` com API rodando | Pare a API (`Ctrl+C`); arquivos `.db-shm`/`.db-wal` indicam que o processo ainda está ativo |

### Comandos resumidos

**Terminal 1 — API:**

```bash
cd src/backend/TioPatinhas.Api
dotnet restore
dotnet run
```

**Terminal 2 — Frontend:**

```bash
cd src/Frontend
npm install
npm run dev
```

# Apresentação

<li><a href="docs/apresentacao.md"> Apresentação da solução</a></li>
