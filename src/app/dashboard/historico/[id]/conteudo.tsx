




import React from "react";
import global from "@/modules/global.module.css"
import Image from "next/image";


const Conteudo = () => {
    return (
        <div>
            
            <h1 className="font-bold ">Progresso de</h1>
            <small>  Angelino Francisco </small>
            
            <div className="flex flex-col justify-evenly items-center p-4 shadow-md w-[100%]" >
                <Image src="/img/p5.png" width={50} height={50} alt="" />
                <div className="w-[100%] p-2" >
                    <div className="flex justify-between items-center" >
                        <p>1 Prestaçao </p>
                        <b>28 a 31 de julho</b>

                    </div>
                    <div className="flex justify-between  items-center" >
                        <p>Receber</p>
                        <b>XY KZ</b>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Conteudo;
