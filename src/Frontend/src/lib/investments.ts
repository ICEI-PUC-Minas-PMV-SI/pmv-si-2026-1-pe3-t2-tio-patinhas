export type Investment = {
  id: number;
  user_id?: number;
  asset: string;
  amount: number;
  purchase_price: number;
  date: string;
};

export function normalizeInvestment(raw: Record<string, unknown>): Investment {
  return {
    id: Number(raw.id),
    user_id: raw.user_id != null ? Number(raw.user_id) : undefined,
    asset: String(raw.asset ?? ""),
    amount: Number(raw.amount ?? 0),
    purchase_price: Number(raw.purchase_price ?? raw.purchasePrice ?? 0),
    date: String(raw.date ?? ""),
  };
}

export function isBtcAsset(asset: string): boolean {
  const symbol = asset.trim().toUpperCase();
  return symbol === "BTC" || symbol === "BITCOIN" || symbol.startsWith("BTC");
}

export function sumBtcAmount(investments: Investment[]): number {
  return investments
    .filter((i) => isBtcAsset(i.asset))
    .reduce((acc, i) => acc + i.amount, 0);
}

/** Ex.: 13 → "13", 0.5 → "0,5", 0.00012 → "0,00012" */
export function formatBtcAmount(amount: number): string {
  if (!Number.isFinite(amount)) return "0";
  const rounded = Math.round(amount * 1e8) / 1e8;
  return rounded.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });
}
