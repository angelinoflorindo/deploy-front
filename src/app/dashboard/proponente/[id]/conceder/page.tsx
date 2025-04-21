

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import styles from "@/modules/Login.module.css"
import { getServerSession } from "next-auth";
import { buscarEmprestimoById, buscarUser } from "@/app/actions/auth";
import { UserInfo } from "@/services/user.service";

const Emprestar = async (context:{params:{id:string}}) => {
  const {id} = await context.params
  //const session = await getServerSession()
 // const userData:UserInfo = await buscarUser(session?.user?.email)
 
   const data =  await buscarEmprestimoById(id)

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo emprestimoData={data}/>
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Emprestar;
