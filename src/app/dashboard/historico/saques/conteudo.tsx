



import React from "react";
import global from "@/modules/global.module.css"
import Image from "next/image";
import Link from "next/link";


const Conteudo = () => {
    return (
        <div className="flex  flex-col justify-center items-center">
            <h1 className="font-bold text-center py-2">Saque antecipado </h1>

            <div className="flex flex-col w-[100%] p-4  shadow-md " >
                <div className="flex justify-between items-center">
                    <p>Taxa do saque </p>
                    <b>XX,00KZ</b>
                </div>
                <div className="flex flex-col justify-between items-center" >
                    <p>
                        Receber
                    </p>
                    <div className="bg-gray-100 w-30 h-15 rounded flex justify-center items-center ">
                        XX,00KZ
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-[100%] py-2 " >
                <Link href="/dashboard/historico/3" className="px-4 py-2 bg-gray-500 text-white rounded" >
                    Voltar
                </Link>

                <Link href="/dashboard/historico/" className="px-4 py-2 bg-violet-500  text-white rounded" >
                    Confirmar
                </Link>
            </div>
        </div>
    );
};

export default Conteudo;
