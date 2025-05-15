"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css";
import Conteudo from "./conteudo";
import ConteudoInfo from "./conteudo-info";
import global from "@/modules/global.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/services/user.service";
import Loading from "@/app/loading";

const Usuario = () => {
  const [step, setStep] = useState(1);
  const [userData, setUser] = useState<UserInfo>({
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetchData = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa?email=${session?.user?.email}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Erro na requisição");
        }
        return res.json();
      })
      .then((users: UserInfo) => {
        console.log(users);
        setUser(users);
      })
      .catch((error) => {
        console.log("Error message", error);
        router.push("/");
      });
  };
  useEffect(() => {
    if (session?.user.email) {
      fetchData();
    }
  }, []);

  if (!session?.user.email) {
    return (
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        <Loading />
        <hr className={global.divider} />
        <div className="w-[80%] flex justify-start">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            ir para login{" "}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          {step === 1 && <Conteudo users={userData} />}

          {step === 2 && <ConteudoInfo users={userData} />}

          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Próximo
            </button>
          ) : (
            <div className="py-2 flex justify-between ">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Voltar
              </button>

              <Link
                href="/ferramenta/usuario/editar"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Alterar
              </Link>
            </div>
          )}
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Usuario;
