"use server";

import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function buscarUser(email: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/usuario?email=${email}`
  );
  if (!response.ok) {
    console.log("Usuário não encontrado");
    return redirect("/");
  }
  return response.json();
}

export async function buscarUserQuery(query: any) {
  if (!query || typeof query !== "string") {
    return redirect("/dashboard");
  }

  const response = await fetch(
    `${process.env.CLIENT_URL}/api/usuario/${query}`
  );

  return response.json();
}

export async function buscarPessoa(id: any) {
  const response = await fetch(`${process.env.CLIENT_URL}/api/pessoa/${id}`);
  if (!response.ok) {
    console.log("Dados não encontrados");
    return redirect("/");
  }
  return response.json();
}

export async function hashPassword(password: string) {
  const saltRounds = 12; // Definir número de rounds (quanto maior, mais seguro, mas mais lento)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function converterString(value: any) {
  if (!isNaN(value)) {
    return parseInt(value, 10);
  } else if (typeof value === "string") {
    return parseInt(value, 10);
  }
  return value; // já é número ou não é conversível
}

export async function convidarSolidario(formData: any) {

  const res = await fetch(`${process.env.CLIENT_URL}/api/pessoa/solidario`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log("Error ao convidar");
    return redirect("/dashboard");
  }
  return res.json();
}


export async function buscarGuardiao(id: any) {
  const response = await fetch(`${process.env.CLIENT_URL}/api/pessoa/solidario/${id}`);
  if (!response.ok) {
    console.log("Dados não encontrados");
    return redirect("/dashboard");
  }
  return response.json();
}