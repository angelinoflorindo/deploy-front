



import React from "react";
import global from "@/modules/global.module.css"
import Image from "next/image";
import Link from "next/link";

const Conteudo = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-center py-2">Históricos</h1>
                <Image src="/img/relatorio.png" width={20} height={20} alt="" />
            </div>
            <Link href="/dashboard/historico/3" className="flex flex-row justify-evenly p-4 shadow-md w-[100%]" >
                <Image src="/img/guardiao.png" width={30} height={30} alt="" />
                <div className="flex flex-col w-[100%] px-4" >
                    <div className="flex justify-between items-center">
                        <span >Celeste Domingos</span>
                        <span className={global.relatorioRed}>
                        </span>
                    </div>
                    <div className="flex flex-row justify-between py-2 items-center" >
                        <span className="flex font-bold justify-center items-center">
                            <b className="px-2">8%</b> mensal
                        </span>
                        <div className="flex justify-center items-center ">
                            <span  className={global.relatorioOrange}>
                            </span>
                            <span className={global.relatorioGreen}>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Conteudo;
