



import React from "react";
import global from "@/modules/global.module.css"
import Image from "next/image";


const Conteudo = () => {
    return (
        <div>

            <h1 className="font-bold text-center py-2">Relatórios</h1>

            <div className="flex flex-row justify-evenly p-4 shadow-md w-[100%]" >
                <Image src="/img/carteira.png" width={40} height={25} alt="imagem" />
                <div className="flex flex-col w-[100%] px-4" >
                    <div className="flex justify-between items-center">
                        <span >Celeste Domingos</span>
                        <span className={global.relatorioRed} >
                        </span>
                    </div>
                    <div className="flex flex-row justify-between py-2 items-center" >
                        <span className="flex  justify-center items-center">
                             Pagou <b className="px-2">XX,00KZ</b> 
                        </span>
                        <div className="flex justify-center items-center ">
                            <span className={global.relatorio}>
                            </span>
                            <Image src="/img/download.png" width={25} height={25} alt="imagem" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conteudo;
