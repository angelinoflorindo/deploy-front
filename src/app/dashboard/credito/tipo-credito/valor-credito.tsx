

import React from "react";
import styles from "@/modules/Login.module.css"
import global from "@/modules/global.module.css"





const ValorCredito = () => {
    return (

        <div >
            <h1 className="font-bold text-center">Escolher o valor</h1>
            <form action="" method="post" className="flex flex-col  justify-around h-50 " >
                <input type="text" name="valor" placeholder="Inserir valor" className={styles.input} />
                <input type="range" min={6} max={12} name="prestacao" />
                <div className="flex justify-between w-[100%]">
                    <button type="submit" className="px-4 py-2 bg-gray-500 text-white rounded" >
                        Voltar
                    </button>
                    <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded" >
                        Proximo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ValorCredito;
