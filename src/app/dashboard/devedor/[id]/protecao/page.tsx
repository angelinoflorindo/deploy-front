import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css";
import Conteudo from "./conteudo";
import { buscarCreditoById, buscarEmprestimoById, buscarUser } from "@/app/actions/auth";
import { getServerSession } from "next-auth";

const Protecao = async (context: { params: { id: string } }) => {
  const { id } = await context.params;
  const session = await getServerSession()
  const data = await buscarCreditoById(id);
  const user = await buscarUser(session?.user.email)
  
  /*const diversificado:any ={}

  if(data.taxaDiversificada){
    let income = data.valor*(1-(data.taxaDiversificada/100))
    let inteiro = Math.round(income)
    diversificado.saldo = inteiro
  }
    */

  //console.log("emprestimo", data)
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo saldo={data.valor}  formData={data} userData={user}/>
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Protecao;
