import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import styles from "@/modules/Login.module.css";
import { buscarCreditoValidadoByEmail, buscarEmprestimoValidadoByEmail, buscarInvestidor, buscarPagamentoByDev, buscarReembolsoByProp, calcularJurosCompostos, calcularJurosSimples, calcularPrestacaoSimples } from "@/app/actions/auth";
import { getServerSession } from "next-auth";
import {InvestidorProps, UserInfo } from "@/services/user.service";
import { EmprestimoValidado, ReembolsoProps } from "@/services/Emprestimo.service";
import { CreditoUserProps, PagamentosProps } from "@/services/Credito.service";

const Pagamento = async (context: { params: { id: string } }) => {
  const { id } = await context.params; // id do investidor
  const session = await getServerSession();
  const creditoByUser:CreditoUserProps = await buscarCreditoValidadoByEmail(session?.user.email)
  const investidordata:InvestidorProps   = await buscarInvestidor(id)

  // calcular a prestação
  const prestacao :any = {}
  const pagamentoData:PagamentosProps = await buscarPagamentoByDev(creditoByUser.Devedor.id)

  if(!pagamentoData || pagamentoData === undefined){
    prestacao.valor = 1
  } else if(pagamentoData.prestacao < 3){
    prestacao.valor = pagamentoData.prestacao + 1

  } 
  const taxa = creditoByUser.Devedor.Creditos[0].juro -2
  const montante = await calcularJurosCompostos(creditoByUser.Devedor.Creditos[0].valor,(taxa/100),3)
  const parcela = await calcularPrestacaoSimples(creditoByUser.Devedor.Creditos[0].valor,(taxa/100), 3)
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <Conteudo
            userData={investidordata}
            creditoData={creditoByUser}
            saldo={parcela}
            prestacao={prestacao.valor}
            montante={montante}

          />
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Pagamento;
