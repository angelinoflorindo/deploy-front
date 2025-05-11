"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/Login.module.css";
import { signOut } from "next-auth/react";
import { ConjugueProps, PessoaProps, UserInfo } from "@/services/user.service";
import { redirect, useRouter, useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  const [user, setUser] = useState<PessoaProps | null>(null);
  const [conjugueData, setConjugueData] = useState<ConjugueProps>({
    id: "",
    nome_completo: "",
    dependentes: "",
    nivel_instrucao: "",
    data_nascimento: "",
  });
 

  const handleConjugue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConjugueData((prev: ConjugueProps) => ({ ...prev, [name]: value }));
  };

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    let infoConjugue = {
      nome_completo: conjugueData.nome_completo,
      dependentes: conjugueData.dependentes,
      nivel_instrucao: conjugueData.nivel_instrucao,
      data_nascimento: new Date(conjugueData.data_nascimento),
      pessoa_id: id,
    };

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa/conjugue`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(infoConjugue),
      }
    );

    if (!resp.ok) {
      console.log("error ao atualizar", resp.statusText);
      return signOut({ callbackUrl: "/" });
    }

    return redirect("/ferramenta/usuario")

  }
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa/${id}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          return redirect("/");
        }
        return res.json();
      })
      .then((users: PessoaProps) => {
        setUser(users);
        return;
      });
  }, []);

  if (user?.estado_civil === "CASADO") return redirect("/ferramenta/usuario");

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <form onSubmit={submitForm}>
            <h2>
              <b>Informações do conjugue</b>
            </h2>
            <input
              type="text"
              name="nome_completo"
              placeholder="Nome Completo"
              onChange={handleConjugue}
              required
              className={styles.input}
            />

            <input
              type="text"
              name="nivel_instrucao"
              placeholder="Grau Acadêmico"
              onChange={handleConjugue}
              required
              className={styles.input}
            />

            <label>
              Dependentes(Filhos e Flihas)
              <input
                type="number"
                name="dependentes"
                onChange={handleConjugue}
                placeholder="Inserir nova"
                className={styles.input}
              />
            </label>
            <label>
              Data de Nascimento
              <input
                type="date"
                name="data_nascimento"
                onChange={handleConjugue}
                className={styles.input}
              />
            </label>
            <div className="w-[100%] flex flex-row justify-around">
              <button
                type="button"
                onClick={() => {
                  router.push("/ferramenta/usuario");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Voltar
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Registrar
              </button>
            </div>
          </form>
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
