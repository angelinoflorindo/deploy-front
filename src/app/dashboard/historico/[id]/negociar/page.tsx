



import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css"
import Conteudo from "./conteudo";
import { buscarPropostaEmprestimoById, buscarUser } from "@/app/actions/auth";
import { getServerSession } from "next-auth";
import { UserInfo } from "@/services/user.service";



const Negociar = async (context:{params:{id:string}}) => {
  const {id} = await context.params
  const session = await getServerSession()
  const negoData = await buscarPropostaEmprestimoById(id, session?.user.email)
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">       
         <Conteudo negoData={negoData} />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Negociar;
