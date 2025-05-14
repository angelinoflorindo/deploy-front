"use client";
import styles from "@/modules/global.module.css";
import { UserInfo } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Conteudo({users}:{users:UserInfo}) {
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
      {users ? (
      <section className="shadow-md p-5">
        <div className="flex flex-row justify-between  py-2">
          
            <div className="flex flex-col  ">
            <span className="py-1">
              Gênero: <b>{users?.genero}</b>
            </span>
            <span className="py-1">
              Telemovel: <b>{users?.telemovel}</b>
            </span>
            <span className="py-1">
              Bilhete: <b>{users?.bilhete}</b>
            </span>
            <span className="py-1">
              Email: <b>{users?.email}</b>
            </span>
          </div>
        </div>
        <hr className={styles.divider} />
        <h2>Informações complementares</h2>
        {users?.Pessoa == null ? (
          <b className="text-red-500">Sem informação</b>
        ) : (
          <div className="flex flex-col">
            <span className="py-1">
              Estado civil:
              <b>{users?.Pessoa.estado_civil}</b>
            </span>
            <span className="py-1">
              Data nascimento:
              <b>{users?.Pessoa.data_nascimento}</b>
            </span>
            <span className="py-1">
              Resindente em:
              <b>{users?.Pessoa.provincia}</b>
            </span>
            <span className="py-1">
              Município:
              <b>{users?.Pessoa.municipio}</b>
            </span>
          </div>
        )}
        
      </section>
      ):(<p>Carregando as informações ...</p>)}
    
    </div>
  );
}
