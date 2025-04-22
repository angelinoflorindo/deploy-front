import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import global from "@/modules/global.module.css";
import Image from "next/image";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { buscarEmprestimoValidadoById, buscarUser } from "@/app/actions/auth";
import { EmprestimoProps, UserInfo } from "@/services/user.service";

const Emprestimo = async () => {
  const session  = await getServerSession()
  const user:UserInfo = await buscarUser(session?.user.email)
  const emprestimoId = user.Proponente.Emprestimos[0].id
  const emprestimo:EmprestimoProps = await buscarEmprestimoValidadoById(emprestimoId) 
  console.log('verificar emprestimo', emprestimo)
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="">
            <h2 className="text-xl font-bold mb-2">Escolher garatias </h2>

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
            
            <h2 className="text-xl font-bold mb-2">Efectuar pagamentos</h2>
            <section>

            </section>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Emprestimo;
