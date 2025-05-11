"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import global from "@/modules/global.module.css";
import { useSession } from "next-auth/react";
import { UserInfo } from "@/services/user.service";
import { redirect } from "next/navigation";
import Link from "next/link";

const ConteudoInfo = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserInfo | null>(null);
  if (!session?.user?.email) return redirect("/");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario?email=${session?.user?.email}`)
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
        <div className="flex flex-col   py-2">
          <h2> Informações adicionais</h2>
          {user?.Pessoa == null ? (
            <b className="text-red-500"> Sem Informação</b>
          ) : (
            <article>
              <div className="flex flex-col  ">
                <span className="py-1">
                  Nível de instrução:
                  <b>{user?.Pessoa.nivel_instrucao}</b>
                </span>
                <span className="py-1">
                  Tipo de residência:
                  <b>{user?.Pessoa.Residencium.tipo}</b>
                </span>
                <span className="py-1">
                  Tempo de residência:
                  <b>{user?.Pessoa.Residencium.data_inicio.split("T")[0]}</b>
                </span>
              </div>

              <hr className={styles.divider} />
              <h2> Informações do Conjugue</h2>

              {user?.Pessoa.Conjugue == null ||
              user?.Pessoa.estado_civil === "CASADO" ? (
                <div className="flex flex-col" >
                  <b className="text-red-500">Sem informação</b>
                  <Link href={`/ferramenta/usuario/${user.Pessoa.id}`} className={global.voltar}>+ registrar</Link>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="py-1">
                    Nome Completo:
                    <b>{user?.Pessoa.Conjugue.nome_completo}</b>
                  </span>
                  <span className="py-1">
                    Nível de instrução:
                    <b>{user?.Pessoa.Conjugue.nivel_instrucao}</b>
                  </span>
                  <span className="py-1">
                    Data nascimento :
                    <b>{user?.Pessoa.Conjugue.data_nascimento.split("T")[0]}</b>
                  </span>
                  <span className="py-1">
                    Número de dependentes:
                    <b>{user?.Pessoa.Conjugue.dependentes}</b>
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
