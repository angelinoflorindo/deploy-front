"use client";
import { submitDetalhes } from "@/app/actions/auth";
import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/modules/Login.module.css";
import { PessoaDef } from "@/services/user.service";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageInfo =  () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [pessoaData, setPessoaData] = useState<PessoaDef>({
    id: '',
    municipio: '',
    emprego_id: '',
    user_id: '',
    estado_civil: '',
    residencia_id: '',
    provincia: '',
    nivel_instrucao: '',
    data_nascimento: '',
    Conjugue: {
      id: '',
      nome_completo: '',
      nivel_instrucao: '',
      dependentes: '',
      data_nascimento: '',
    },
    Emprego: {
      id: '',
      data_inicio: '',
      sector: '',
      cargo: '',
      area: '',
      createdAt: '',
      updatedAt: '',
    },
    profissao: {},
    Conta: {
      id: '',
      nome: '',
      iban: '',
      salario: '',
      emprego_id: '',
      pessoa_id: '',
      createdAt: '',
      updatedAt: '',
    },
    Residencia: {
      id: '',
      tipo: '',
      data_inicio: '',
      createdAt: '',
      updatedAt: '',
    },
    User: {
      id: '',
      email: '',
    },
  });
  const fetchData =  () => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa/${id}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          router.push("/");
        }
        return res.json();
      })
      .then((user: PessoaDef) => {
        setPessoaData(user);
        return
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
   <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />
        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
           <form action={submitDetalhes}>
            <h2>
              <b>Informações financeiras</b>
            </h2>

            <input
              type="text"
              name="pessoaId"
              value={id}
              readOnly
              hidden={true}
            />

            <input
              type="text"
              name="empregoId"
              value={pessoaData.emprego_id}
              readOnly
              hidden={true}
            />

            <input
              type="text"
              name="userId"
              value={pessoaData.user_id}
              readOnly
              hidden={true}
            />
            {pessoaData.Conta == null ? (
              <div>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome do Banco"
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="iban"
                  placeholder="IBAN"
                  required
                  className={styles.input}
                />
                <input
                  type="number"
                  name="salario"
                  placeholder="Renda actual"
                  required
                  className={styles.input}
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  name="nome"
                  placeholder={pessoaData.Conta.nome}
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="iban"
                  placeholder={pessoaData.Conta.iban}
                  required
                  className={styles.input}
                />
                <input
                  type="number"
                  name="salario"
                  placeholder={pessoaData.Conta.salario}
                  required
                  className={styles.input}
                />
              </div>
            )}

            <input
              type="file"
              name="scanner"
              multiple={true}
              className={styles.input}
            />

            <div className="w-[100%] flex flex-row justify-around">
              <Link
                href="/ferramenta/detalhes"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Voltar
              </Link>

              <button
                type="submit"
                className="px-4 py-2 bg-violet-500 text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </form>
        </main>
        {/* Rodapé Fixo */} <Footer />
      </div>
    </div>
  );
};

export default PageInfo;
