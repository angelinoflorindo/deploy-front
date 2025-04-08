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

export async function buscarPessoa(id: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/pessoa/${id}`
  );
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

export async function editarUsuario(formData: any) {
  //const picture: File[] = formData.profilePicture
  //const hashPass = await hashPassword(formData.password)

  console.log("userInfo", formData);

  return;
  const usuario = {
    primeiro_nome: formData.primeiro_nome,
    password: formData.password,
    genero: formData.genero,
    email: formData.email,
    bilhete: formData.bilhete,
    segundo_nome: formData.segundo_nome,
    telemovel: formData.telemovel,
  };

  const res = await fetch(`${process.env.CLIENT_URL}/api/usuario`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      //  "X-CSRFToken": csrf
    },
    body: JSON.stringify(usuario),
  });

  if (!res.ok) {
    console.log("Erro ao registro");
    //console.log(res)
    return redirect("/auth/registrar");
  }
  createSession(usuario.email, "user_email");

  return redirect("/dashboard");
}
