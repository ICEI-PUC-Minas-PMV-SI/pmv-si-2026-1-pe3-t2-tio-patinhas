export type TransactionType = "income" | "expense";

export type ContractTransaction = {
  id: number;
  user_id?: number;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionType;
};

export type UiTransaction = {
  id: number;
  description: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
};

export function mapTransaction(t: ContractTransaction): UiTransaction {
  return {
    id: t.id,
    description: t.description,
    date: t.date,
    amount: Number(t.amount),
    category: t.category,
    type: t.type,
  };
}
