"use server";

import { fetchAPI } from "./session";
import { revalidatePath } from "next/cache";

export async function getGoals(): Promise<any[]> {
  const response = await fetchAPI('/goals');
  if (response?.error) return [];
  return response || [];
}

export async function addGoal(formData: FormData) {
  const title = formData.get("title") as string;
  const targetAmountStr = formData.get("target_amount") as string;
  const currentAmountStr = formData.get("current_amount") as string;
  const deadline = formData.get("deadline") as string;
  const type = formData.get("type") as string;

  const target_amount = parseFloat(targetAmountStr);
  const current_amount = parseFloat(currentAmountStr || "0");

  await fetchAPI('/goals', { 
    method: 'POST',
    body: JSON.stringify({ title, target_amount, current_amount, deadline, type })
  });

  revalidatePath("/goals");
  revalidatePath("/");
}

export async function deleteGoal(id: number) {
  await fetchAPI(`/goals/${id}`, { method: 'DELETE' });

  revalidatePath("/goals");
  revalidatePath("/");
}

export async function updateGoal(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const targetAmountStr = formData.get("target_amount") as string;
  const currentAmountStr = formData.get("current_amount") as string;
  const deadline = formData.get("deadline") as string;
  const type = formData.get("type") as string;

  const target_amount = parseFloat(targetAmountStr);
  const current_amount = parseFloat(currentAmountStr || "0");

  await fetchAPI(`/goals/${id}`, { 
    method: 'PUT',
    body: JSON.stringify({ title, target_amount, current_amount, deadline, type })
  });

  revalidatePath("/goals");
  revalidatePath("/");
}
