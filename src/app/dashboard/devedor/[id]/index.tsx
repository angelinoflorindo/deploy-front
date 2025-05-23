'use client';
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { CreditoDef } from "@/services/Credito.service";
import { buscarCreditoById, calcularJurosCompostos } from "@/app/actions/auth";
import { useParams, useRouter } from "next/navigation";

const Detalhes = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter()
  const [data, setData] = useState<CreditoDef>({
    id:undefined,
    juro:undefined,
    estado:false,
    prazo:undefined,
    totalTaxa:"",
    pendencia:undefined,
    prestacao:undefined,
    progresso:undefined,
    totalGuardiaos:0,
    user_id:undefined,
    valor:undefined,
    devedor_id:undefined,
    updatedAt:undefined,
    createdAt:undefined,
    taxaDiversificada:undefined,
    CreditoSolidarios:[],
    Devedor:{
      id: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined
      },
      DebitoVinculados: []
    }
  });
  const [retorno, setRetorno] = useState(0);

  const fetchData = async () => {
    const result: CreditoDef = await buscarCreditoById(id);
    const response = await calcularJurosCompostos(result.valor,(result.juro - 2) / 100,3);
    setRetorno(response);
    setData(result);
  };

      useEffect(() => {
        if (!id) {
          console.error('ID inválido');
          router.push("/")
          return  
        }
      }, [id]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="font-bold text-center">
        {data.Devedor.User.primeiro_nome} {data.Devedor.User.segundo_nome}
      </h1>

      <section className="shadow-md p-5 w-[100%]">
        <div className="flex flex-row justify-between py-2 ">
          <div className="flex flex-col">
            <div className="bg-gray-100 w-30 h-15 flex justify-center  items-center ">
              <b>{data.valor},00kz</b>
            </div>

            <div className="py-2 flex flex-col justify-center  items-center">
              <span>Prestações </span>
              <h3>
                {" "}
                <b>{data.prestacao}</b>/ <b>{data.prestacao}</b> dias{" "}
              </h3>
            </div>
          </div>
          <div className="flex flex-col justify-between p-3   items-center ">
            <span>
              Juros: <b>{data.juro}%</b>
            </span>

            <div className="flex flex-col    justify-center  items-center">
              <span>Prazo </span>
              <h3>
                {" "}
                <b>{data.prazo ? (data.prazo.split("T")[0]):(<></>)}</b>{" "}
              </h3>
            </div>
          </div>
        </div>
        <span>{}</span>

        <hr className={styles.divider} />

        <div className="flex flex-row justify-between items-center py-2">
          <Link href={`/dashboard/devedor/${data.id}/avaliacao`}>
            <Image
              src="/img/avaliacao.png"
              alt="imagem"
              className={global.footerImagem}
              width={30}
              height={30}
            />
          </Link>

          <div>
            <h2 className="text-center"> Meu retorno </h2>
            <div className="bg-gray-100  w-30 h-15  font-bold flex rounded justify-center  items-center ">
              {retorno},00kz
            </div>
          </div>
          {/*
          <Link href={`/dashboard/devedor/${data.id}/protecao`}>
            <Image
              src="/img/protecao.png"
              alt="imagem"
              className={global.footerImagem}
              width={30}
              height={30}
            />
          </Link>
          */}
        </div>
      </section>
      <Link
        href={`/dashboard/devedor/${data.id}/conceder`}
        className="px-4 py-2 bg-violet-500  text-white rounded"
      >
        Avançar
      </Link>
    </div>
  );
};

export default Detalhes;

/*

  <Link href={`/dashboard/proponente/${data.id}/negocear`} className="px-4 py-2 bg-gray-500  text-white rounded" >
                    Negocear
                </Link>
*/
