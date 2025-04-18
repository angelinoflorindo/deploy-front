import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import global from "@/modules/global.module.css";
import Image from "next/image";

import Link from "next/link";

const Emprestimo = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <div className={global.grid}>
            <h1 className="font-bold text-center">Escolher garatias </h1>

            <section className="flex flex-col justify-around align-items-center h-60">
            {/*
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
                Dédito direito
              </Link>
            */}
              <Link
                href="/dashboard/emprestimo/solidario"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/proponente.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Aval solidário
              </Link>
              <Link
                href="/dashboard/emprestimo/vinculado"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/movel.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Conta vinculada
              </Link>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Emprestimo;
