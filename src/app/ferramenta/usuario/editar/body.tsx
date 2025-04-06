"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import { useSession } from "next-auth/react";
import { clientAPI } from "@/app/lib/definitions";
import { UserInfo } from "@/services/user.service";
import { redirect } from "next/navigation";

const userApi = clientAPI;
const Body = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserInfo | null>(null);
  //const [pessoa, setPessoa] = useState<UserInfo | null>(null);
  //const [conjugue, setConjugue] = useState<UserInfo | null>(null);
  //const [residencia, setResidencia] = useState<UserInfo | null>(null);

  useEffect(() => {
    fetch(`${userApi}/api/usuario?email=${session?.user?.email}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          return redirect("/");
        }
        return res.json();
      })
      .then((users: UserInfo) => {
        setUser(users);
        return;
      });
  }, []);

  return (
    <div>
      <h1 className="font-bold text-center">Minha conta </h1>

      <section className="shadow-md p-5">
        <div className="flex flex-row justify-between  py-2">
          <h2> Informações adicionais</h2>
          {user?.pessoa == null ? (
            <b className="text-red-500"> Sem Informação</b>
          ) : (
            <article>
              <div className="flex flex-col  ">
                <span className="py-1">
                  Nível de instrução:
                  <b>{user?.pessoa.nivel_instrucao}</b>
                </span>
                <span className="py-1">
                  Tipo de residência:
                  <b>{user?.pessoa.residencia.tipo}</b>
                </span>
                <span className="py-1">
                  Tempo de residência:
                  <b>{user?.pessoa.residencia.data_inicio}</b>
                </span>
              </div>

              <hr className={styles.divider} />
              <h2> Informações do conjugue</h2>

              {user?.pessoa.conjugue == null ? (
                <b className="text-red-500">Sem informação</b>
              ) : (
                <div className="flex flex-col">
                  <span className="py-1">
                    Nome Completo:
                    <b>{user?.pessoa.conjugue.nome_completo}</b>
                  </span>
                  <span className="py-1">
                    Nível de instrução:
                    <b>{user?.pessoa.conjugue.nivel_instrucao}</b>
                  </span>
                  <span className="py-1">
                    Data nascimento :
                    <b>{user?.pessoa.conjugue.data_nascimento}</b>
                  </span>
                  <span className="py-1">
                    <b>{user?.pessoa.conjugue.dependentes}</b>
                    Número de dependentes:
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

export default Body;
