

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css"
import Conteudo from "./conteudo";
import { buscarPropostaInvestidor, buscarSolidarios, buscarUser } from "@/app/actions/auth";
import { getServerSession } from "next-auth";

const Historico = async () => {
  const session = await getServerSession()
  const negoData = await buscarPropostaInvestidor(session?.user.email)
  const solidarios = await buscarSolidarios(session?.user.email)
 // console.log("solidarios", solidarios)

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">       
         <Conteudo negoData={negoData} formData={solidarios}/>
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Historico;
