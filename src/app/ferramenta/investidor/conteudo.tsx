"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import { InvestidorSimps, UserInfo } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Conteudo = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userId, setUserID] = useState(0);
  const [pessoa, setPessoa] = useState<any>({});
  const [controller, setInvestidor] = useState<any>({});
  const [investidorData, setData] = useState<InvestidorSimps>({
    id: "",
    estado: true,
    fundo_protegido: false,
    maior_risco: false,
    maior_seguranca: false,
    saque_antecipado: false,
    partilhar_emprestimo: false,
    user_id: "",
    createdAt: "",
    updatedAt: "",
  });

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setData((prev: InvestidorSimps) => ({ ...prev, [name]: checked }));
  };

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
        setInvestidor(user.Investidor);
        setPessoa(user.Pessoa);
      });
  };

  useEffect(() => {
    if (session?.user.email) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (
      controller &&
      typeof controller == "object" &&
      Object.keys(controller).length > 0 &&
      controller.hasOwnProperty("fundo_protegido")
    ) {
      setData(controller);
    }
  }, [controller]);

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    const info = {
      maior_risco: investidorData.maior_risco,
      maior_seguranca: investidorData.maior_seguranca,
      saque_antecipado: investidorData.saque_antecipado,
      fundo_protegido: investidorData.fundo_protegido,
      partilhar_emprestimo: investidorData.partilhar_emprestimo,
      estado: false,
      user_id: userId,
    };

    if (
      controller &&
      typeof controller == "object" &&
      Object.keys(controller).length > 0 &&
      controller.hasOwnProperty("fundo_protegido")
    ) {
      fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa/investidor/${controller.id}`,
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
          <span className="text-green-500">(*) Sem Informações Pessoais</span>{" "}
          <br />
          <span className="text-green-500">
            (*) Sem Informações Financeiras
          </span>
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
          <div className="flex flex-col ">
            <span className="py-1 flex justify-between">
              Fundo de proteção
              <input
                type="checkbox"
                name="fundo_protegido"
                checked={!!investidorData.fundo_protegido}
                onChange={handler}
                className="w-5 h-5"
              />
            </span>

            <span className="py-1 flex justify-between">
              Saques antecipados
              <input
                type="checkbox"
                name="saque_antecipado"
                checked={!!investidorData.saque_antecipado}
                onChange={handler}
                className="w-5 h-5"
              />
            </span>

            <span className="py-1 flex justify-between">
              Diversificação de emprestimos
              <input
                type="checkbox"
                name="partilhar_emprestimo"
                checked={!!investidorData.partilhar_emprestimo}
                onChange={handler}
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
                checked={!!investidorData.maior_seguranca}
                onChange={handler}
                className="w-5 h-5"
              />
            </span>
            {/* Agressivo*/}
            <span className="py-1 flex justify-between">
              Maior risco e Retornos altos
              <input
                type="checkbox"
                name="maior_risco"
                checked={!!investidorData.maior_risco}
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
