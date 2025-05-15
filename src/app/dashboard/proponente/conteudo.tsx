"use client";

import {
  EmprestimoDef,
  UserInfo,
} from "@/services/user.service";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  buscarPropostasOpDevedor,
  buscarPropostasOpProponente,
  buscarUser,
} from "@/app/actions/auth";
import {  useRouter } from "next/navigation";
import { CreditoDef } from "@/services/Credito.service";
import { useSession } from "next-auth/react";

export default function Conteudo() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserInfo>({
    id: "",
    bilhete: "",
    email: "",
    genero: "",
    password: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    Carteira: {
      id: "",
      codigo: "",
      createdAt: "",
      numero: "",
      saldo: "",
      updatedAt: "",
      user_id: "",
    },
    Depositos: {
      id: "",
      user_id: "",
      estado: true,
      pendencia: true,
      createdAt: "",
      updatedAt: "",
      valor: "",
    },
    Devedor: {
      id: "",
      estado: true,
      inadimplencia: "",
      adimplencia: "",
      solicitacao: "",
      updatedAt: "",
      createdAt: "",
      user_id: "",
    },
    Investidor: {
      id: undefined,
      maior_risco: false,
      maior_seguranca: false,
      saque_antecipado: false,
      fundo_protegido: false,
      partilhar_emprestimo: false,
      estado: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Diversificacaos: [],
    },
    Documentos: {
      id: undefined,
      tipo: undefined,
      titulo: undefined,
      nome_salvado: undefined,
      nome_original: undefined,
      extensao: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
    },
    Papel: {
      id: undefined,
      perfil: undefined,
    },
    Pessoa: {
      id: undefined,
      estado_civil: undefined,
      provincia: undefined,
      municipio: undefined,
      profissao: undefined,
      user_id: undefined,
      emprego_id: undefined,
      residencia_id: undefined,
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
      Residencia: {
        id: undefined,
        tipo: undefined,
        data_inicio: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Conta: {
        id: undefined,
        nome: undefined,
        iban: undefined,
        salario: undefined,
        emprego_id: undefined,
        pessoa_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      User: {
        id: undefined,
        email: undefined,
      },
    },
    Proponente: {
      id: undefined,
      solicitacao: undefined,
      reembolsar: undefined,
      satisfeitos: undefined,
      insatisfeitos: undefined,
      estado: false,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Emprestimos: [],
    },
    Reclamacaos: {
      id: undefined,
      assunto: undefined,
      conteudo: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    Saque: {
      id: undefined,
      taxa: undefined,
      valor: undefined,
      estado: true,
      pendencia: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
  });
  const [propostas, setPropostas] = useState<EmprestimoDef[]>([]);
  const [creditos, setCreditos] = useState<CreditoDef[]>([]);
  const [step, setStep] = useState(true);
  const [pageE, setPageE] = useState(1);
  const [pageC, setPageC] = useState(1);
  const router = useRouter()
  const [totalPagesE, setTotalPagesE] = useState(1);
  const [totalPagesC, setTotalPagesC] = useState(1);
  const [isRedirecting, setIsRedirecting] = useState(false)
  const fetchData = async () => {
    const res: UserInfo = await buscarUser(session?.user?.email);
    setUser(res);

    const response: any = {};
    if (user.Proponente) {
      response.search = await buscarPropostasOpProponente(user.Proponente.id, {
        pageE,
      });
    } else {
      response.search = await buscarPropostasOpProponente(null, {
        pageE,
      });
    }
    if (user.Devedor) {
      response.credito = await buscarPropostasOpDevedor(user.Devedor.id, {
        pageC,
      });
    } else {
      response.credito = await buscarPropostasOpDevedor(null, {
        pageC,
      });
    }

    setPropostas(response.search.data);
    setTotalPagesE(response.search.totalPages);
    setPageE(response.search.total);

    setPageC(response.credito.total);
    setCreditos(response.credito.data);
    setTotalPagesC(response.credito.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.id !== "") {
      if (user.Investidor == null || user.Investidor == undefined) {
        setIsRedirecting(true);
        router.push("/ferramenta/investidor");
      } else if (user.Carteira == null || user.Carteira == undefined) {
        setIsRedirecting(true);
        router.push("/ferramenta/cartao");
      }
    }
  }, [user, router]); // depende de "user"

  if (isRedirecting) {
    return null; // ou loading spinner se quiser
  }
  
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Solicitações!</h1>
      <div className="flex flex-col">
        <section className="px-2 py-4 bg-white rounded shadow-md flex flex-row justify-around">
          <article
            onClick={() => {
              setStep(true);
            }}
            className="flex flex-col  justify-center hover:bg-gray-100  items-center cursor-pointer"
          >
            <button type="button" className="font-bold cursor-pointer">
              Emprestimos{" "}
            </button>
          </article>

          <article
            onClick={() => {
              setStep(false);
            }}
            className="flex flex-col justify-center hover:bg-gray-100 items-center cursor-pointer"
          >
            <button type="button" className="font-bold cursor-pointer">
              Créditos
            </button>
          </article>
        </section>
        {step ? (
          <section className="py-4">
            <div>
              {propostas.map((emp, index) => {
                return (
                  <div key={emp.id}>
                    <Link
                      href={`/dashboard/proponente/${emp.id}`}
                      className="flex flex-row justify-evenly p-4   shadow-md w-[100%]"
                    >
                      <Image
                        src="/img/guardiao.png"
                        width={40}
                        height={30}
                        alt=""
                      />
                      <div className="flex flex-col w-[100%] px-4">
                        <span>
                          {emp.Proponente.User.primeiro_nome}{" "}
                          {emp.Proponente.User.segundo_nome}
                        </span>
                        <div className="flex flex-row justify-between items-center">
                          <span className="flex font-bold justify-center items-center">
                            {emp.valor},00kz
                          </span>
                          <span className="flex  justify-center items-center">
                            <b className="px-2">{emp.juro}%</b> mensal
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setPageE((prev) => Math.max(prev - 1, 1))}
                disabled={pageE === 1}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>
                Página {pageE} de {totalPagesE}
              </span>
              <button
                onClick={() =>
                  setPageE((prev) => Math.min(prev + 1, totalPagesE))
                }
                disabled={pageE === totalPagesE}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </section>
        ) : (
          <section className="py-4">
            <div>
              {creditos.map((emp, index) => {
                return (
                  <div key={emp.id}>
                    <Link
                      href={`/dashboard/devedor/${emp.id}`}
                      className="flex flex-row justify-evenly p-4   shadow-md w-[100%]"
                    >
                      <Image
                        src="/img/guardiao.png"
                        width={40}
                        height={30}
                        alt=""
                      />
                      <div className="flex flex-col w-[100%] px-4">
                        <span>
                          {emp.Devedor.User.primeiro_nome}{" "}
                          {emp.Devedor.User.segundo_nome}
                        </span>
                        <div className="flex flex-row justify-between items-center">
                          <span className="flex font-bold justify-center items-center">
                            {emp.valor},00kz
                          </span>
                          <span className="flex  justify-center items-center">
                            <b className="px-2">{emp.juro}%</b> mensal
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setPageC((prev) => Math.max(prev - 1, 1))}
                disabled={pageC === 1}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
              >
                Anterior
              </button>
              <span>
                Página {pageC} de {totalPagesC}
              </span>
              <button
                onClick={() =>
                  setPageC((prev) => Math.min(prev + 1, totalPagesC))
                }
                disabled={pageC === totalPagesC}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
              >
                Próxima
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* 
 
*/
