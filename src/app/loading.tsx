"use client";
import React from "react";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { signOut } from "next-auth/react";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="flex flex-col  h-[100%] justify-center items-center">
            <h1 className={global.h2}>
              <b>Buscando a pagina ...</b>
            </h1>
            
            <p className="w-[80%] text-start"> Aguarde alguns segundos </p>
            <hr className={global.divider} />
            <div className="w-[80%] flex justify-start">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                ir para login{" "}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Loading;
