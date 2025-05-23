"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { UserInfo } from "@/services/user.service";
import { buscarCreditoValidadoByEmail, buscarUser } from "@/app/actions/auth";
import { CreditoProps, CreditoUserProps } from "@/services/Credito.service";
import {  useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Credito = () => {
  const { data: session, status } = useSession();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<UserInfo>({
    id: undefined,
    bilhete: "",
    email: "",
    genero: "",
    password: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    Carteira: {
      id: "",
      codigo: "",
      createdAt: "",
      numero: "",
      saldo: "",
      updatedAt: "",
      user_id: "",
    },
    Depositos: {
      id: "",
      user_id: "",
      estado: true,
      pendencia: true,
      createdAt: "",
      updatedAt: "",
      valor: "",
    },
    Devedor: {
      id: "",
      estado: true,
      inadimplencia: "",
      adimplencia: "",
      solicitacao: "",
      updatedAt: "",
      createdAt: "",
      user_id: "",
    },
    Investidor: {
      id: undefined,
      maior_risco: false,
      maior_seguranca: false,
      saque_antecipado: false,
      fundo_protegido: false,
      partilhar_emprestimo: false,
      estado: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Diversificacaos: [],
    },
    Documentos: {
      id: undefined,
      tipo: undefined,
      titulo: undefined,
      nome_salvado: undefined,
      nome_original: undefined,
      extensao: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
    },
    Papel: {
      id: undefined,
      perfil: undefined,
    },
    Pessoa: {
      id: undefined,
      estado_civil: undefined,
      provincia: undefined,
      municipio: undefined,
      profissao: undefined,
      user_id: undefined,
      emprego_id: undefined,
      residencia_id: undefined,
      nivel_instrucao: undefined,
      data_nascimento: undefined,
      Conjugue: {
        id: undefined,
        nome_completo: undefined,
        nivel_instrucao: undefined,
        dependentes: undefined,
        data_nascimento: undefined,
      },
      Emprego: {
        id: undefined,
        data_inicio: undefined,
        sector: undefined,
        cargo: undefined,
        area: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Residencia: {
        id: undefined,
        tipo: undefined,
        data_inicio: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Conta: {
        id: undefined,
        nome: undefined,
        iban: undefined,
        salario: undefined,
        emprego_id: undefined,
        pessoa_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      User: {
        id: undefined,
        email: undefined,
      },
    },
    Proponente: {
      id: undefined,
      solicitacao: undefined,
      reembolsar: undefined,
      satisfeitos: undefined,
      insatisfeitos: undefined,
      estado: false,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Emprestimos: [],
    },
    Reclamacaos: {
      id: undefined,
      assunto: undefined,
      conteudo: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    Saque: {
      id: undefined,
      taxa: undefined,
      valor: undefined,
      estado: true,
      pendencia: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
  });
  const [credito, setCredito] = useState<CreditoProps[]>([])

  //let credito = new Array<CreditoProps>();

  const router = useRouter();

  const fetchData = async () => {
    const user: UserInfo = await buscarUser(session?.user.email);
    const credit: CreditoUserProps = await buscarCreditoValidadoByEmail(
      session?.user.email
    );
    //console.log()
    setUser(user);
      //console.log('creditos', credit.Devedor.Creditos)

    if (credit && credit.Devedor && credit.Devedor.Creditos) {
      setCredito(credit.Devedor.Creditos)
    }
  };

  useEffect(() => {
    if (session?.user.email) {
      fetchData();
    }
  }, []);

  if (user.id && (!user.Carteira || !user.Pessoa.Conta)) {
    return (
       <div className={styles.container}>
        <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="bg-red-100 text-red-700 p-3 rounded shadow-md mb-4">
              (*) Sem informações Financeiras!
            </div>

            <div className="bg-red-100 text-red-700 p-3 rounded shadow-md mb-4">
              (*) Sem informações Investimentos!
            </div>

            <button
              onClick={() => {
                router.push("/ferramenta/");
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Voltar
            </button>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  if (user.id && !user.Pessoa) {
    return (
      <div className={styles.container}>
        <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="bg-red-100 text-red-700 p-3 rounded shadow-md mb-4">
              (*) Sem informações Pessais!
            </div>

            <div className="bg-red-100 text-red-700 p-3 rounded shadow-md mb-4">
              (*) Sem informações Profissionais!
            </div>

            <button
              onClick={() => {
                router.push("/ferramenta/usuario");
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Voltar
            </button>
          </main>
          <Footer />
        </div>
      </div>
    );
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
              Crédito 60 dias
            </Link>

            {/* href="/dashboard/credito/mensal"*/}
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
              Crédito 90 dias
            </Link>
          </section>

          <h2 className="text-xl font-bold mb-2">Efectuar pagamentos</h2>
          <section>
            {/*BUSANDO OS EMPRESTIMOS POR INVESTIDORES*/}

            {credito.length > 0 && credito[0].id ? (
              <div>
                <Link
                  key={credito[0].id}
                  href={`/dashboard/credito/${credito[0].Credoras[0].investidor_id}`}
                  className="flex flex-col px-4 py-2 h-20 shadow-md w-[100%]"
                >
                  <span className="flex flex-row justify-start">
                    <p className="font-bold"> Crédito até: </p>{" "}
                    {credito[0].prazo.split("T")[0]}
                  </span>
                  <div className="flex flex-row justify-between">
                    <span className="py-1">
                      <b> Prestação:</b>
                      {credito[0].prestacao}
                    </span>
                    <span className="flex flex-row justify-between">
                      <b>Valor:</b> {credito[0].valor},00kz
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
