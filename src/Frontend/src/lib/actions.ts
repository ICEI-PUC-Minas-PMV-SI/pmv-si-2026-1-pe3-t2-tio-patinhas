"use server";

import { fetchAPI } from "./session";
import { revalidatePath } from "next/cache";
import {
  type ContractTransaction,
  type TransactionType,
  mapTransaction,
} from "./dotnetApi";
import { normalizeInvestment, type Investment } from "./investments";

async function fetchTransactions() {
  const response = await fetchAPI("/transactions");
  if (response?.error || !Array.isArray(response)) return [];
  return (response as ContractTransaction[]).map(mapTransaction);
}

function buildTransactionPayload(formData: FormData) {
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const amountStr = formData.get("amount") as string;
  const type = formData.get("type") as TransactionType;
  const amount = parseFloat(amountStr);

  if (!category?.trim()) {
    throw new Error("Categoria é obrigatória.");
  }

  return {
    description,
    category: category.trim(),
    date,
    amount,
    type,
  };
}

export async function getTransactions() {
  return fetchTransactions();
}

export async function addTransaction(formData: FormData) {
  const payload = buildTransactionPayload(formData);

  const response = await fetchAPI("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  revalidatePath("/");
  revalidatePath("/transactions");
}

export async function deleteTransaction(id: number) {
  const response = await fetchAPI(`/transactions/${id}`, { method: "DELETE" });
  if (response?.error) {
    throw new Error(response.error);
  }

  revalidatePath("/transactions");
  revalidatePath("/");
}

export async function updateTransaction(id: number, formData: FormData) {
  const payload = buildTransactionPayload(formData);

  const response = await fetchAPI(`/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  revalidatePath("/transactions");
  revalidatePath("/");
}

export async function getBalanceSummary() {
  const response = await fetchAPI("/transactions/summary");
  if (response?.error || !response) {
    return { income: 0, expense: 0, balance: 0 };
  }
  return response;
}

export async function getCategoryExpenses() {
  const response = await fetchAPI("/transactions/expenses-by-category");
  if (response?.error || !Array.isArray(response)) return [];
  return response;
}

export async function getMonthlyEvolution() {
  const response = await fetchAPI("/transactions/monthly-evolution");
  if (response?.error || !Array.isArray(response)) return [];
  return response;
}

export async function getInvestments(): Promise<Investment[]> {
  const response = await fetchAPI("/investments");
  if (response?.error || !Array.isArray(response)) return [];
  return response.map((item: Record<string, unknown>) => normalizeInvestment(item));
}

export async function addInvestment(formData: FormData) {
  const asset = formData.get("asset") as string;
  const amountStr = formData.get("amount") as string;
  const purchasePriceStr = formData.get("purchase_price") as string;
  const date = formData.get("date") as string;

  const response = await fetchAPI("/investments", {
    method: "POST",
    body: JSON.stringify({
      asset,
      amount: parseFloat(amountStr),
      purchase_price: parseFloat(purchasePriceStr),
      date,
    }),
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  revalidatePath("/investments");
  revalidatePath("/");
}

export async function deleteInvestment(id: number) {
  const response = await fetchAPI(`/investments/${id}`, { method: "DELETE" });
  if (response?.error) {
    throw new Error(response.error);
  }

  revalidatePath("/investments");
  revalidatePath("/");
}

export async function updateInvestment(id: number, formData: FormData) {
  const asset = formData.get("asset") as string;
  const amountStr = formData.get("amount") as string;
  const purchasePriceStr = formData.get("purchase_price") as string;
  const date = formData.get("date") as string;

  const response = await fetchAPI(`/investments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      asset,
      amount: parseFloat(amountStr),
      purchase_price: parseFloat(purchasePriceStr),
      date,
    }),
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  revalidatePath("/investments");
  revalidatePath("/");
}
