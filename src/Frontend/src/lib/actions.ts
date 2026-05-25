"use server";

import { fetchAPI } from "./session";
import { revalidatePath } from "next/cache";

export async function getTransactions() {
  const response = await fetchAPI('/transactions');
  if (response?.error) return [];
  return response || [];
}

export async function addTransaction(formData: FormData) {
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const amountStr = formData.get("amount") as string;
  const type = formData.get("type") as string;
  const amount = parseFloat(amountStr);

  await fetchAPI('/transactions', { 
    method: 'POST',
    body: JSON.stringify({ description, category, date, amount, type })
  });

  revalidatePath("/");
  revalidatePath("/transactions");
}

export async function deleteTransaction(id: number) {
  await fetchAPI(`/transactions/${id}`, { method: 'DELETE' });

  revalidatePath("/transactions");
  revalidatePath("/");
}

export async function updateTransaction(id: number, formData: FormData) {
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;
  const amountStr = formData.get("amount") as string;
  const type = formData.get("type") as string;
  const amount = parseFloat(amountStr);

  await fetchAPI(`/transactions/${id}`, { 
    method: 'PUT',
    body: JSON.stringify({ description, category, date, amount, type })
  });

  revalidatePath("/transactions");
  revalidatePath("/");
}

export async function getBalanceSummary() {
  const response = await fetchAPI('/transactions/summary');
  if (response?.error || !response) {
    return { income: 0, expense: 0, balance: 0 };
  }
  return response;
}

export async function getCategoryExpenses() {
  const response = await fetchAPI('/transactions/expenses-by-category');
  if (response?.error) return [];
  return response || [];
}

export async function getMonthlyEvolution() {
  const response = await fetchAPI('/transactions/monthly-evolution');
  if (response?.error) return [];
  return response || [];
}

export async function getInvestments() {
  const response = await fetchAPI('/investments');
  if (response?.error) return [];
  return response || [];
}

export async function addInvestment(formData: FormData) {
  const asset = formData.get("asset") as string;
  const amountStr = formData.get("amount") as string;
  const purchasePriceStr = formData.get("purchase_price") as string;
  const date = formData.get("date") as string;

  const amount = parseFloat(amountStr);
  const purchase_price = parseFloat(purchasePriceStr);

  await fetchAPI('/investments', { 
    method: 'POST',
    body: JSON.stringify({ asset, amount, purchase_price, date })
  });

  revalidatePath("/investments");
  revalidatePath("/");
}

export async function deleteInvestment(id: number) {
  await fetchAPI(`/investments/${id}`, { method: 'DELETE' });

  revalidatePath("/investments");
  revalidatePath("/");
}

export async function updateInvestment(id: number, formData: FormData) {
  const asset = formData.get("asset") as string;
  const amountStr = formData.get("amount") as string;
  const purchasePriceStr = formData.get("purchase_price") as string;
  const date = formData.get("date") as string;

  const amount = parseFloat(amountStr);
  const purchase_price = parseFloat(purchasePriceStr);

  await fetchAPI(`/investments/${id}`, { 
    method: 'PUT',
    body: JSON.stringify({ asset, amount, purchase_price, date })
  });

  revalidatePath("/investments");
  revalidatePath("/");
}
