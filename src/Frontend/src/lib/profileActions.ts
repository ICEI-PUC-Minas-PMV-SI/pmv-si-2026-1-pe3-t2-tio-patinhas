"use server";

import { fetchAPI } from "./session";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
  const response = await fetchAPI('/profile');
  if (response?.error) return null;
  return response;
}

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { error: "Nome e email são obrigatórios." };
  }

  const response = await fetchAPI('/profile', { 
    method: 'PUT', 
    body: JSON.stringify({ name, email }) 
  });
  
  if (response?.error) return { error: response.error };

  revalidatePath("/profile");
  return { success: true };
}

export async function updatePassword(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword) {
    return { error: "Todos os campos são obrigatórios." };
  }

  const response = await fetchAPI('/profile/password', { 
    method: 'PUT', 
    body: JSON.stringify({ currentPassword, newPassword }) 
  });
  
  if (response?.error) return { error: response.error };

  return { success: true };
}
