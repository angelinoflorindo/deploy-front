
"use client";
import global from "@/modules/global.module.css";
import { signOut } from "next-auth/react";

const Conteudo = () => {
  return (
    <div className="flex flex-col  h-[100%] justify-center items-center">
      <h1 className={global.h1}>
        <b>Pagina 404: Inexistente</b>
      </h1>
      <p className="w-[80%] text-start"> Voltar a se autenticar </p>
      <hr className={global.divider} />
      <div className="w-[80%] flex justify-start">
        <button className="bg-blue-500 text-white-500"  onClick={() => signOut({ callbackUrl: "/" })}>ir para login </button>
      </div>
    </div>
  );
};

export default Conteudo;
