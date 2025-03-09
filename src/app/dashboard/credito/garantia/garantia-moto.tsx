



import React from "react";
import styles from "@/modules/Login.module.css"


const GarantiaMoto = () => (

    <div>
        <h1 className="font-bold text-start">Moto como garantia</h1>

        <form action="" method="post" className="shadow-md p-5">
            <h2>Modelo</h2>
            <input type="text" name="modelo" placeholder="Inserir" className={styles.input} />
            <h2>Outra informação</h2>
            <input type="text" name="informacao" placeholder="Inserir" className={styles.input} />
            <h2>Anexar Documentos</h2>
            <input
                type="file"
                name="scanner"
                accept="image/*"
                className="w-full  p-2 border rounded" />
        </form>

        <div className="flex justify-between w-[100%] py-5 ">
            <button type="submit" className="px-4 py-2 bg-gray-500 text-white rounded">
                Voltar
            </button>
            <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded">
                confirmar
            </button>
        </div>


    </div>
);

export default GarantiaMoto;
