# Frontend — Tio Patinhas

Interface web em **Next.js 16** (App Router, TypeScript, Tailwind).

## Execução

1. Suba a API .NET antes (ver [README principal](../../README.md#como-rodar-a-aplicação)).
2. Configure `src/Frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5256
```

3. Na pasta `src/Frontend`:

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Integração com a API

- Contrato: [API_CONTRACT.md](./API_CONTRACT.md)
- Chamadas autenticadas: `src/lib/session.ts` (Bearer JWT do cookie `session`)
- Server Actions: `src/lib/actions.ts`, `src/lib/goalsActions.ts`

## Regras de negócio na UI

- **Transações:** categorias em lista fixa (`TransactionForm.tsx`); envio do nome como `category`.
- **Dashboard:** patrimônio = liquidez (API) + BTC estimado (cotação fixa R$ 340.000 no MVP).
- **Gráfico de evolução:** saldo acumulado alinhado à liquidez via prop `totalBalance`.

Documentação completa do projeto: [docs/especificacao.md](../../docs/especificacao.md) (seção 3.5).
