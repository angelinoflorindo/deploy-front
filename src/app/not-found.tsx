"use client";
import styles from "@/modules/Login.module.css";
import global from "@/modules/global.module.css";
import { signOut } from "next-auth/react";

export default function Notfound() {
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <h1 className={global.h1}>
            <b>Página 404: Inexistente</b>
          </h1>
          <p className="w-[80%] text-start"> Voltar a se autenticar </p>
          <hr className={global.divider} />
          <div className="w-[80%] flex justify-start">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              ir para login{" "}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
