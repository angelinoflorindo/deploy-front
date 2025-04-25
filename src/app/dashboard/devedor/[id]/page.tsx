

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css"
import Detalhes from ".";
import { buscarCreditoById, calcularJurosCompostos } from "@/app/actions/auth";
import { CreditoDef, CreditoProps } from "@/services/Credito.service";

const Devedor =  async (context: { params: { id: string } }) => {
  const {id} = await context.params
  const data:CreditoDef = await buscarCreditoById(id)
  const retorno = await calcularJurosCompostos(data.valor, ((data.juro-2)/100), 3)
 
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          {/*  <Pagamento /> */}
          <Detalhes data={data} retorno={retorno} />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Devedor;
