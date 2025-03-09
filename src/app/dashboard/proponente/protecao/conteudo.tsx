



import React from "react";
import global from "@/modules/global.module.css"
import Image from "next/image";


const Conteudo = () => {
    return (
        <div>
            <h1 className="font-bold text-center py-2">Fundo de proteção</h1>

            <h2 className="font-bold">
                Diversificar o crédito
            </h2>
            <small>Investimento parcial</small>
            <div className="flex flex-row justify-between items-center" >
                <span className="flex font-bold w-40 h-20 shadow-md justify-center items-center">
                    XY%
                </span>
                <span className="flex flex-col p-2 w-[100%] justify-between items-start">
                    <Image src="/img/aumentar.png" width={30} height={30} alt="" className={global.footerImagem} />
                    <Image src="/img/reduzir.png" width={30} height={30} alt="" className={global.footerImagem} />
                </span>
            </div>

            <h2 className="font-bold  py-2" >
                Proteger o crédito
            </h2>
            <small>Proteja ate 50% do seu dinheiro</small>
            <div className="shadow-md p-2 w-[100%]" >

                <div className="flex flex-col justify-center items-center" >
                    <div className="bg-gray-100 w-40 h-10 flex justify-center  items-center " >
                        <b>XX,00KZ</b>
                    </div>
                    <div className="flex flex-col w-[100%] p-2 justify-start  items-start " >
                        <span><b>Destinatário:</b> Onix Corporation</span>
                        <span><b>IBAN:</b> 000.000.000.0000.000 </span>
                    </div>
                </div>
                <h2>Anexar comprovativo</h2>
                <input
                    type="file"
                    name="scanner"
                    accept="image/*"
                    className="w-full  border rounded"
                />

            </div>
            <div  className="flex justify-center">
                <button type="submit" className="px-4 w-[50%] py-2 bg-violet-500  text-white rounded" >
                    Confirmar
                </button>
            </div>

        </div>
    );
};

export default Conteudo;
