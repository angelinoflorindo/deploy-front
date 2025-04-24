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

const url = clientAPI;
const Conteudo = ({
  negoData,
  formData,
}: {
  negoData: NegociarEmprestimoProps[];
  formData: SolidarioFace;
}) => {

  const [pessoa, setPessoa] = useState('')
  const [user, setUser] = useState('')
  const [tipo, setTipo] = useState('')

  useEffect(()=>{
    if(formData){
      setPessoa(formData.pessoa_id)
      setUser(formData.user_id)
      setTipo(formData.tipo)
    }
  }, [])
  function aceitarSolidario() {
    fetch(`${url}/api/pessoa/solidario/${formData.id}`, { method: "PUT" , 
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({ pessoa_id:pessoa, user_id:user, tipo:tipo })
    });

    window.location.reload()
  }

  function rejeitarSolidario() {
    fetch(`${url}/api/pessoa/solidario/${formData.id}`, { method: "DELETE"});

    window.location.reload()
  }



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
              onClick={rejeitarSolidario}
              className="px-4 py-2 bg-red-500 text-white rounded  cursor-pointer"
            >
              rejeitar
            </button>
            <button
              onClick={aceitarSolidario}
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
