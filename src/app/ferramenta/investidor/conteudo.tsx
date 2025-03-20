



import React from "react";
import styles from "@/modules/Login.module.css"


const Conteudo = () => {
    return (

        <div >
            <h1 className="font-bold text-center">Perfil de investidor </h1>

            <section className="shadow-md p-5" >
                <h2><b>Conservador</b></h2>
                <div className="flex flex-col ">
                    <span className="py-1 flex justify-between">
                        Fundo de proteção
                        <input type="checkbox" name="fundo_protecao" className="w-5 h-5" />
                    </span>

                    <span className="py-1 flex justify-between">
                        Saques antecipados
                        <input type="checkbox" name="saques" className="w-5 h-5" />
                    </span>

                    <span className="py-1 flex justify-between">
                        Diversificação de créditos
                        <input type="checkbox" name="diversificacao" className="w-5 h-5" />
                    </span>
                </div>

                <hr className={styles.divider} />

                <div className="flex flex-col" >
                    <span className="py-1 flex justify-between">
                        Maior segurança e
                        Menos retorno
                        <input type="checkbox" name="seguranca" className="w-5 h-5" />
                    </span>
                    {/* Agressivo*/}
                    <span className="py-1 flex justify-between">
                        Maior risco e
                        Retornos altos
                        <input type="checkbox" name="risco" className="w-5 h-5" />
                    </span>
                </div>
            </section>
            <div className="flex justify-center">
                <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded" >
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default Conteudo;
