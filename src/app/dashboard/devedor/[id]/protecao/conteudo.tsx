"use client";
import React, { useEffect, useState } from "react";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";
import {
  buscarCreditoById,
  buscarUser,
  diversificarEmprestimo,
} from "@/app/actions/auth";
import { CreditoDef } from "@/services/Credito.service";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const Conteudo = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const id = params.id;
  const [taxa, setTaxa] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const router = useRouter();
  const [userData, setUserData] = useState<UserInfo>({
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
      Residencium: {
        id: undefined,
        tipo: undefined,
        data_inicio: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
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
  const [formData, setFormData] = useState<CreditoDef>({
    id: undefined,
    juro: undefined,
    estado: false,
    prazo: undefined,
    totalTaxa: "",
    pendencia: undefined,
    prestacao: undefined,
    progresso: undefined,
    totalGuardiaos: 0,
    user_id: undefined,
    valor: undefined,
    devedor_id: undefined,
    updatedAt: undefined,
    createdAt: undefined,
    taxaDiversificada: undefined,
    CreditoSolidarios: [],
    Devedor: {
      id: undefined,
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
      DebitoVinculados: [],
    },
  });

  const fetchData = async () => {
    const result:CreditoDef = await buscarCreditoById(id);
    const res:UserInfo = await buscarUser(session?.user.email);
    setSaldo(result.valor)
    setUserData(res);
    setFormData(result);
  };

  useEffect(() => {
    if (!id) {
      console.error("ID inválido");
      router.push("/");
      return;
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  });
  useEffect(() => {
    if (taxa < 0) {
      setTaxa(0);
    }
  }, [taxa]);
  return (
    <div>
      <div className="py-2">
        <h2 className="font-bold  py-2">Quantia disponível</h2>
        <small>Avalie quanto podes aplicar neste pedido</small>
        {saldo > 0 ? (
          <>{saldo},00kz</>
        ) : (
          <>
            <h3 className="text-blue-500 font-bold">
              {" "}
              Seja o primeiro a diversificar!
            </h3>
          </>
        )}
      </div>
      <div className="py-2">
        <h2 className="font-bold">Reduzir o risco</h2>
        <small>
          Decida quanto do valor total <br /> Pretende investir
        </small>
        <form action={diversificarEmprestimo}>
          <div className="flex flex-row justify-between items-center">
            <input
              type="text"
              name="taxa"
              value={taxa}
              readOnly={true}
              hidden={true}
            />
            <input
              type="text"
              name="emprestimo_id"
              value={formData.id}
              readOnly={true}
              hidden={true}
            />
            <input
              type="text"
              name="investidor_id"
              value={userData.Investidor.id}
              readOnly={true}
              hidden={true}
            />
            <span className="flex font-bold w-40 h-20 shadow-md justify-center items-center">
              {taxa}%
            </span>
            <span className="flex flex-col p-2 w-[100%] justify-between items-start">
              <div className="p-2">
                <Image
                  src="/img/aumentar.png"
                  width={30}
                  height={30}
                  alt=""
                  onClick={() => {
                    setTaxa(taxa + 1);
                  }}
                  className={global.footerImagem}
                />
              </div>
              <div className="p-2">
                <Image
                  src="/img/reduzir.png"
                  width={30}
                  height={30}
                  alt=""
                  onClick={() => {
                    setTaxa(taxa - 1);
                  }}
                  className={global.footerImagem}
                />
              </div>
            </span>
          </div>

          <div className="flex flex-row itmes-center  justify-around">
            <Link
              href={`/dashboard/proponente/${formData.id}`}
              className="bg-gray-500 text-white rounded px-6 py-2 "
            >
              Voltar
            </Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conteudo;
