



import React from "react";
import styles from "@/modules/Login.module.css"


const Conteudo = () => {
    return (

        <div >
            <h1 className="font-bold text-center">Informações financeiras</h1>

            <section className="shadow-md p-5" >
                <div className="flex flex-col  ">
                    <span className="py-1"> Renda estimada: (*)  <b>250.000AKZ</b> </span>
                    <span className="py-1">Tempo de atividade: (*) <b>9 anos</b> </span>
                    <span className="py-1"> Possui seguro: (*)  <b>sim</b> </span>
                    <span className="py-1">Possui bem movel: (*) <b>não</b> </span>
                </div>
                <hr className={styles.divider} />
                <div className="flex flex-col" >
                    <span className="py-1">Conta Principal : <b>Banco BAI</b> </span>
                    <span className="py-1"> IBAN:  <b>Iban: 0040.000.0094.2345.2391.8</b> </span>
                </div>

                <hr className={styles.divider} />

                <span>(*)  Anexar comprovativos</span>

                <input
                    type="file"
                    name="scanner"
                    accept="image/*"
                    className="w-full  p-2 border rounded"
                />
            </section>
            <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded" >
                alterar
            </button>
        </div>
    );
};

export default Conteudo;
