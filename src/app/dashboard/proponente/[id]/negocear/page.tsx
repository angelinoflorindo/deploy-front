'use server'
import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import { getServerSession } from "next-auth";
import { buscarEmprestimoById, buscarUser, confirmarNegociacao } from "@/app/actions/auth";
import { redirect } from "next/navigation";

const NegocearEmprestimo = async (context:{params:{id:string}}) => {
  const {id}  =  await context.params
  const session = await getServerSession()
  const user = await buscarUser(session?.user?.email)
  const data =  await buscarEmprestimoById(id)
  const negociado = await confirmarNegociacao(id)


  if(negociado){
    console.log('Negociação já foi realizada!')
    return redirect(`/dashboard/proponente/${id}`)
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo user={user}  formData={data}  />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default NegocearEmprestimo;
