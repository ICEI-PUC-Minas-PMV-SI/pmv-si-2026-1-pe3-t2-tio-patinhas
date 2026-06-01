"use server";

import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

// Lida apenas com a leitura do cookie para uso do Next.js
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  
  try {
    // Decodifica apenas para ler dados da sessão localmente
    const payload = decodeJwt(session);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const res = NextResponse.next();
  // Idealmente, a renovação do token seria feita pela API.
  // Para simplificar no frontend, apenas atualizamos a expiração do cookie.
  res.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  return res;
}

// Utilitário para fazer chamadas reais à API com o token
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5256";
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      let errorMsg = `Erro na API: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) errorMsg = errorData.error;
      } catch (e) {}
      return { error: errorMsg };
    }

    if (response.status === 204) return { success: true };

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: error.message || 'Erro de conexão com a API' };
  }
}
