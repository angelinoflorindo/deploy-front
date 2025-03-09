



import React from "react";
import styles from "@/modules/Login.module.css"


const Conteudo = () => {
    return (

        <div >
            <h1 className="font-bold text-center">Minha conta </h1>

            <section className="shadow-md p-5" >
                <h2> Angelino Francisco</h2>
                <div className="flex flex-row justify-between  py-2" >
                    <div className="flex flex-col  ">
                        <span className="py-1"> Gênero:  <b>Masculino</b> </span>
                        <span className="py-1">Telemovel: <b>930 754 775</b> </span>
                        <span className="py-1"> Bilhete:  <b>009245135LA049</b> </span>
                        <span className="py-1">Email: <b>angelinofrancisco22@gmail</b> </span>
                    </div>
                </div>
                <hr className={styles.divider} />
                <div className="flex flex-col" >
                    <span className="py-1"> Estado civil :  <b>Casado</b> </span>
                    <span className="py-1">Data nascimento : <b>1994</b> </span>
                    <span className="py-1"> Morada atual :  <b>Luanda</b> </span>
                    <span className="py-1">Município: <b>Cacuaco</b> </span>
                </div>

            </section>

            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" >
                Proximo
            </button>

        </div>
    );
};

export default Conteudo;
