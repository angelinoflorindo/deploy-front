"use client";

import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import { UserInfo } from "@/services/user.service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { differenceInMonths, differenceInYears } from "date-fns";
import { useSession } from "next-auth/react";
import { buscarUser } from "@/app/actions/auth";

const Conteudo = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserInfo>({
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
    Investidor:{
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
        genero: undefined
      },
      Diversificacaos: []
    },
    Documentos:{
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
        genero: undefined
      },
    },
    Papel:{
      id: undefined,
      perfil: undefined
    },
    Pessoa:{
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
        data_nascimento: undefined
      },
      Emprego: {
        id: undefined,
        data_inicio: undefined,
        sector: undefined,
        cargo: undefined,
        area: undefined,
        createdAt: undefined,
        updatedAt: undefined
      },
      Residencium: {
        id: undefined,
        tipo: undefined,
        data_inicio: undefined,
        createdAt: undefined,
        updatedAt: undefined
      },
      Contum: {
        id: undefined,
        nome: undefined,
        iban: undefined,
        salario: undefined,
        emprego_id: undefined,
        pessoa_id: undefined,
        createdAt: undefined,
        updatedAt: undefined
      },
      User: {
        id: undefined,
        email: undefined
      }
    },
    Proponente:{
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
        genero: undefined
      },
      Emprestimos:[]
    },
    Reclamacaos:{
      id: undefined,
      assunto: undefined,
      conteudo: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    },
    Saque:{
      id: undefined,
      taxa: undefined,
      valor: undefined,
      estado: true,
      pendencia: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }
  });

  const fetchData = async () => {
    const user: UserInfo = await buscarUser(session?.user.email);
    setUserData(user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData.Pessoa)
    return (
      <div>
        <section className="shadow-md py-5 px-5 ">
          <h1 className="text-green-500">Termina de registrar o perfil! </h1>
          <span>(*) Informações Pessoais</span> <br />
          <span>(*) Informações profissionais</span>
        </section>
        <button
          onClick={() => {
            redirect("/ferramenta/usuario");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
  const ContumInfo = userData.Pessoa.Contum;
  const tempo = userData.Pessoa.Emprego.data_inicio;
  const tempoActual = new Date();
  const mesActual = new Date();
  const anos = differenceInYears(tempoActual, tempo);
  mesActual.setFullYear(mesActual.getFullYear() + anos);
  const mes = differenceInMonths(tempoActual, mesActual);

  return (
    <div>
      <h1 className="font-bold text-center">Informações financeiras</h1>

      <section className="shadow-md p-5">
        <div className="flex flex-col  ">
          <span className="py-1">
            Renda estimada:
            {ContumInfo ? (
              <b>{ContumInfo.salario} Kz</b>
            ) : (
              <span className="text-red-500"> Sem informação</span>
            )}
          </span>
          <span className="py-1">
            Tempo de atividade:
            {userData.Pessoa.Emprego ? (
              <b>
                {anos} anos e {mes} meses
              </b>
            ) : (
              <span className="text-red-500"> Sem informação</span>
            )}
          </span>
          {/* <span className="py-1"> Possui seguro: (*)  <b>sim</b> </span> */}
          {/*
          <span className="py-1">
            Possui bem movel: (*) <b>não</b>
          </span>
          */}
        </div>
        <hr className={styles.divider} />
        <div className="flex flex-col">
          <span className="py-1">
            Contum Principal :
            {ContumInfo ? (
              <b>{ContumInfo.nome}</b>
            ) : (
              <span className="text-red-500"> Sem informação</span>
            )}
          </span>
          <span className="py-1">
            IBAN:
            {ContumInfo ? (
              <b>{ContumInfo.iban}</b>
            ) : (
              <span className="text-red-500"> Sem informação</span>
            )}
          </span>
        </div>
        <hr className={styles.divider} />
        <span>
          {" "}
          <b>Documentos Anexados </b>
        </span>
        <br />
        <small>1- Declaração de Trabalho</small>
        <br />
        <small>2- Comprovativo de Renda</small>
      </section>
      <Link
        href={`/ferramenta/detalhes/${userData.Pessoa.id}`}
        className="px-4 py-2 bg-violet-500 text-white rounded"
      >
        Alterar
      </Link>
    </div>
  );
};

export default Conteudo;
