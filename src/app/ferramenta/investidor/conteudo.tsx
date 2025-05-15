"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import { InvestidorSimps, UserInfo } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Conteudo = () => {
  const [userId, setUserID] = useState(0);
  const router = useRouter();
  const [data, setData] = useState<InvestidorSimps>({
    id: "",
    maior_risco: false,
    maior_seguranca: false,
    estado: true,
    saque_antecipado: false,
    fundo_protegido: false,
    partilhar_emprestimo: false,
    user_id: "",
    createdAt: "",
    updatedAt: "",
  });
  const [pessoa, setPessoa] = useState<any>("")
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
        setData(user.Investidor);
        setPessoa(user.Pessoa)
      });
  };

  useEffect(() => {
    if (session?.user.email) {
      fetchData();
    }
  }, []);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData((prev: InvestidorSimps) => ({ ...prev, [name]: checked }));
  };

  // console.log("verifcar o data", data)

  function submitForm(e: React.FormEvent) {
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

    if (data) {
      fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa/investidor/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(info),
        }
      ).then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          router.push("/ferramenta/");
        }
        return res.json();
      });
      window.location.reload();
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa/investidor`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    }).then((res) => {
      if (!res.ok) {
        console.log("Erro ao buscar os dados");
        router.push("/ferramenta/");
      }
      return res.json();
    });

    window.location.reload();
    return;
  }

    if (!pessoa || !pessoa.Conta) {
    return (
      <div>
        <section className="shadow-md py-5 px-5 ">
          <span className="text-green-500">(*) Sem Informações Pessoais</span> <br />
          <span className="text-green-500">(*) Sem Informações Financeiras</span>
        </section>
        <button
          onClick={() => {
            router.push("/ferramenta/");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
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
