

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css"
import Conteudo from "./conteudo";
import { getServerSession, Session } from "next-auth";
import { UserInfo } from "@/services/user.service";
import { buscarUser } from "@/app/actions/auth";

interface CustomSession extends Session {
  user: {
    id:string,
    name: string;
    email: string;
    image: any;
    role:string
  };
  expires: any;
}


const Detalhes = async () => {
  
    const session = (await getServerSession()) as CustomSession;
    const userData:UserInfo = await buscarUser(session.user.email);
    
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
       
         <Conteudo userData={userData}  />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Detalhes;
