"use client";
import styles from "@/modules/global.module.css";
import { UserInfo } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Conteudo({users}:{users:UserInfo}) {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(users);

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
      {userInfo ? (
      <section className="shadow-md p-5">
        <div className="flex flex-row justify-between  py-2">
          
            <div className="flex flex-col  ">
            <span className="py-1">
              Gênero: <b>{userInfo?.genero}</b>
            </span>
            <span className="py-1">
              Telemovel: <b>{userInfo?.telemovel}</b>
            </span>
            <span className="py-1">
              Bilhete: <b>{userInfo?.bilhete}</b>
            </span>
            <span className="py-1">
              Email: <b>{userInfo?.email}</b>
            </span>
          </div>
        </div>
        <hr className={styles.divider} />
        <h2>Informações complementares</h2>
        {userInfo?.Pessoa == null ? (
          <b className="text-red-500">Sem informação</b>
        ) : (
          <div className="flex flex-col">
            <span className="py-1">
              Estado civil:
              <b>{userInfo?.Pessoa.estado_civil}</b>
            </span>
            <span className="py-1">
              Data nascimento:
              <b>{userInfo?.Pessoa.data_nascimento}</b>
            </span>
            <span className="py-1">
              Resindente em:
              <b>{userInfo?.Pessoa.provincia}</b>
            </span>
            <span className="py-1">
              Município:
              <b>{userInfo?.Pessoa.municipio}</b>
            </span>
          </div>
        )}
        
      </section>
      ):(<p>Carregando as informações ...</p>)}
    
    </div>
  );
}
