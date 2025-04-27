"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import { InvestidorProps } from "@/services/user.service";
import { redirect } from "next/navigation";
import { clientAPI } from "@/app/lib/definitions";
import { signOut } from "next-auth/react";

const url = clientAPI;
const Conteudo = ({
  investidor,
  userId,
}: {
  investidor: InvestidorProps;
  userId: number;
}) => {
  const [data, setData] = useState<InvestidorProps>({
    id: "",
    maior_risco: false,
    maior_seguranca: false,
    estado: false,
    saque_antecipado: false,
    fundo_protegido: false,
    partilhar_emprestimo: false,
    user_id: "",
    createdAt: "",
    updatedAt: "",
    User:{
      id: "",
      primeiro_nome: "",
      segundo_nome: "",
      password: "",
      email: "",
      bilhete: "",
      telemovel: "",
      genero: "",
    },
    Diversificacaos:[]
  });
  useEffect(() => {
    if (investidor) {
      setData(investidor);
    }
  }, [investidor]);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData((prev: InvestidorProps) => ({ ...prev, [name]: checked }));
  };

  // console.log("verifcar o data", data)

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    const info = {
      maior_risco: data.maior_risco,
      maior_seguranca: data.maior_seguranca,
      saque_antecipado: data.saque_antecipado,
      fundo_protegido: data.fundo_protegido,
      partilhar_emprestimo: data.partilhar_emprestimo,
      estado: false,
      user_id: userId,
    };

    if (investidor) {
      const res = await fetch(`${url}/api/pessoa/investidor/${investidor.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (!res.ok) return signOut({ callbackUrl: "/" });
      return redirect("/ferramenta");
    }

    const res = await fetch(`${url}/api/pessoa/investidor`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (!res.ok) return signOut({ callbackUrl: "/" });

    return redirect("/ferramenta");
  }

  return (
    <div>
      <h1 className="font-bold text-center">Perfil de investidor </h1>
      <form onSubmit={submitForm}>
        <section className="shadow-md p-5">
          <h2>
            <b>Conservador</b>
          </h2>
          <div className="flex flex-col ">
            <span className="py-1 flex justify-between">
              Fundo de proteção
              <input
                type="checkbox"
                name="fundo_protegido"
                onChange={handler}
                checked={data.fundo_protegido}
                className="w-5 h-5"
              />
            </span>

            <span className="py-1 flex justify-between">
              Saques antecipados
              <input
                type="checkbox"
                name="saque_antecipado"
                onChange={handler}
                checked={data.saque_antecipado}
                className="w-5 h-5"
              />
            </span>

            <span className="py-1 flex justify-between">
              Diversificação de emprestimos
              <input
                type="checkbox"
                name="partilhar_emprestimo"
                onChange={handler}
                checked={data.partilhar_emprestimo}
                className="w-5 h-5"
              />
            </span>
          </div>

          <hr className={styles.divider} />

          <div className="flex flex-col">
            <span className="py-1 flex justify-between">
              Maior segurança e Menos retorno
              <input
                type="checkbox"
                name="maior_seguranca"
                onChange={handler}
                checked={data.maior_seguranca}
                className="w-5 h-5"
              />
            </span>
            {/* Agressivo*/}
            <span className="py-1 flex justify-between">
              Maior risco e Retornos altos
              <input
                type="checkbox"
                name="maior_risco"
                checked={data.maior_risco}
                onChange={handler}
                className="w-5 h-5"
              />
            </span>
          </div>
        </section>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 text-white rounded"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Conteudo;
