"use client";
import { buscarPessoa, submitDetalhes } from "@/app/actions/auth";
import Footer from "@/components/footer";
import Header from "@/components/header";
import styles from "@/modules/Login.module.css";
import { PessoaDef } from "@/services/user.service";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageInfo = async () => {
  const params = useParams();
  const id = params.id;
  const [pessoaData, setPessoaData] = useState<PessoaDef>({
    id: undefined,
    municipio: undefined,
    emprego_id: undefined,
    user_id: undefined,
    estado_civil: undefined,
    residencia_id: undefined,
    provincia: undefined,
    nivel_instrucao: undefined,
    data_nascimento: undefined,
    Conjugue: {
      id: undefined,
      nome_completo: undefined,
      nivel_instrucao: undefined,
      dependentes: undefined,
      data_nascimento: undefined,
    },
    Emprego: {
      id: undefined,
      data_inicio: undefined,
      sector: undefined,
      cargo: undefined,
      area: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    profissao: {},
    Contum: {
      id: undefined,
      nome: undefined,
      iban: undefined,
      salario: undefined,
      emprego_id: undefined,
      pessoa_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    Residencium: {
      id: undefined,
      tipo: undefined,
      data_inicio: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    User: {
      id: undefined,
      email: undefined,
    },
  });
  const fetchData = async () => {
    const pessoa: PessoaDef = await buscarPessoa(id);
    setPessoaData(pessoa);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.Contuminer}>
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
              readOnly={true}
              hidden={true}
            />

            <input
              type="text"
              name="empregoId"
              value={pessoaData.emprego_id}
              readOnly={true}
              hidden={true}
            />
            
            <input
              type="text"
              name="userId"
              value={pessoaData.user_id}
              readOnly={true}
              hidden={true}
            />
            {pessoaData.Contum === null ? (
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
                  placeholder={pessoaData.Contum.nome}
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="iban"
                  placeholder={pessoaData.Contum.iban}
                  required
                  className={styles.input}
                />
                <input
                  type="number"
                  name="salario"
                  placeholder={pessoaData.Contum.salario}
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

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
};

export default PageInfo;
