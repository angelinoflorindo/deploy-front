/** DESAFIO DA PÁGINA
 * Apresentar informações acopladas num único local
 */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  NegociarEmprestimoProps,
  SolidarioFace,
} from "@/services/user.service";
import { clientAPI } from "@/app/lib/definitions";
import {
  aceitarSolidario,
  buscarPropostaInvestidor,
  buscarSolidarios,
  rejeitarSolidario,
} from "@/app/actions/auth";
import { useSession } from "next-auth/react";

const url = clientAPI;
const Conteudo = () => {
  const { data: session, status } = useSession();
  const [pessoa, setPessoa] = useState("");
  const [user, setUser] = useState("");
  const [tipo, setTipo] = useState("");
  const [negoData, setNegoData] = useState<NegociarEmprestimoProps[]>([]);
  const [formData, setFormData] = useState<SolidarioFace>({
    id:undefined,
    parentesco:undefined,
    taxa:undefined,
    user_id:undefined,
    tipo:undefined,
    pessoa_id:undefined,
    updatedAt:undefined,
    createdAt:undefined,
    User:{
      id: undefined,
      primeiro_nome: undefined,
      segundo_nome: undefined,
      password: undefined,
      email: undefined,
      bilhete: undefined,
      telemovel: undefined,
      genero: undefined
    }
  });

  const fetchData = async () => {
    if (session?.user.email) {
      const result = await buscarPropostaInvestidor(session?.user.email);
      const res = await buscarSolidarios(session?.user.email);
      setNegoData(result);
      setFormData(res);
    }
  };

  useEffect(() => {
    fetchData;
  }, []);
  useEffect(() => {
    if (formData) {
      setPessoa(formData.pessoa_id);
      setUser(formData.user_id);
      setTipo(formData.tipo);
    }
  }, []);
  const onAccept = async () => {
    const info = {
      solidario: pessoa,
      user: user,
      tipo: tipo,
    };
   await aceitarSolidario(info);
 
    window.location.reload();
  };

  const onReject = async () => {
    await rejeitarSolidario(formData.id);
  
    window.location.reload();
  };

  return (
    <div>
      <div className="flex justify-start items-center">
        <h1 className="text-xl font-bold mb-4">Listagem de históricos</h1>

        {/* <Image src="/img/relatorio.png" width={20} height={20} alt="" /> */}
      </div>

      {/* RESOLVENDO OS DESAFIOS */}

      {/*BUSANDO PEDIDOS DE GUARDIÃO FEITOS POR PROPONENTES*/}

      {formData ? (
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
        {negoData.length ? (
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
