import React from "react";
import styles from "@/modules/Login.module.css";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { EmprestimoDef } from "@/services/user.service";
import { CreditoDef } from "@/services/Credito.service";

const Detalhes = ({ data, retorno }: { data: CreditoDef; retorno: any }) => {
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
                <b>{data.prazo.split("T")[0]}</b>{" "}
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
