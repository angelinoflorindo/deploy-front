"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import Link from "next/link";

const Conteudo = () => {
  return (
    <div className={global.grid}>
      <div className={global.section}>
        {/* href="/dashboard/credito" */}
        <Link
          href="/desenvolvimento"
          className="flex flex-col justify-center font-bold justify-center items-center w-[100%] h-40 shadow-md"
        >
          <Image src="/img/dinheiro.png" width={50} height={60} alt="" />
          Créditos
        </Link>

        <Link
          href="/dashboard/emprestimo"
          className="flex flex-col justify-center font-bold justify-center items-center w-[100%] h-40 shadow-md"
        >
          <Image src="/img/carteira.png" width={50} height={60} alt="" />
          Emprestimos
        </Link>
      </div>
      <section className={global.section}>
        <Link
          href="/dashboard/proponente"
          className="flex flex-col justify-center font-bold justify-center items-center w-[100%] h-40 shadow-md"
        >
          <Image src="/img/proponente.png" width={50} height={60} alt="" />
          Proponentes
        </Link>

        <Link
          href="/dashboard/historico"
          className="flex flex-col justify-center font-bold justify-center items-center w-[100%] h-40 shadow-md"
        >
          <Image src="/img/historico.png" width={50} height={60} alt="" />
          Históricos
        </Link>
      </section>
    </div>
  );
};

export default Conteudo;
