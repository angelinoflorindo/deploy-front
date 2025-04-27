"use client";
import React, { useEffect, useState } from "react";
import global from "@/modules/Login.module.css";
import { clientAPI } from "@/app/lib/definitions";
import { buscarUser, efectuarReclamacao } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submitButton";
import { useSession } from "next-auth/react";
import { UserInfo } from "@/services/user.service";

const url = clientAPI;
const Conteudo = () => {
  const [userId, setUserID] = useState(0)

  const {data:session, status} = useSession()

  const fetchData = async ()=>{
    const userData: UserInfo = await buscarUser(session?.user?.email);
    setUserID(userData.id)
  }

  useEffect(()=>{
    fetchData()
  }, [])


  return (
    <div className="flex flex-col justify-around items-center ">
      <h1 className="font-bold text-center">Comunicar um problema</h1>

      <form action={efectuarReclamacao}
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
