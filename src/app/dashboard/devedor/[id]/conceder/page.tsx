import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import styles from "@/modules/Login.module.css";
import { buscarCreditoById, buscarEmprestimoById, buscarUser } from "@/app/actions/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { EmprestimoDef, UserInfo } from "@/services/user.service";
import { CreditoDef } from "@/services/Credito.service";

const Emprestar = async (context: { params: { id: string } }) => {
  const { id } = await context.params;
  const session = await getServerSession();
  const user: UserInfo = await buscarUser(session?.user.email);
  const data: CreditoDef = await buscarCreditoById(id);
 
 /*
  const diversificado: any = {};

  // aqui se investe segundo a taxa disposta
   data.Diversificacaos.forEach((data, index)=>{
    if(user.Investidor.id === data.investidor_id){}
    let income = data.valor * (data.taxa/ 100);
    let inteiro = Math.round(income);
    diversificado.saldo = inteiro; 
  })
    */

   // Aqui se investe segundo o disponível
   /*
  if (data.taxaDiversificada) { 

    let income = data.valor * (1 - data.taxaDiversificada / 100);
    let inteiro = Math.round(income);
    diversificado.saldo = inteiro;
  }*/

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo
            userData={user}
            creditoData={data}
          />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Emprestar;
