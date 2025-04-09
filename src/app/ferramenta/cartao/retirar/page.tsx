

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import styles from "@/modules/Login.module.css"
import { getServerSession } from "next-auth";
import { buscarUser } from "@/app/actions/auth";
import { UserInfo } from "@/services/user.service";

const Retirar = async () => {
  const session = await getServerSession()
  const userData:UserInfo = await buscarUser(session?.user?.email)

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Retirar;
