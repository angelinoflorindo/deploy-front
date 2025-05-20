"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { NegociarEmprestimoProps } from "@/services/user.service";

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
    return null;
  }
  return res.json();
}

export async function buscarGuardiao(id: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/pessoa/solidario/${id}`
  );
  return response.json();
}

export async function buscarSolidarios(email: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/pessoa/solidario?email=${email}`
  );
  return response.json();
}

export async function buscarPropostaInvestidor(email: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/negocear?email=${email}`
  );
  return response.json();
}

export async function buscarPagamentoByDev(id: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/pagar/${id}`
  );
  return response.json();
}

export async function buscarReembolsoByProp(id: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/reembolsar/${id}`
  );
  return response.json();
}

export async function buscarInvestidor(id: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/pessoa/investidor/${id}`
  );
  return response.json();
}

export async function buscarPropostaEmprestimoById(
  investidorId: any,
  email: any
) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/negocear/detalhes?email=${email}&investidorId=${investidorId}`
  );
  return response.json();
}

// Funções de aceitação ou rejeição de propostas de emprestimos pelo proponente

export async function aceitarNegociar(data: NegociarEmprestimoProps) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/negocear/detalhes/${data.emprestimo_id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    console.log("Falha ao rejeitar proposta");
    return redirect(`/dashboard/historico/${data.investidor_id}/negociar`);
  }

  return redirect(`/dashboard/historico/`);
}

export async function confirmarNegociacao(emprestimoId: any) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/negocear/detalhes/${emprestimoId}`
  );

  if (!response.ok) {
    console.log("Erro tentar buscar diversificação");
    return redirect("/dashboard/proponente");
  }
  return response.json();
}

export async function rejeitarNegociar(data: NegociarEmprestimoProps) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/negocear/detalhes/${data.investidor_id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ emprestimoId: data.emprestimo_id }),
    }
  );

  if (!response.ok) {
    console.log("Falha ao rejeitar proposta");
    return redirect(`/dashboard/historico/${data.investidor_id}/negociar`);
  }

  return redirect(`/dashboard/historico/`);
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
export async function carregarConta(formData: FormData) {
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

export async function vincularConta(formData: FormData) {
  const userId = formData.get("user_id");

  formData.append("tipo", "DEPOSITO");
  formData.append("titulo", "Depósito de retenção");

  const files = formData.getAll("scanner") as File[];

  if (files.length === 0 || files[0].size === 0) {
    return redirect("/dashboard/emprestimo/vinculado");
  }


  const vincular = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/vincular`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, valor: formData.get("valor") }),
    }
  );

  const res = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!vincular.ok || !res.ok) {
    console.log("Erro ao anexar comprovativo!");
    return redirect("/dashboard/emprestimo/vinculado");
  }

  return redirect("/dashboard/emprestimo/solicitar");
}

export async function submitDetalhes(formData: FormData) {
  const dataSend = {
    nome: formData.get("nome"),
    iban: formData.get("iban"),
    salario: formData.get("salario"),
    emprego_id: formData.get("empregoId"),
    pessoa_id: formData.get("pessoaId"),
  };

  const pessoaData = await buscarPessoa(dataSend.pessoa_id);

  formData.append("tipo", "DECLARACAO_TRABALHO");
  formData.append("titulo", "Documentos financeiros");
  formData.append("user_id", `${formData.get("userId")}`);
  const files = formData.getAll("scanner") as File[];

  if (!files || files.length === 0) {
    return redirect("/ferramenta/detalhes");
  }

  if (pessoaData.Conta) {
    const update = await fetch(
      `${process.env.CLIENT_URL}/api/pessoa/conta/${pessoaData.Conta.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataSend),
      }
    );

    if (!update.ok) {
      return redirect(`/ferramenta/detalhes/${pessoaData.id}`);
    }
  } else {
    const create = await fetch(`${process.env.CLIENT_URL}/api/pessoa/conta`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataSend),
    });

    if (!create.ok) {
      return redirect(`/ferramenta/detalhes/${pessoaData.id}`);
    }
  }

  const result = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!result.ok) {
    console.log("Erro ao anexar documentos", result.statusText);

    return redirect(`/ferramenta/detalhes/${pessoaData.id}`);
  }
  redirect("/ferramenta/detalhes");
}

// PARTE REZERVADA PARA VINCULAR DÉBITO

export async function vincularDebito(formData: FormData) {
  const userId = formData.get("user_id");
  const returnUrl = formData.get("returnUrl");

  formData.append("tipo", "ORDEM_DEBITO");
  formData.append("titulo", "Débito de retenção");
  //formData.append("user_id", `${userId}`);

  const files = formData.getAll("scanner") as File[];

  if (files.length === 0 || files[0].size === 0) {
    return redirect(`/dashboard/credito/${returnUrl}/vinculado`);
  }

  if (!userId || userId === undefined) {
    return redirect(`/dashboard/credito/${returnUrl}/vinculado`);
  }

  const vincular = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/vincular/debito`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, valor: formData.get("valor") }),
    }
  );
  if (!vincular.ok) {
    console.log("erro vincular", vincular.status);
    return redirect(`/dashboard/credito/${returnUrl}/vinculado`);
  }

  const res = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.log("erro vincular", res.status);
    return redirect(`/dashboard/credito/${returnUrl}/vinculado`);
  }

  return redirect(`/dashboard/credito/${returnUrl}/solicitar`);
}

export async function buscarPropostasOpDevedor(devedorId: any, rules: any) {
  const conditions: any = {};

  if (rules.pageC) conditions.page = rules.pageC;
  if (devedorId) conditions.devedorId = devedorId;

  conditions.pendencia = true; // QUANDO NINGUÉM AINDA INVESTIU
  conditions.progresso = "CONCLUIDO"; // QUANDO JÁ FOI APROVADO PELO ADMIN

  const res = await fetch(
    `${process.env.CLIENT_URL}/api/devedor/credito?page=${conditions.page}&devedor=${conditions.devedorId}&pendencia=${conditions.pendencia}&progresso=${conditions.progresso}`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status, text);
    return;
  }

  return res.json();
}

export async function buscarPropostasOpProponente(
  proponenteId: any,
  rules: any
) {
  const conditions: any = {};

  if (rules.pageE) conditions.page = rules.pageE;
  if (proponenteId) conditions.proponenteId = proponenteId;
  conditions.pendencia = true; // QUANDO NINGUÉM AINDA INVESTIU
  conditions.progresso = "CONCLUIDO"; // QUANDO JÁ FOI APROVADO PELO ADMIN

  const res = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo?page=${conditions.page}&proponente=${conditions.proponenteId}&pendencia=${conditions.pendencia}&progresso=${conditions.progresso}`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status, text);
    return;
  }

  return res.json();
}

export async function buscarCreditoById(id: any) {
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/devedor/credito/proposta/${id}`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status, text);
    return;
  }

  return res.json();
}

export async function buscarEmprestimoById(id: any) {
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/${id}`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status, text);
    return;
  }

  return res.json();
}

// Buscar por créditos já investidos
export async function buscarCreditoValidadoByEmail(email: any) {
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/investir/credito/?email=${email}`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status);
    return;
  }

  return res.json();
}

export async function buscarEmprestimoValidadoByEmail(email: any) {
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/investir/emprestimo/?email=${email}`
  );

  if (!res.ok) {
    const text = await res.text(); // debug da resposta
    console.error("Erro na API:", res.status);
    return;
  }

  return res.json();
}

export async function diversificarEmprestimo(formData: FormData) {
  const taxa = await converterString(formData.get("taxa"));
  if (taxa === 0) {
    return redirect(
      `/dashboard/proponente/${formData.get("emprestimo_id")}/protecao`
    );
  }

  const res = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        emprestimo_id: formData.get("emprestimo_id"),
        taxa: formData.get("taxa"),
        investidor_id: formData.get("investidor_id"),
      }),
    }
  );

  if (!res.ok) {
    return redirect(
      `/dashboard/proponente/${formData.get("emprestimo_id")}/protecao`
    );
  }

  return redirect(`/dashboard/proponente/${formData.get("emprestimo_id")}`);
}

// Configurar a rota de reembolsar fundos!

export async function reembolsarFundos(formData: FormData) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/reembolsar`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        investUserId: formData.get("investUserId"),
        investidorId: formData.get("investidorId"),
        valor: formData.get("valor"),
        prestacao: formData.get("prestacao"),
        detalhe: formData.get("detalhe"),
        propUserId: formData.get("propUserId"),
        proponenteId: formData.get("proponenteId"),
        emprestimoId: formData.get("emprestimoId"),
      }),
    }
  );

  const investidorId = converterString(formData.get("investidorId"));
  if (!response.ok) {
    return redirect(`/dashboard/emprestimo/${investidorId}`);
  }

  return redirect("/dashboard");
}

// garantir pagamento de créditos
export async function pagarCreditos(formData: FormData) {
  const response = await fetch(`${process.env.CLIENT_URL}/api/operacao/pagar`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      investUserId: formData.get("investUserId"),
      investidorId: formData.get("investidorId"),
      valor: formData.get("valor"),
      prestacao: formData.get("prestacao"),
      detalhe: formData.get("detalhe"),
      devUserId: formData.get("devUserId"),
      devedorId: formData.get("devedorId"),
      creditoId: formData.get("creditoId"),
    }),
  });

  const investidorId = converterString(formData.get("investidorId"));
  if (!response.ok) {
    return redirect(`/dashboard/emprestimo/${investidorId}`);
  }

  return redirect("/dashboard");
}

// Transferir creditos
export async function concederCredito(formData: FormData) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/investir/credito`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: formData.get("userId"),
        investidorId: formData.get("investidorId"),
        valor: formData.get("valor"),
        devUserId: formData.get("devUserId"),
        devedorId: formData.get("devedorId"),
        creditoId: formData.get("creditoId"),
      }),
    }
  );

  if (!response.ok) {
    return redirect("/dashboard/proponente");
  }

  return redirect("/dashboard");
}

// Transferir emprestimos ao proponente

export async function concederEmprestimo(formData: FormData) {
  const response = await fetch(
    `${process.env.CLIENT_URL}/api/operacao/investir/emprestimo`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: formData.get("userId"),
        valor: formData.get("valor"),
        propUserId: formData.get("propUserId"),
        emprestimoId: formData.get("emprestimoId"),
      }),
    }
  );

  if (!response.ok) {
    return redirect("/dashboard/proponente");
  }

  if ((await response.json()) === false) {
    return redirect("/ferramenta/cartao");
  }
  return redirect("/dashboard");
}

export async function sacarFundos(formData: FormData) {
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
  return redirect("/ferramenta/cartao");
}

export async function submitCredito(formData: FormData) {
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

// REZERVADO PARA SOLICITAÇÃO DE CRÉDITOS
export async function solicitarCredito(formData: FormData) {
  const info = {
    user_id: formData.get("user_id"),
    valor: await converterString(formData.get("valor")),
    juro: formData.get("juro"),
    prazo: formData.get("prazo"),
    prestacao: formData.get("prestacao"),
    guardiao: formData.get("guardiao"),
    tipo: formData.get("tipo"),
    duracao: formData.get("duracao"),
  };

  let Data: any = {};

  Data.mesPrazo = new Date(JSON.stringify(info.prazo)).getUTCMonth() + 1;
  Data.date = new Date().toLocaleDateString();
  Data.mesActual = new Date(Data.date).getUTCMonth() + 1;

  const duracaoMes = Data.mesPrazo - Data.mesActual;

  // Controlar o valor solicitado

  if (info.duracao == "30_DIAS") {
    if (info.valor > 50000 || duracaoMes > 2) {
      console.log("Excedeu os limites");
      return redirect(`/dashboard/credito/${info.tipo}/solicitar`);
    }
  }

  if (info.duracao == "60_DIAS") {
    if (info.valor > 150000 || duracaoMes > 3) {
      console.log("Excedeu os limites");
      return redirect(`/dashboard/credito/${info.tipo}/solicitar`);
    }
  }

  if (info.duracao == "90_DIAS") {
    if (info.valor > 250000 || duracaoMes > 4) {
      console.log("Excedeu os limites");
      return redirect(`/dashboard/credito/${info.tipo}/solicitar`);
    }
  }

  const fundos = await fetch(`${process.env.CLIENT_URL}/api/devedor/credito`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (!fundos.ok) {
    return redirect(`/dashboard/credito/${info.tipo}/solicitar`);
  }
  return redirect("/dashboard");
}

export async function submitEmprestimo(formData: FormData) {
  const fundos = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: formData.get("user_id"),
        valor: formData.get("valor"),
        juro: formData.get("juro"),
        prazo: formData.get("prazo"),
        prestacao: formData.get("prestacao"),
        progresso: "PENDENTE",
        guardiao: formData.get("guardiao"),
      }),
    }
  );

  if (!fundos.ok) {
    return redirect("/dashboard/emprestimo/solicitar");
  }
  return redirect("/dashboard");
}

export async function negocearEmprestimo(formData: FormData) {
  const emprestimoId = await converterString(formData.get("emprestimo_id"));

  const fundos = await fetch(
    `${process.env.CLIENT_URL}/api/proponente/emprestimo/proposta/negocear`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        emprestimo_id: emprestimoId,
        user_id: formData.get("user_id"),
        valor: formData.get("valor"),
        juro: formData.get("juro"),
        prazo: formData.get("prazo"),
        prestacao: formData.get("prestacao"),
      }),
    }
  );

  if (!fundos.ok) {
    return redirect(`/dashboard/proponente/${emprestimoId}/negocear`);
  }
  return redirect(`/dashboard/proponente/${emprestimoId}`);
}

export async function efectuarReclamacao(formData: FormData) {
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
  if (value === "true" || value === true) {
    return true;
  }
  return false; // já é número ou não é conversível
}

export async function calcularJurosCompostos(
  principal: any,
  taxa: number,
  prestacao: number
) {
  /* const parcela = await calcularPrestacaoCompostas(principal, taxa, prestacao);
  const montante = parcela * prestacao;
  return Math.round(montante)
  */
  const montante = principal * Math.pow(1 + taxa, prestacao);
  return Math.round(montante);
}

export async function calcularPrestacaoCompostas(
  principal: any,
  taxa: number,
  prestacao: number
) {
  const i = taxa; // taxa já em decimal (ex: 0.05 para 5%)
  const numerador = i * Math.pow(1 + i, prestacao);
  const denominador = Math.pow(1 + i, prestacao) - 1;
  const parcela = principal * (numerador / denominador);

  return Math.round(parcela); // prestação fixa mensal
}

export async function calcularJurosSimples(
  principal: any,
  taxa: number,
  prestacao: number
) {
  const juros = principal * taxa * prestacao;
  const result = Math.round(principal + juros);
  return result;
}

export async function calcularPrestacaoSimples(
  principal: any,
  taxa: number,
  prestacao: number
) {
  const juroMensal = principal * taxa;
  const amortizacao = principal / prestacao;
  const result = Math.round(amortizacao + juroMensal);
  return result;
}

// funções adicionais

export async function aceitarSolidario(data: any) {
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/pessoa/solidario/${data.solidario}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        pessoa_id: data.pessoa,
        user_id: data.user,
        tipo: data.tipo,
      }),
    }
  );
  if (!res.ok) {
    return;
  }
  return res.json();
}

export async function rejeitarSolidario(id: any) {
  const res = await fetch(
    `${process.env.CLIENT_URL}/api/pessoa/solidario/${id}`,
    { method: "DELETE" }
  );
  if (!res.ok) {
    return;
  }
  return res.json();
}
