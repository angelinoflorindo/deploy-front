

import React from "react";
import styles from "@/modules/Login.module.css"
import global from "@/modules/global.module.css"
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

const CreditoVigesima = () => {
    return (
        
        <div className={styles.container}>
            <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
                <Header />

                {/* Conteúdo Principal */}
                <main className="flex-1 overflow-y-auto p-4 bg-white">
                    <h1 className="font-bold text-center">Formas de garantias!</h1>
                    <section className="flex flex-col justify-around align-items-center h-60">
                        <Link href="/dashboard/credito/vigesima/solidario" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md" >
                            <Image src="/img/proponente.png" className={global.imagens} alt="imagem" width={40} height={40} />
                            Aval solidário
                        </Link>
                        <Link href="/dashboard/credito/vigesima/vinculado" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md" >
                            <Image src="/img/movel.png" className={global.imagens} alt="imagem" width={40} height={40} />
                             Conta Vinculada
                        </Link>
                     
                        <div>
                            <Link href="/dashboard/credito/" className="px-4 py-2 bg-gray-500 text-white rounded" >
                                Voltar
                            </Link>
                        </div>
                    </section>

                </main>
                <Footer />
            </div>
        </div>
    );
};

export default CreditoVigesima;
