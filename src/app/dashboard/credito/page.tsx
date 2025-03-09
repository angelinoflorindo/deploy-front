

import React from "react";
import styles from "@/modules/Login.module.css"
import Header from "@/components/header";
import Footer from "@/components/footer";
import TipoCredito from "./tipo-credito";
import Pagamento from "./pagamento";



const Credito = () => {
    return (

        <div className={styles.container}>
            <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
                <Header />

                {/* Conteúdo Principal */}
                <main className="flex-1 overflow-y-auto p-4 bg-white">
                    {/* <TipoCredito /> */}
                    <TipoCredito />
                    {/* <Pagamento /> */}
                    

                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Credito;
