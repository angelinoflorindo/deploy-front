import React from "react";
import styles from "@/modules/Login.module.css";
import Image from "next/image";
import global from "@/modules/global.module.css";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import { getServerSession } from "next-auth";
import { buscarGuardiao, buscarUserQuery } from "@/app/actions/auth";
import { Guardiao } from "@/services/user.service";

const AvalSolidario = async () => {
  const session = await getServerSession();
  const user: Guardiao = await buscarUserQuery(session?.user?.email);
  const {data, total} = await buscarGuardiao(user.id);

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo user={user} guardInfo={data} total={total[0]._sum.taxa}/>
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default AvalSolidario;
