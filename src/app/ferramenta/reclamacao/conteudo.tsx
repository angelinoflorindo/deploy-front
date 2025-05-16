"use client";
import React, { useEffect, useState } from "react";
import global from "@/modules/Login.module.css";
import {  efectuarReclamacao } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submitButton";
import { useSession } from "next-auth/react";
import { UserInfo } from "@/services/user.service";
import { useRouter } from "next/navigation";

const Conteudo = () => {
  const [userId, setUserID] = useState(0);
  const router = useRouter();
  const { data: session, status } = useSession();

  const fetchData = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario?email=${session?.user?.email}`
    )
      .then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          router.push("/");
        }
        return res.json();
      })
      .then((user: UserInfo) => {
        setUserID(user.id);
      });
  };

  useEffect(() => {
    if (session?.user.email) {
      fetchData();
    }
  }, []);

  return (
    <div className="flex flex-col justify-around items-center ">
      <h1 className="font-bold text-center">Comunicar um problema</h1>

      <form
        action={efectuarReclamacao}
        className="shadow-md p-5 flex flex-col justify-center items-center"
      >
        <input
          type="text"
          name="user_id"
          value={userId}
          readOnly={true}
          hidden={true}
        />

        <input
          type="text"
          name="assunto"
          placeholder="Assunto"
          className={global.input}
        />
        <textarea
          rows={4}
          cols={35}
          name="conteudo"
          className={global.input}
          placeholder="Descreva os detalhes do problema"
        ></textarea>
        <SubmitButton />
      </form>
    </div>
  );
};

export default Conteudo;
