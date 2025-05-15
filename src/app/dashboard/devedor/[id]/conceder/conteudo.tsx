"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { EmprestimoDef, UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";
import { useEffect, useState } from "react";
import { CreditoDef } from "@/services/Credito.service";
import {
  buscarCreditoById,
  buscarUser,
  concederCredito,
} from "@/app/actions/auth";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const Conteudo = () => {
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
  const [creditoData, setCreditoData] = useState<CreditoDef>({
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
  const [valor, setValor] = useState("");
  const { data: session, status } = useSession();
  const params = useParams();
  const id = params.id;
  const router = useRouter()
  const handleValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };
  const fetchData = async () => {
    const res: UserInfo = await buscarUser(session?.user.email);
    const result: CreditoDef = await buscarCreditoById(id);

    setUserData(res);
    setCreditoData(result);
  };

      useEffect(() => {
        if (!id) {
          console.error('ID inválido');
          router.push("/")
          return  
        }
      }, [id]);

  useEffect(() => {
    fetchData();
    setValor(creditoData.valor);
  }, []);

  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          Transferir fundos à
          <h1>
            <b>Beneficiário:</b> {creditoData.Devedor.User.primeiro_nome}{" "}
            {creditoData.Devedor.User.segundo_nome}
          </h1>
          <h3>
            <b>Telemovel: </b>
            {creditoData.Devedor.User.telemovel}
          </h3>
        </div>
        <div className={global.cartao_direita_depositar}>
          <Image
            src="/img/logo.png"
            alt="Onix Corporation"
            width={30}
            height={30}
          />
        </div>
      </header>
      <form
        action={concederCredito}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          name="creditoId"
          readOnly={true}
          hidden={true}
          value={creditoData.id}
        />
        <input
          type="text"
          name="userId"
          readOnly={true}
          hidden={true}
          value={userData.id}
        />
        <input
          type="text"
          name="investidorId"
          readOnly={true}
          hidden={true}
          value={userData.Investidor.id}
        />

        <input
          type="text"
          name="devUserId"
          readOnly={true}
          hidden={true}
          value={creditoData.Devedor.User.id}
        />
        <input
          type="text"
          name="devedorId"
          readOnly={true}
          hidden={true}
          value={creditoData.Devedor.id}
        />

        <input
          type="number"
          name="valor"
          placeholder="Especificar o valor"
          required
          value={valor}
          onChange={handleValor}
          className={styles.input}
        />

        <SubmitButton />
      </form>
    </div>
  );
};

export default Conteudo;
