import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import { getServerSession } from "next-auth";
import { buscarUser, buscarUserQuery } from "@/app/actions/auth";

const SolicitarCredito = async () => {

  const session = await getServerSession()
  const user = await buscarUser(session?.user?.email)


  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo user={user} />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default SolicitarCredito;
