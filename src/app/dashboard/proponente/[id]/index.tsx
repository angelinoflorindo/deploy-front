
import React from "react";
import styles from "@/modules/Login.module.css"
import global from "@/modules/global.module.css"
import Image from "next/image";
import Link from "next/link";
import { EmprestimoDef } from "@/services/user.service";

const Detalhes = ({data, retorno}:{data:EmprestimoDef; retorno:any}) => {


    return (

        <div className="flex flex-col justify-center items-center " >
            <h1 className="font-bold text-center">{data.Proponente.User.primeiro_nome} {" "} {data.Proponente.User.segundo_nome}</h1>

            <section className="shadow-md p-5 w-[100%]" >
                <div className="flex flex-row justify-between py-2 ">
                    <div className="flex flex-col" >
                        <div className="bg-gray-100 w-30 h-15 flex justify-center  items-center " >
                            <b>{data.valor},00kz</b>
                        </div>

                        <div className="py-2 flex flex-col justify-center  items-center" >
                            <span>Prestações </span>
                            <h3> <b>{data.prestacao}</b> </h3>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between p-3   items-center " >
                        <span><b>{data.juro}%</b> mensal</span>

                        <div className="flex flex-col    justify-center  items-center" >
                            <span>Prazo </span>
                            <h3> <b>{data.prazo.split("T")[0]}</b>  </h3>
                        </div>

                    </div>

                </div>
                <span>
                    {}
                </span>

                <hr className={styles.divider} />

                <h2 className="text-center" > Meu retorno </h2>
                <div className="flex flex-row justify-between py-2" >
                    <Link href={`/dashboard/proponente/${data.id}/avaliacao`}><Image src="/img/avaliacao.png" alt="imagem" className={global.footerImagem} width={30} height={30} /></Link>
                    <div className="bg-gray-100  w-30 h-15  font-bold flex rounded justify-center  items-center " >
                        {retorno},00kz
                    </div>
                    <Link href={`/dashboard/proponente/${data.id}/protecao`} ><Image src="/img/protecao.png" alt="imagem" className={global.footerImagem} width={30} height={30} /></Link>
                </div>
            </section>
            <div className="flex justify-between p-2 w-[80%]" >
                <Link href={`/dashboard/proponente/${data.id}/negocear`} className="px-4 py-2 bg-gray-500  text-white rounded" >
                    Negocear
                </Link>
                <Link href={`/dashboard/proponente/${data.id}/conceder`} className="px-4 py-2 bg-violet-500  text-white rounded" >
                    Avançar
                </Link>
            </div>
        </div>
    );
};

export default Detalhes;
