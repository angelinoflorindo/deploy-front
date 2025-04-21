/** DESAFIO DA PÁGINA
 * Apresentar informações acopladas num único local
 */

import React from "react";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { NegociarEmprestimoProps } from "@/services/user.service";

const Conteudo = ({ negoData }: { negoData: NegociarEmprestimoProps[] }) => {
  return (
    <div>
      <div className="flex justify-start items-center">
        <h1 className="text-xl font-bold mb-4">Listagem de históricos</h1>

        {/* <Image src="/img/relatorio.png" width={20} height={20} alt="" /> */}
      </div>
      {/* RESOLVENDO OS DESAFIOS */}
      <div>
        {/*BUSANDO AS NEGOCIAÇÕES INVESTIDOR - EMPRESTIMO */}
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
      </div>
    </div>
  );
};

export default Conteudo;
