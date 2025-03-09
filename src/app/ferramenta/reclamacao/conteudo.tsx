



import React from "react";
import global from "@/modules/Login.module.css"


const Conteudo = () => {
    return (
        <div className="flex flex-col justify-around items-center ">
            <h1 className="font-bold text-center">Comunicar um problema</h1>

            <section className="shadow-md p-5" >
                <form action="" method="post">
                    <input type="text" placeholder="Assunto" className={global.input} />
                    <textarea rows={4} cols={35} className={global.input} placeholder="Descreva os detalhes do problema"></textarea>

                </form>
            </section>
            <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded" >
                submeter
            </button>
        </div>
    );
};

export default Conteudo;
