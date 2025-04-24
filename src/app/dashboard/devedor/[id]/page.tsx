

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css"
import Detalhes from ".";
import { buscarEmprestimoById } from "@/app/actions/auth";

const Devedor =  async (context: { params: { id: string } }) => {
  const {id} = await context.params
  const data = await buscarEmprestimoById(id)
  //console.log('dados encontrados', data)
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          {/*  <Pagamento /> */}
          <Detalhes data={data} />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Devedor;
