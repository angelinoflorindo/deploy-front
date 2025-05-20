/** DESAFIO DA PÁGINA
 * Apresentar informações acopladas num único local
 */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  NegociarEmprestimoProps,
  SolidarioFace,
  UserInfo,
} from "@/services/user.service";
import styles from "@/modules/Login.module.css";
import {
  aceitarSolidario,
  buscarPropostaInvestidor,
  buscarSolidarios,
  buscarUser,
  rejeitarSolidario,
} from "@/app/actions/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Conteudo = () => {
  const { data: session, status } = useSession();
  const [negoData, setNegoData] = useState<NegociarEmprestimoProps[]>([]);
  const [formData, setFormData] = useState<SolidarioFace>({
    id: undefined,
    parentesco: undefined,
    taxa: undefined,
    user_id: undefined,
    tipo: undefined,
    pessoa_id: undefined,
    updatedAt: undefined,
    createdAt: undefined,
    User: {
      id: undefined,
      primeiro_nome: undefined,
      segundo_nome: undefined,
      email: undefined,
      Investidor: {
        id: undefined,
        maior_risco: false,
        maior_seguranca: false,
        saque_antecipado: false,
        fundo_protegido: false,
        partilhar_emprestimo: false,
        estado: false,
        user_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Pessoa: {
        id: undefined,
        estado_civil: undefined,
        provincia: undefined,
        municipio: undefined,
        profissao: undefined,
        user_id: undefined,
        emprego_id: undefined,
        residencia_id: undefined,
        nivel_instrucao: undefined,
        data_nascimento: undefined,
      },
    },
  });
  const [users, setUser] = useState<UserInfo>({
    id: "",
    bilhete: "",
    email: "",
    genero: "",
    password: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    Carteira: {
      id: "",
      codigo: "",
      createdAt: "",
      numero: "",
      saldo: "",
      updatedAt: "",
      user_id: "",
    },
    Depositos: {
      id: "",
      user_id: "",
      estado: true,
      pendencia: true,
      createdAt: "",
      updatedAt: "",
      valor: "",
    },
    Devedor: {
      id: "",
      estado: true,
      inadimplencia: "",
      adimplencia: "",
      solicitacao: "",
      updatedAt: "",
      createdAt: "",
      user_id: "",
    },
    Investidor: {
      id: undefined,
      maior_risco: false,
      maior_seguranca: false,
      saque_antecipado: false,
      fundo_protegido: false,
      partilhar_emprestimo: false,
      estado: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Diversificacaos: [],
    },
    Documentos: {
      id: undefined,
      tipo: undefined,
      titulo: undefined,
      nome_salvado: undefined,
      nome_original: undefined,
      extensao: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
    },
    Papel: {
      id: undefined,
      perfil: undefined,
    },
    Pessoa: {
      id: undefined,
      estado_civil: undefined,
      provincia: undefined,
      municipio: undefined,
      profissao: undefined,
      user_id: undefined,
      emprego_id: undefined,
      residencia_id: undefined,
      nivel_instrucao: undefined,
      data_nascimento: undefined,
      Conjugue: {
        id: undefined,
        nome_completo: undefined,
        nivel_instrucao: undefined,
        dependentes: undefined,
        data_nascimento: undefined,
      },
      Emprego: {
        id: undefined,
        data_inicio: undefined,
        sector: undefined,
        cargo: undefined,
        area: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Residencia: {
        id: undefined,
        tipo: undefined,
        data_inicio: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Conta: {
        id: undefined,
        nome: undefined,
        iban: undefined,
        salario: undefined,
        emprego_id: undefined,
        pessoa_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      User: {
        id: undefined,
        email: undefined,
      },
    },
    Proponente: {
      id: undefined,
      solicitacao: undefined,
      reembolsar: undefined,
      satisfeitos: undefined,
      insatisfeitos: undefined,
      estado: false,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Emprestimos: [],
    },
    Reclamacaos: {
      id: undefined,
      assunto: undefined,
      conteudo: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    Saque: {
      id: undefined,
      taxa: undefined,
      valor: undefined,
      estado: true,
      pendencia: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
  });
  const router = useRouter();
  const fetchs = async () => {
    const user: UserInfo = await buscarUser(session?.user.email);
    setUser(user);
  };

  const buscaProposta = async () => {
    const result = await buscarPropostaInvestidor(session?.user.email);
    setNegoData(result);
  };

  const buscaSolidario = async () => {
    const res = await buscarSolidarios(session?.user.email);
    setFormData(res);
  };
  useEffect(() => {
    if(session?.user.email){
    fetchs()
    }
  }, []);

  useEffect(() => {
    if (session?.user.email) {
      buscaProposta();
    }
  }, []);

  useEffect(() => {
    if (session?.user.email) {
      buscaSolidario();
    }
  }, []);

  console.log("resultados", negoData)
  const onAccept = async () => {
    const info = {
      solidario: formData.pessoa_id,
      user: formData.user_id,
      tipo: formData.tipo,
    };
    await aceitarSolidario(info);

    window.location.reload();
  };

  const onReject = async () => {
    await rejeitarSolidario(formData.id);

    window.location.reload();
  };

  if (users && users.id && (!users.Pessoa || !users.Investidor)) {
    return (
      <div >
        <div className="flex flex-col">
            <div className="bg-red-100 text-red-700 p-3 rounded shadow-md mb-4">
              (*) Sem informações Pessais!
            </div>

            <div className="bg-red-100 text-red-700 p-3 rounded shadow-md mb-4">
              (*) Pefil de Investidor indefinido!
            </div>

            <button 
              onClick={() => {
                router.push("/ferramenta/");
              }}
              className="px-4 py-2 bg-blue-500 text-white w-[40%] rounded"
            >
              Voltar
            </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-start items-center">
        <h1 className="text-xl font-bold mb-4">Listagem de históricos</h1>

        {/* <Image src="/img/relatorio.png" width={20} height={20} alt="" /> */}
      </div>

      {/* RESOLVENDO OS DESAFIOS */}

      {/*BUSANDO PEDIDOS DE GUARDIÃO FEITOS POR PROPONENTES*/}

      {formData && formData.User && formData.User.id ? (
        <div className="flex flex-col p-4 h-50 shadow-md w-[100%]">
          <div className="mb-2 flex flex-col">
            <span className="font-bold">Pedido de guardião</span>
            <span className="py-1">
              {" "}
              <b>Proponente</b> {formData.User.primeiro_nome}{" "}
              {formData.User.segundo_nome}
            </span>
            <span className="py-1">
              <b>Taxa de cobertura:</b> {formData.taxa}%
            </span>
            <span className="py-1">
              <b>Categoria:</b> {formData.tipo}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <button
              onClick={onReject}
              className="px-4 py-2 bg-red-500 text-white rounded  cursor-pointer"
            >
              rejeitar
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-violet-500 text-white rounded  cursor-pointer"
            >
              aceitar
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* RESOLVENDO OS DESAFIOS */}
      <div>
        {/*BUSANDO AS NEGOCIAÇÕES INVESTIDOR - EMPRESTIMO */}
        {negoData.length > 0 ? (
          <>
            {negoData.map((data) => (
              <Link
                href={`/dashboard/historico/${data.investidor_id}/negociar`}
                key={data.investidor_id}
                className="flex flex-col px-4 py-2 h-24 shadow-md w-[100%]"
              >
                <span className="font-bold">Negociação de emprestimos</span>
                <span className="py-1">{data.juro}% mensal</span>
                <span>{data.valor},00kz</span>
              </Link>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Conteudo;
