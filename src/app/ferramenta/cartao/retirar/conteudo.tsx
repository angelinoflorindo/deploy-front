"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { UserInfo } from "@/services/user.service";
import { buscarUser, sacarFundos } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submitButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Conteudo = () => {
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
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const fetchData = async () => {
    const res: UserInfo = await buscarUser(session?.user?.email);
    setUser(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.id !== "") {
      if (user.Carteira === null || user.Carteira === undefined) {
        setIsRedirecting(true);
        router.push("/ferramenta/cartao");
      }

      if (user.Pessoa === null || user.Pessoa === undefined) {
        setIsRedirecting(true);
        router.push("/ferramenta/usuario");
      } else if (
        user.Pessoa.Conta === null ||
        user.Pessoa.Conta === undefined
      ) {
        setIsRedirecting(true);
        router.push("/ferramenta/detalhes");
      }
    }
  }, [user, router]); // depende de "user"

  if (isRedirecting) {
    return null; // ou loading spinner se quiser
  }

  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          <span>Destinar fundos à</span>
          <h1>
            <b>Gestor:</b> {user.primeiro_nome} {user.segundo_nome}
          </h1>

          <h3>
            <b>Conta:</b> {user.Pessoa.Conta.nome}
          </h3>
          <h3>
            <b>Iban:</b> {user.Pessoa.Conta.iban}
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
        action={sacarFundos}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          name="taxa"
          value={0}
          readOnly={true}
          hidden={true}
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
          name="valor"
          placeholder="Especificar o valor"
          required
          className={styles.input}
        />
        <SubmitButton />
      </form>
    </div>
  );
};

export default Conteudo;
