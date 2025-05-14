"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import global from "@/modules/global.module.css";
import { useSession } from "next-auth/react";
import { UserInfo } from "@/services/user.service";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const ConteudoInfo = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserInfo | null>(null);
    const router = useRouter()

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
              user?.Pessoa.estado_civil == "CASADO" ? (
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
