"use client";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import { useEffect, useState } from "react";
import { UserInfo } from "@/services/user.service";
import { buscarUser, solicitarCredito } from "@/app/actions/auth";
import { useSession } from "next-auth/react";

const Conteudo = () => {
  const [valor, setValor] = useState<string>("");
  const [prazo, setPrazo] = useState<string>("");
  const [guardiao, setGuardiao] = useState(false);

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
  const { data: session, status } = useSession();
  const fetchData = async () => {
    if (session?.user.email) {
      const user: UserInfo = await buscarUser(session?.user?.email);
      setUser(user);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const valorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };

  const prazoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrazo(e.target.value);
  };

  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_solicitar}>
          <h1>
            <b>Valor:</b> {valor},00kz
          </h1>
          <h1>
            <b>Prestações:</b>
            20/20 dias
          </h1>
        </div>
        <div className={global.cartao_direita_solicitar}>
          <h1>
            <b>Juros:</b>
            12%
          </h1>
          <h1>
            <b>Prazo:</b>
            {prazo}
          </h1>
        </div>
      </header>

      <div className="flex py-2 flex-col justify-center itmes-center">
        <div className="text-blue-500 text-xl font-bold">
          {guardiao
            ? "Guardião incluido"
            : "Pedido sem guardião"}
        </div>
        <form
          action={solicitarCredito}
          className="flex flex-col  justify-center itmes-center"
        >
          <input
            type="text"
            name="tipo"
            value="mensal"
            readOnly={true}
            hidden={true}
          />

          <input
            type="text"
            name="duracao"
            value="60_DIAS"
            readOnly={true}
            hidden={true}
          />

          <input
            type="number"
            name="prestacao"
            value="20"
            readOnly={true}
            hidden={true}
          />

          <input
            type="hidden"
            name="guardiao"
            value={guardiao ? "true" : "false"}
            readOnly
          />

          <input
            type="text"
            name="user_id"
            value={user.id}
            readOnly={true}
            hidden={true}
          />

          <input
            type="number"
            name="juro"
            value="12"
            readOnly={true}
            hidden={true}
          />
          <div className="p-2 mb-2">
            <input
              type="number"
              name="valor"
              onChange={valorHandler}
              placeholder="valor max. 150000,00kz"
              className={styles.input}
            />
            <input
              type="date"
              name="prazo"
              onChange={prazoHandler}
              className={styles.input}
            />
          </div>

          <div className="flex flex-row justify-around">
           <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => setGuardiao(prev => !prev)}
            >
              incluir guardião
            </button>

            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conteudo;
