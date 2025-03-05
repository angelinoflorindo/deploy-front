

import React from "react";
import styles from "@/modules/Login.module.css"
import Image from "next/image";



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
            <div>
                <div>
                    <Image src="/img/guardiao.png" width={30} height={30} alt="" />
                    <section>
                        <span >Nome do Guardião</span>
                        <div>
                            <div>
                                XY%
                            </div>
                            <div>
                                <Image src="/img/aumentar.png" width={30} height={30} alt="" />

                                <Image src="/img/reduzir.png" width={30} height={30} alt="" />

                            </div>
                            <div>
                                <Image src="/img/parentesco.png" width={30} height={30} alt="" />

                                <Image src="/img/convite.png" width={30} height={30} alt="" />

                            </div>
                        </div>
                    </section>
                </div>

            </div>

        </div>
    );
};

export default AvalSolidario;
