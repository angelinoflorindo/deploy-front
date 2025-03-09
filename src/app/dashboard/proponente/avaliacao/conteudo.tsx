



import React from "react";
import global from "@/modules/global.module.css"
import Image from "next/image";
import Link from "next/link";


const Conteudo = () => {
    return (
        <div className="flex flex-col justify-start items-start" >
            <h1 className="font-bold text-center py-2">
                Avaliação de
            </h1>
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
    );
};

export default Conteudo;
