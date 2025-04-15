"use client";

import React from "react";
import styles from "@/modules/Login.module.css";
import { UserInfo } from "@/services/user.service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { differenceInMonths, differenceInYears } from "date-fns";

const Conteudo = ({ userData }: { userData: UserInfo }) => {
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
  const tempo = userData.Pessoa.Emprego.data_inicio
  const tempoActual = new Date()
  const mesActual = new Date()
  const anos = differenceInYears(tempoActual, tempo)
  mesActual.setFullYear(mesActual.getFullYear() + anos)
  const mes = differenceInMonths(tempoActual, mesActual)

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
              <b>{anos} anos e {mes} meses</b>
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
