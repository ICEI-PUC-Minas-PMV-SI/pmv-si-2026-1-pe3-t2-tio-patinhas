# 7. Código fonte

Código da aplicação **Tio Patinhas** — gestão financeira pessoal com frontend web e API REST.

## Estrutura

| Pasta | Descrição |
|-------|-----------|
| `src/Frontend` | Interface Next.js 16 (App Router), TypeScript, Tailwind |
| `src/backend/TioPatinhas.Api` | API ASP.NET Core 10, Entity Framework, SQLite |
| `src/Frontend/API_CONTRACT.md` | Contrato HTTP entre front e back (fonte de verdade das rotas) |
| `docs/` | Documentação do projeto (requisitos, design, testes) |

## Como executar

Instruções completas (pré-requisitos, variáveis de ambiente, troubleshooting):

**[README — Como rodar a aplicação](../README.md#como-rodar-a-aplicação)**

Resumo:

1. `dotnet run` em `src/backend/TioPatinhas.Api` → http://localhost:5256  
2. `npm run dev` em `src/Frontend` (com `.env.local` apontando para a API) → http://localhost:3000  

## Regras de negócio na implementação

- **Categorias:** escolha em lista fixa na tela de transações; persistência interna no backend (sem endpoints públicos de categorias).
- **Liquidez:** saldo de todas as receitas menos todas as despesas do usuário.
- **Patrimônio no dashboard:** liquidez + estimativa de BTC (preço fixo no front para o MVP).
- **Investimentos e metas:** módulos completos conforme contrato da API.

Alinhamento com o documento de requisitos: [docs/especificacao.md — seção 3.5](../docs/especificacao.md#35-notas-da-implementação-atual).
