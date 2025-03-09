

import React from "react";
import styles from "@/modules/Login.module.css"
import Image from "next/image";
import global from "@/modules/global.module.css"




const AvalSolidario = () => {
    return (

        <div >
            <h1 className="font-bold text-align">Aval solidário </h1>
            <span>
                Convide 5+ pessoas que garantam
                o teu crédito
            </span>
            {/* Pesquisar guardiao */}

            <form action="" method="post">
                <input type="text" name="guardiao" placeholder="Pesquisar por nome ou numero ..." className={styles.input} />
                <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded" >
                    Pesquisar
                </button>
            </form>
            {/* Resultados */}
            <div className="flex flex-col  mx-auto justify-around items-center  " >
                <div className="flex flex-row justify-evenly shadow-md w-[100%]" >
                    <Image src="/img/guardiao.png"  className={global.imagemGuardiao}  width={50} height={-50} alt="" />
                    <div className="flex flex-col w-[100%] p-5" >
                        <span >Nome do Guardião</span>
                        <div className="flex flex-row justify-evenly items-center" >
                            <div className="bg-gray-100 w-20 h-20 flex  justify-center items-center">
                                XY%
                            </div>
                            <div>
                                <Image src="/img/aumentar.png" className={global.footerImagem} width={25} height={25} alt="" />

                                <Image src="/img/reduzir.png" className={global.footerImagem} width={25} height={25} alt="" />

                            </div>
                            <div className="flex flex-row justify-between  w-[100px]">
                                <Image src="/img/parentesco.png" className={global.footerImagem} width={30} height={30} alt="" />

                                <Image src="/img/convite.png" className={global.footerImagem}  width={30} height={30} alt="" />

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AvalSolidario;
