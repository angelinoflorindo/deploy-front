"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import global from "@/modules/global.module.css";
import Image from "next/image";

import Link from "next/link";
import {
  buscarEmprestimoValidadoByEmail,
  buscarUser,
} from "@/app/actions/auth";
import {
  DiversificacaoProps,
  EmprestimoValidado,
} from "@/services/Emprestimo.service";
import { UserInfo } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Emprestimo = () => {
  const { data: session, status } = useSession();
  const [emprestimo, setEmprestimo] = useState<EmprestimoValidado>({
    id: undefined,
    email: undefined,
    primeiro_nome: undefined,
    segundo_nome: undefined,
    bilhete: undefined,
    Proponente: {
      id: undefined,
      estado: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      Emprestimos: [
        {
          id: undefined,
          valor: undefined,
          estado: undefined,
          juro: undefined,
          prestacao: undefined,
          prazo: undefined,
          progresso: undefined,
          proponente_id: undefined,
          pendencia: undefined,
          user_id: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          Diversificacaos: [],
        },
      ],
    },
  });
  const [user, setUser] = useState<UserInfo>({
    id: "",
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
const router = useRouter()
  const [diverseData, setDiverseData] = useState<DiversificacaoProps[]>([]);
  let multipleIncome: any = [];

  const fetchData = async () => {
    const res: UserInfo = await buscarUser(session?.user.email);
    const result: EmprestimoValidado = await buscarEmprestimoValidadoByEmail(
      session?.user.email
    );
   // console.log("resultados falam", result)
    if (result.Proponente) {
      setDiverseData(result.Proponente.Emprestimos[0].Diversificacaos);

      if (result.Proponente.Emprestimos[0] &&  result.Proponente.Emprestimos[0].Diversificacaos.length > 0) {
        diverseData.forEach((data, index) => {
          multipleIncome.push({
            investidorId: data.investidor_id,
            content: Math.round(
              result.Proponente.Emprestimos[0].valor * (data.taxa / 100)
            ),
          });
        });
      }
    }

    setUser(res);
    setEmprestimo(result);
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
              {emprestimo.Proponente && emprestimo.Proponente.Emprestimos[0] ? (
                <div>
                  {diverseData && diverseData.length > 0 ? (
                    <div>
                      {diverseData.map((data, index) => (
                        <Link
                          key={data.investidor_id}
                          href={`/dashboard/emprestimo/${data.investidor_id}`}
                          className="flex flex-col px-4 py-2 h-20 shadow-md w-[100%]"
                        >
                          <span className="flex flex-row justify-between">
                            <p className="font-bold"> Empréstimo até</p>{" "}
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
                    <div className="text-blue font-bold"> Sem emprestimos </div>
                  )}
                </div>
              ) : (
                <div className="text-blue font-bold"> Sem emprestimos </div>
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
