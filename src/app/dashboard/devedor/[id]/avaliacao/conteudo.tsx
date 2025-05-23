'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CreditoDef } from "@/services/Credito.service";
import { useParams, useRouter } from "next/navigation";
import { buscarCreditoById } from "@/app/actions/auth";

const Conteudo = () => {

  const params = useParams();
  const id = params.id;
    const [formData, setFormData] = useState<CreditoDef>({
      id: undefined,
      juro: undefined,
      estado: false,
      prazo: undefined,
      totalTaxa: "",
      pendencia: undefined,
      prestacao: undefined,
      progresso: undefined,
      totalGuardiaos: 0,
      user_id: undefined,
      valor: undefined,
      devedor_id: undefined,
      updatedAt: undefined,
      createdAt: undefined,
      taxaDiversificada: undefined,
      CreditoSolidarios: [],
      Devedor: {
        id: undefined,
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
        DebitoVinculados: [],
      },
    });

    const router =useRouter()
    const fetchData = async ()=>{

      const result:CreditoDef = await buscarCreditoById(id)
      setFormData(result)
    }

    useEffect(()=>{
      fetchData()
    },[])

    useEffect(() => {
      if (!id) {
        console.error('ID inválido');
        router.push("/")
        return  
      }
    }, [id]);
  return (
    <div className="flex flex-col justify-start items-start">
      <h2 className="text-xl font-bold mb-4">Garantias associadas</h2>
      <br />

      <h3>Valores retidos </h3>
      {formData.Devedor?.DebitoVinculados?.length > 0 ? (
        <div className="flex justify-between items-center  w-[100%]  ">
          <span className="flex flex-col   w-40 h-30 justify-center items-center shadow-md ">
            <b>{formData.Devedor.DebitoVinculados[0].valor_retido}</b>
            <small className="py-2">Valor retido</small>
          </span>

          <span className="flex flex-col  w-40 h-30 justify-center items-center shadow-md">
            <b>{formData.Devedor.DebitoVinculados[0].updatedAt ? (formData.Devedor.DebitoVinculados[0].updatedAt.split("T")[0]):(<></>)}</b>
            <small className="py-2">Data de confirmação</small>
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

      <h3>Guardiões do crédito</h3>

      {formData.CreditoSolidarios.length > 0 ? (
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
          href={`/dashboard/devedor/${formData.id}`}
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
