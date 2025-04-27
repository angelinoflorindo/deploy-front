"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NegociarEmprestimoProps } from "@/services/user.service";
import {
  aceitarNegociar,
  buscarPropostaEmprestimoById,
  rejeitarNegociar,
} from "@/app/actions/auth";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Conteudo = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { data: session, status } = useSession();
  const [negoData, setNegoData] = useState<NegociarEmprestimoProps>({
    valor:undefined,
    createdAt:undefined,
    emprestimo_id:undefined,
    juro:undefined,
    investidor_id:undefined,
    prazo:undefined,
    updatedAt:undefined,
    user_id:undefined,
    prestacao:undefined,
    estado:true,
    pendencia:true,
    extensao:undefined,
    Investidor:{
      id: undefined,
      user_id: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined
      }
    }
  });
  const fetchData = async () => {
    if (session?.user.email) {
      const res = await buscarPropostaEmprestimoById(id, session?.user.email);
      setNegoData(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }
  }, [id]);
  async function aceitarProposta() {
    await aceitarNegociar(negoData);
  }

  async function rejeitarProposta() {
    await rejeitarNegociar(negoData);
  }
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Mais detalhes</h1>
      <div className="flex flex-col justify-center items-start p-4 mb-6 shadow-md w-[100%]">
        <span className="flex flex-row justify-start">
          <p className="font-bold">Investidor: </p>{" "}
          {negoData.Investidor.User.primeiro_nome}{" "}
          {negoData.Investidor.User.segundo_nome}
        </span>
        <div className="flex flex-row justify-between items-center w-[100%]">
          <span className="flex flex-row justify-start">
            <p className="font-bold">Juros:</p> {negoData.juro}%
          </span>
          <span className="flex flex-row justify-start">
            <p className="font-bold">valor:</p> {negoData.valor},00kz
          </span>
        </div>
        <div className="flex flex-row justify-between items-center w-[100%] mb-4">
          <span className="flex flex-row justify-start">
            <p className="font-bold">Prazo:</p> {negoData.prazo.split("T")[0]}
          </span>
          <span className="flex flex-row justify-start">
            <p className="font-bold">Prestação:</p>
            {negoData.prestacao}
          </span>
        </div>
        <div>
          <p className="font-bold mb-2">Decidir sobre a negociação</p>

          <div className="flex flex-row justify-between items-center w-[100%]">
            <span>
              <button
                onClick={rejeitarProposta}
                className=" px-2 py-2 bg-red-500  text-white rounded cursor-pointer"
              >
                Rejeitar
              </button>
            </span>
            <span>
              <button
                onClick={aceitarProposta}
                className="px-2 py-2 bg-violet-500  text-white rounded cursor-pointer"
              >
                Aceitar
              </button>
            </span>
          </div>
        </div>
      </div>
      <Link
        href="/dashboard/historico"
        className="px-5 py-3 my-4 bg-gray-500 text-white rounded"
      >
        Voltar
      </Link>
    </div>
  );
};

export default Conteudo;
