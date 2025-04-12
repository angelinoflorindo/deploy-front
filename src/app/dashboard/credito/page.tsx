import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import global from "@/modules/global.module.css"
import Image from "next/image";


import Link from "next/link";

const Credito = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <div className={global.grid}>
            <h1 className="font-bold text-center">Escolher o tipo </h1>

            <section className={global.sectionLink}>
            
            {/*href="/dashboard/credito/consumo*/}
              <Link
                href="/desenvolvimento"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/dinheiro.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Crédito consumo
              </Link>

              <Link
                href="/dashboard/credito/decima"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/dinheiro.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Crédito 10 dias
              </Link>
              <Link
                href="/dashboard/credito/vigesima"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/dinheiro.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Crédito 20 dias
              </Link>
             
              {/* href="/dashboard/credito/mensal"*/}
              <Link
              href="/desenvolvimento"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/dinheiro.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Crédito 30 dias
              </Link>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Credito;
