import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { UserInfo } from "@/services/user.service";
import { buscarCreditoValidadoByEmail, buscarUser } from "@/app/actions/auth";
import { CreditoUserProps } from "@/services/Credito.service";
import { redirect } from "next/navigation";

const Credito = async () => {
  const session = await getServerSession();

  if(!session?.user.email){
    return redirect("/")
  }
  const user: UserInfo = await buscarUser(session?.user.email);
  const credito: CreditoUserProps = await buscarCreditoValidadoByEmail(
    session?.user.email
  );

 //console.log('creditos', credito)

  if (user.Carteira == null || user.Carteira == undefined) {
    console.log("sem conta digital");
    return redirect("/ferramenta/cartao");
  }
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <h2 className="text-xl font-bold mb-2">Escolher o modelo </h2>

          <section className="flex flex-col h-40 mb-4">
            {/*href="/dashboard/credito/consumo
            
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
                Crédito consumo
              </Link>
            
            */}

            <Link
              href="/dashboard/credito/decima"
              className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
            >
              <Image
                src="/img/dinheiro.png"
                className={global.imagens}
                alt="imagem"
                width={40}
                height={40}
              />
              Crédito 30 dias
            </Link>
            <Link
              href="/dashboard/credito/vigesima"
              className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
            >
              <Image
                src="/img/dinheiro.png"
                className={global.imagens}
                alt="imagem"
                width={40}
                height={40}
              />
              Crédito 60 dias
            </Link>

            {/* href="/dashboard/credito/mensal"*/}
            <Link
              href="/dashboard/credito/mensal"
              className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md"
            >
              <Image
                src="/img/dinheiro.png"
                className={global.imagens}
                alt="imagem"
                width={40}
                height={40}
              />
              Crédito 90 dias
            </Link>
          </section>

          <h2 className="text-xl font-bold mb-2">Efectuar pagamentos</h2>
          <section>
            {/*BUSANDO OS EMPRESTIMOS POR INVESTIDORES*/}
            {credito.Devedor && credito.Devedor.Creditos.length>0 ? (
              <div>
                <Link
                  key={credito.Devedor.Creditos[0].id}
                  href={`/dashboard/credito/${credito.Devedor.Creditos[0].Credoras[0].investidor_id}`}
                  className="flex flex-col px-4 py-2 h-20 shadow-md w-[100%]"
                >
                  <span className="flex flex-row justify-start">
                    <p className="font-bold"> Crédito até: </p>{" "}
                    {credito.Devedor.Creditos[0].prazo.split("T")[0]}
                  </span>
                  <div className="flex flex-row justify-between">
                    <span className="py-1">
                      <b> Prestação:</b>
                      {credito.Devedor.Creditos[0].prestacao}
                    </span>
                    <span className="flex flex-row justify-between">
                      <b>Valor:</b> {credito.Devedor.Creditos[0].valor},00kz
                    </span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="text-blue-500 font-bold"> Sem crétidos </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Credito;
