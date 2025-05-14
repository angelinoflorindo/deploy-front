"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import global from "@/modules/global.module.css";
import { useSession } from "next-auth/react";
import { UserInfo } from "@/services/user.service";
import Link from "next/link";

const ConteudoInfo = ({ users }: { users:UserInfo }) => {
  const { data: session, status } = useSession();

  if (!session?.user.email) {
    return (
      <div className={styles.container}>
        <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
          {/* Conteúdo Principal */}
          <main className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="flex flex-col  h-[100%] justify-center items-center">
              <hr />
              <b>Buscando a pagina ...</b>
              <p className="w-[80%] text-start"> Aguarde alguns segundos </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="shadow-md p-5">
       <div className="flex flex-col   py-2">
            <h2> Informações adicionais</h2>
            {users?.Pessoa == null ? (
              <b className="text-red-500"> Sem Informação</b>
            ) : (
              <article>
                <div className="flex flex-col  ">
                  <span className="py-1">
                    Nível de instrução:
                    <b>{users?.Pessoa.nivel_instrucao}</b>
                  </span>
                  <span className="py-1">
                    Tipo de residência:
                    <b>{users?.Pessoa.Residencium.tipo}</b>
                  </span>
                  <span className="py-1">
                    Tempo de residência:
                    <b>{users?.Pessoa.Residencium.data_inicio}</b>
                  </span>
                </div>

                <hr className={styles.divider} />
                <h2> Informações do Conjugue</h2>

                {users?.Pessoa.Conjugue == null ||
                users?.Pessoa.estado_civil == "CASADO" ? (
                  <div className="flex flex-col">
                    <b className="text-red-500">Sem informação</b>
                    <Link
                      href={`/ferramenta/usuario/${users.Pessoa.id}`}
                      className={global.voltar}
                    >
                      + registrar
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="py-1">
                      Nome Completo:
                      <b>{users?.Pessoa.Conjugue.nome_completo}</b>
                    </span>
                    <span className="py-1">
                      Nível de instrução:
                      <b>{users?.Pessoa.Conjugue.nivel_instrucao}</b>
                    </span>
                    <span className="py-1">
                      Data nascimento :
                      <b>{users?.Pessoa.Conjugue.data_nascimento}</b>
                    </span>
                    <span className="py-1">
                      Número de dependentes:
                      <b>{users?.Pessoa.Conjugue.dependentes}</b>
                    </span>
                  </div>
                )}
              </article>
            )}
          </div>
      </section>
    </div>
  );
};

export default ConteudoInfo;
