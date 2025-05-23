'use client';
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css"
import global from "@/modules/global.module.css"
import Image from "next/image";
import Link from "next/link";
import { EmprestimoDef } from "@/services/user.service";
import { buscarEmprestimoById, calcularJurosSimples } from "@/app/actions/auth";
import { useParams } from "next/navigation";

const Detalhes = () => {
    const params = useParams()
    const id  =params.id
    const [data, setData] = useState<EmprestimoDef>({
        id:undefined,
        pendencia:undefined,
        juro:undefined,
        estado:true,
        Diversificacaos:[],
        EmprestimoSolidarios:[],
        prazo:undefined,
        prestacao:undefined,
        progresso:undefined,
        Proponente:{
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
            ContaVinculadas: []
        },
        proponente_id:undefined,
        totalTaxa:'',
        totalGuardiaos:undefined,
        user_id:undefined,
        valor:undefined,
        taxaDiversificada:undefined,
        createdAt:undefined,
        updatedAt:undefined

    })
    const [retorno, setRetorno] = useState(0)



    const fetchData = async ()=>{
        const data = await buscarEmprestimoById(id)
        const result = await calcularJurosSimples(data.valor, ((data.juro-2)/100), data.prestacao)
        const arround = Math.round(result)
        setRetorno(arround)
        setData(data)
    }

    useEffect(()=>{
        fetchData()
    }, [])


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
                            <h3> <b>{data.prazo ?(data.prazo.split("T")[0]):(<></>)}</b>  </h3>
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
