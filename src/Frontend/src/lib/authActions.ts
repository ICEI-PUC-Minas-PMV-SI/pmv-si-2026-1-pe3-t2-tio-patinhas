"use server";

import { fetchAPI } from "./session";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Todos os campos são obrigatórios." };
  }

  const response = await fetchAPI('/auth/register', { 
    method: 'POST', 
    body: JSON.stringify({ name, email, password }) 
  });

  if (response?.error) {
    return { error: response.error };
  }

  if (!response?.token) {
    return { error: "Token não retornado pela API." };
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 dia
  const cookieStore = await cookies();
  cookieStore.set("session", response.token, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });

  return { success: true };
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Todos os campos são obrigatórios." };
  }

  const response = await fetchAPI('/auth/login', { 
    method: 'POST', 
    body: JSON.stringify({ email, password }) 
  });

  if (response?.error) {
    return { error: response.error };
  }

  if (!response?.token) {
    return { error: "Token não retornado pela API." };
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 dia
  const cookieStore = await cookies();
  cookieStore.set("session", response.token, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });

  return { success: true };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
