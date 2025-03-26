
'use client';

import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css"
import Conteudo from "./conteudo";
import ConteudoInfo from "./conteudo-info";



const Usuario = () => {
const [step, setStep] = useState(1)


  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          { step ===1 && (
            <Conteudo   />
          ) }

          {  step === 2 && ( <ConteudoInfo /> )}


          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Próximo
            </button>
          ) : (
            <div className="py-2 flex justify-between ">
               <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Voltar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Registrar
            </button>
            </div>
          )}
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Usuario;
