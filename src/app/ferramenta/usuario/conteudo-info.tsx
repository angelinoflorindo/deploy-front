



import React from "react";
import styles from "@/modules/Login.module.css"


const ConteudoInfo = () => {
    return (

        <div >
            <h1 className="font-bold text-center">Minha conta </h1>

            <section className="shadow-md p-5" >
                <div className="flex flex-row justify-between  py-2" >
                    <div className="flex flex-col  ">
                        <span className="py-1">Número de dependentes: <b>9</b> </span>
                        <span className="py-1">Nível de instrução: <b>930 754 775</b> </span>
                        <span className="py-1"> Tipo de residência:  <b>Própria</b> </span>
                        <span className="py-1">Tempo de residência: <b>3 meses</b> </span>
                    </div>
                </div>
                <hr className={styles.divider} />
                <h2> Domingas Fio</h2>
                <div className="flex flex-col" >
                    <span className="py-1"> Nível de instrução:  <b>Licenciatura</b> </span>
                    <span className="py-1">Data nascimento : <b>1994</b> </span>
                    <span className="py-1"> Empregador :  <b>privado</b> </span>
                </div>

            </section>
           
        </div>
    );
};

export default ConteudoInfo;
