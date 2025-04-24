import React from "react";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { EmprestimoDef } from "@/services/user.service";

const Conteudo = ({ formData }: { formData: EmprestimoDef }) => {
  return (
    <div className="flex flex-col justify-start items-start">
      <h2 className="text-xl font-bold mb-4">Garantias associadas</h2>
      <br />

      <h3>Valores retidos </h3>
      {formData.Proponente.ContaVinculadas.length > 0 ? (
        <div className="flex justify-between items-center  w-[100%]  ">
          <span className="flex flex-col font-bold   w-40 h-30 justify-center items-center shadow-md ">
            {formData.Proponente.ContaVinculadas[0].valor_retido}
            <p className="py-2">Valor retido</p>
          </span>

          <span className="flex flex-col font-bold  w-40 h-30 justify-center items-center shadow-md">
            {formData.Proponente.ContaVinculadas[0].updatedAt.split("T")[0]}
            <p className="py-2">Data de confirmação</p>
          </span>
        </div>
      ) : (
        <>
          {" "}
          <p className="text-blue-500 font-bold">Não foi usada retenção</p>{" "}
          <br />
        </>
      )}
      <br />

      <h3>Guardiões do emprestimo</h3>

      {formData.EmprestimoSolidarios.length > 0 ? (
        <div className="flex justify-between items-center  w-[100%]  ">
          <span className="flex flex-col font-bold   w-40 h-30 justify-center items-center shadow-md ">
            {formData.totalGuardiaos}
            <p className="py-2">Total</p>
          </span>

          <span className="flex flex-col font-bold  w-40 h-30 justify-center items-center shadow-md">
            {formData.totalTaxa}%<p className="py-2">% de garantia</p>
          </span>
        </div>
      ) : (
        <>
          {" "}
          <p className="text-blue-500 font-bold">
            Nenhum guardião encontrado
          </p>{" "}
          <br />
        </>
      )}

      <div className="py-4">
        <Link
          href={`/dashboard/proponente/${formData.id}`}
          className="px-6 py-2 bg-gray-500  text-white rounded"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default Conteudo;
/*

 <div className="flex flex-col justify-start items-start" >
            <h3>Angelino Francisco</h3>
            <br />

            <h3>Histórico de créditos </h3>
            <div className="flex justify-between items-center  w-[100%]  ">
                <span className="flex flex-col font-bold   w-40 h-30 justify-center items-center shadow-md ">
                    0
                    <p className="py-2" >Solicitações</p>
                </span>

                <span className="flex flex-col font-bold  w-40 h-30 justify-center items-center shadow-md">
                    0
                    <p className="py-2" >Reembolsos</p>
                </span>
            </div>
            <br />

            <h3>Negociações precedentes</h3>
            <div className="flex justify-between items-center  w-[100%]  ">
                <span className="flex flex-col font-bold   w-40 h-30 justify-center items-center shadow-md ">
                    0
                    <p className="py-2" >Satisfeitos</p>
                </span>

                <span className="flex flex-col font-bold  w-40 h-30 justify-center items-center shadow-md">
                    0
                    <p className="py-2" >Insatisfeitos</p>
                </span>
            </div>
            <Link href="/dashboard/proponente/3" className="px-4 py-2 bg-gray-500  text-white rounded" >
                    Voltar
            </Link>
        </div>

*/
