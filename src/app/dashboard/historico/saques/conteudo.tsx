



import React from "react";
import global from "@/modules/global.module.css"
import Image from "next/image";


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
            <button type="submit" className="px-4 w-[50%] py-2 bg-violet-500  text-white rounded" >
                Confirmar
            </button>
        </div>
    );
};

export default Conteudo;
