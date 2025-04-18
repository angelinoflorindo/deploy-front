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

export async function buscarContaByUser(id: any) {
  const response = await fetch(`${process.env.CLIENT_URL}/api/pessoa/${id}`);
  if (!response.ok) {
    console.log("Dados não encontrados");
    return redirect("/");
  }
  return response.json();
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
    redirect("/dashboard/credito/decima");
  }
  return res.json();
}

export async function buscarGuardiao(id: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/pessoa/solidario/${id}`
  );
  return response.json();
}

export async function uploadDocumento(data: FormData) {
  const formData = new FormData();
  const files = data.getAll("scanner") as File[];
  const titulo = data.get("titulo");

  files.forEach((file) => formData.append("file", file));

  const res = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  return res;
}

export async function carregarConta(_prevState: any, formData: FormData) {
  const userId = formData.get("user_id");

  // Aqui você insere o pagamento no banco de dados

  formData.append("tipo", "DEPOSITO");
  formData.append("titulo", "carregamento da carteira digital");
  formData.append("user_id", `${userId}`);

  const files = formData.getAll("scanner") as File[];

  if (files.length === 0 || files[0].size === 0) {
    return redirect("/ferramenta/cartao/depositar");
  }

  const res = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.log("Erro ao anexar comprovativo!");
    return redirect("/ferramenta/cartao/depositar");
  }

  const deposito = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/depositar`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, valor: formData.get("valor") }),
    }
  );

  if (!deposito.ok) {
    return redirect("/ferramenta");
  }
  return redirect("/ferramenta/cartao");

  //  await new Promise((res) => setTimeout(res, 2000)); // simula delay
}

export async function vincluarConta(_prevState: any, formData: FormData) {
  const userId = formData.get("user_id");

  formData.append("tipo", "DEPOSITO");
  formData.append("titulo", "Depósito de retenção");
  formData.append("user_id", `${userId}`);

  const files = formData.getAll("scanner") as File[];

  if (files.length === 0 || files[0].size === 0) {
    return redirect("/dashboard/emprestimo/vinculado");
  }

  const res = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.log("Erro ao anexar comprovativo!");
    return redirect("/dashboard/emprestimo/vinculado");
  }

  const vincular = await fetch(`${process.env.CLIENT_URL}/api/operacao/vincular`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, valor: formData.get("valor") }),
  });

  if (!vincular.ok) {
    return redirect("/dashboard/emprestimo/vinculado");
  }

  return redirect("/dashboard/emprestimo/solicitar");
}


export async function buscarPropostasOpProponente(proponenteId:any, rules:any){
  
  const conditions:any = {}
  if(rules.pageE) conditions.page = rules.pageE | 1
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo?page=${conditions.page}&proponente=${proponenteId}&limit=5&pendencia=false`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status, text);
    return;
  }
  
  return res.json()
}

export async function buscarEmprestimoById(id:any){
  
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/${id}`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status, text);
    return;
  }
  
  return res.json()
}

export async function diversificarEmprestimo(_prevState: any, formData: FormData){
  
  return
}

export async function sacarFundos(_prevState: any, formData: FormData) {
  const fundos = await fetch(`${process.env.CLIENT_URL}/api/operacao/sacar`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user_id: formData.get("user_id"),
      valor: formData.get("valor"),
      taxa: formData.get("taxa"),
    }),
  });

  if (!fundos.ok) {
    return redirect("/ferramenta/cartao/sacar");
  }
  return redirect("/ferramenta");
}

export async function submitCredito(_prevState: any, formData: FormData) {
  const fundos = await fetch(`${process.env.CLIENT_URL}/api/operacao/sacar`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user_id: formData.get("user_id"),
      valor: formData.get("valor"),
      taxa: formData.get("taxa"),
    }),
  });

  if (!fundos.ok) {
    return redirect("/ferramenta/cartao/sacar");
  }
  return redirect("/ferramenta");
}

export async function submitEmprestimo(_prevState: any, formData: FormData) {
  
  
  
  const fundos = await fetch(`${process.env.CLIENT_URL}/api/proponente/emprestimo`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user_id: formData.get("user_id"),
      valor: formData.get("valor"),
      juro: formData.get("juro"),
      prazo:formData.get("prazo"),
      prestacao:formData.get("prestacao"),
      progresso:'PENDENTE',
      guardiao:formData.get("guardiao")

    }),
  });

  if (!fundos.ok) {
    return redirect("/dashboard/emprestimo/solicitar");
  }
  return redirect("/dashboard");
}

export async function efectuarReclamacao(_prevState: any, formData: FormData) {
  const res = await fetch(`${process.env.CLIENT_URL}/api/usuario/reclamacao`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      assunto: formData.get("assunto"),
      conteudo: formData.get("conteudo"),
      user_id: formData.get("user_id"),
    }),
  });
  if (!res.ok) {
    return redirect("/ferramenta/reclamacao");
  } else {
    return redirect("/ferramenta");
  }
}

// utils/cardGenerator.ts
export async function gerarNumeroCartao() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 dígitos
}

export async function gerarCodigoCartao() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 dígitos
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


export async function validarEstado(value: any) {
  if (value === 'true' || value ===true) {
    return true
  } 
  return false; // já é número ou não é conversível
}

// Tentendo criar funções automáticas

