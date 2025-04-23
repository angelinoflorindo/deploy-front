import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import global from "@/modules/global.module.css";
import Image from "next/image";

import Link from "next/link";
import { getServerSession } from "next-auth";
import {
  buscarEmprestimoValidadoByEmail,
  buscarUser,
} from "@/app/actions/auth";
import { EmprestimoValidado } from "@/services/Emprestimo.service";

const Emprestimo = async () => {
  const session = await getServerSession();
  const emprestimo: EmprestimoValidado = await buscarEmprestimoValidadoByEmail(
    session?.user.email
  );
  const diverseData = emprestimo.Proponente.Emprestimos[0].Diversificacaos;
  const multipleIncome: any = [];

  if (emprestimo.Proponente.Emprestimos[0].Diversificacaos.length > 0) {
    diverseData.forEach((data, index) => {
      multipleIncome.push({
        investidorId: data.investidor_id,
        content: Math.round(emprestimo.Proponente.Emprestimos[0].valor * (data.taxa / 100)),
      });
    });
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="">
            <h2 className="text-xl font-bold mb-2">Escolher garantias </h2>

            <section className="flex flex-col h-40">
              {/*
              <Link
                href="/desenvolvimento"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/dinheiro.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Dédito direito
              </Link>
            */}
              <Link
                href="/dashboard/emprestimo/solidario"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/proponente.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Aval solidário
              </Link>
              <Link
                href="/dashboard/emprestimo/vinculado"
                className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
              >
                <Image
                  src="/img/movel.png"
                  className={global.imagens}
                  alt="imagem"
                  width={40}
                  height={40}
                />
                Conta vinculada
              </Link>
            </section>

            <h2 className="text-xl font-bold mb-2">Efectuar reembolsos</h2>
            <section>
              {/*BUSANDO OS EMPRESTIMOS POR INVESTIDORES*/}

              {diverseData.length > 1 ? (
                <div>
                  {diverseData.map((data, index) => (
                    <Link
                      key={data.investidor_id}
                      href={`/dashboard/emprestimo/${data.investidor_id}`}
                      className="flex flex-col px-4 py-2 h-20 shadow-md w-[100%]"
                    >
                      <span className="flex flex-row justify-between">
                        <p className="font-bold"> Emprestimo até</p>{" "}
                        {
                          emprestimo.Proponente.Emprestimos[0].prazo.split(
                            "T"
                          )[0]
                        }
                      </span>
                      <div className="flex flex-row justify-between">
                        <span className="py-1">
                          <b> Prestação:</b>
                          {emprestimo.Proponente.Emprestimos[0].prestacao}
                        </span>
                        <span className="flex flex-row justify-between">
                          <b>Valor:</b> {multipleIncome[index].content},00kz
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div>
                  <Link
                    key={emprestimo.Proponente.Emprestimos[0].Diversificacaos[0].investidor_id}
                    href={`/dashboard/emprestimo/${emprestimo.Proponente.Emprestimos[0].Diversificacaos[0].investidor_id}`}
                    className="flex flex-col px-4 py-2 h-20 shadow-md w-[100%]"
                  >
                    <span className="flex flex-row justify-between">
                      <p className="font-bold"> Emprestimo até</p>{" "}
                      {emprestimo.Proponente.Emprestimos[0].prazo.split("T")[0]}
                    </span>
                    <div className="flex flex-row justify-between">
                      <span className="py-1">
                        <b> Prestação:</b>
                        {emprestimo.Proponente.Emprestimos[0].prestacao}
                      </span>
                      <span className="flex flex-row justify-between">
                        <b>Valor:</b>{" "}
                        {multipleIncome[0].content},00kz
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Emprestimo;
