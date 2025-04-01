"use client";
import { clientAPI } from "@/app/lib/definitions";
import styles from "@/modules/global.module.css";
import { PessoaProps, UserProps } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const userApi = clientAPI;
export default function Conteudo() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProps | null>(null);
  const [pessoa, setPessoa] = useState<PessoaProps | null>(null);

  useEffect(() => {
    fetch(`${userApi}/api/usuario?email=${session?.user?.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar os dados");
        return res.json();
      })
      .then((users:UserProps) => {
        console.log("users", users)
        setUser(users)
        return
      });
  }, []);

  useEffect(() => {
    fetch(`${userApi}/api/usuario?email=${session?.user?.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar os dados");
        return res.json();
      })
      .then((users:UserProps) => {
        console.log("users", users)
        setUser(users)
        return
      });
  }, []);

  return (
    <div>
      <h1 className="font-bold text-center">Minha conta </h1>
      <section className="shadow-md p-5">
        <span>
          @<b>{session?.user?.name}</b>
        </span>
        <div className="flex flex-row justify-between  py-2">
          <div className="flex flex-col  ">
            <span className="py-1">
              Gênero: <b>{user?.genero}</b>
            </span>
            <span className="py-1">
              Telemovel: <b>{user?.telemovel}</b>
            </span>
            <span className="py-1">
              Bilhete: <b>{user?.bilhete}</b>
            </span>
            <span className="py-1">
              Email: <b>{user?.email}</b>
            </span>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className="flex flex-col">
          <span className="py-1">
            Estado civil : <b>{}</b>
          </span>
          <span className="py-1">
            Data nascimento : <b>1994</b>
          </span>
          <span className="py-1">
            Morada atual : <b>Luanda</b>
          </span>
          <span className="py-1">
            Município: <b>Cacuaco</b>
          </span>
        </div>
      </section>
    </div>
  );
}
