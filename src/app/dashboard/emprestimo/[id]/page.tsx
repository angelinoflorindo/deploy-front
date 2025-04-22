import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import styles from "@/modules/Login.module.css";
import { buscarEmprestimoValidadoByEmail, buscarInvestidor, buscarReembolsoByProp, calcularJurosSimples } from "@/app/actions/auth";
import { getServerSession } from "next-auth";
import {InvestidorProps, UserInfo } from "@/services/user.service";
import { EmprestimoValidado, ReembolsoProps } from "@/services/Emprestimo.service";

const Pagamento = async (context: { params: { id: string } }) => {
  const { id } = await context.params; // id do investidor
  const session = await getServerSession();
  const emprestimoByUser:EmprestimoValidado = await buscarEmprestimoValidadoByEmail(session?.user.email)
  const investidordata:InvestidorProps   = await buscarInvestidor(id)
  const saldo = Math.round(investidordata.Diversificacaos[0].Emprestimo.valor * (investidordata.Diversificacaos[0].taxa / 100))
  const limitePrestacao = investidordata.Diversificacaos[0].Emprestimo.prestacao
  // calcular a prestação
  const prestacao :any = {}
  const reembolsoData:ReembolsoProps = await buscarReembolsoByProp(emprestimoByUser.Proponente.id)

  if(!reembolsoData || reembolsoData === undefined){
    prestacao.valor = 1
  } else if(reembolsoData.prestacao < limitePrestacao){
    prestacao.valor = reembolsoData.prestacao + 1

  } 

  const montante = await calcularJurosSimples(saldo, investidordata.Diversificacaos[0].Emprestimo.juro, prestacao.valor)

  console.log('saldo',saldo)
  console.log('limitePrestacao',limitePrestacao)
  console.log('reembolsoData',reembolsoData)
  console.log('montante',montante)
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo
            userData={investidordata}
            emprestimoData={emprestimoByUser}
            saldo={montante}
            prestacao={prestacao.valor}
          />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Pagamento;
