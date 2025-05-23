"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import { useEffect, useState } from "react";
import {
  buscarEmprestimoValidadoByEmail,
  buscarInvestidor,
  buscarReembolsoByProp,
  calcularJurosSimples,
  calcularPrestacaoSimples,
  reembolsarFundos,
} from "@/app/actions/auth";
import {
  EmprestimoValidado,
  ReembolsoProps,
} from "@/services/Emprestimo.service";
import { InvestidorProps } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const Conteudo = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [emprestimoData, setEmprestimoData] = useState<EmprestimoValidado>({
    bilhete: undefined,
    email: undefined,
    id: '',
    primeiro_nome: '',
    Proponente: {
      id: '',
      createdAt: undefined,
      estado: true,
      updatedAt: undefined,
      user_id: undefined,
      Emprestimos: [
        {
          id: '',
          valor: '',
          estado: undefined,
          juro: '',
          prestacao: '',
          prazo: undefined,
          progresso: undefined,
          proponente_id: undefined,
          pendencia: undefined,
          user_id: '',
          createdAt: undefined,
          updatedAt: undefined,
          Diversificacaos: [],
        },
      ],
    },
    segundo_nome: '',
  });
  const [userData, setUserData] = useState<InvestidorProps>({
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
    User: {
      id: "",
      primeiro_nome: "",
      segundo_nome: "",
      password: "",
      email: "",
      bilhete: "",
      telemovel: "",
      genero: "",
    },
    Diversificacaos: [],
  });

  const [valor, setValor] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [prestacao, setPrestacao] = useState(0);
  const [montante, setMontante] = useState(0);
  const [limite, setLimite] = useState(0);

  const handleValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };

  const fetchData = async () => {
    const emprestimoByUser: EmprestimoValidado =
      await buscarEmprestimoValidadoByEmail(session?.user.email);
    const investidordata: InvestidorProps = await buscarInvestidor(id);
    const limitePrestacao =
      investidordata.Diversificacaos[0].Emprestimos.prestacao;

    // calcular a prestação
    let Installment: any = {};
    const reembolsoData: ReembolsoProps = await buscarReembolsoByProp(
      emprestimoByUser.Proponente.id
    );

    if (!reembolsoData || reembolsoData === undefined) {
      setPrestacao(1)
    } else if (reembolsoData.prestacao < limitePrestacao) {
        setPrestacao(reembolsoData.prestacao + 1)
    }

    const balance = Math.round(
      investidordata.Diversificacaos[0].Emprestimos.valor *
        (investidordata.Diversificacaos[0].taxa / 100)
    );
    const taxa = investidordata.Diversificacaos[0].Emprestimos.juro / 100;
    const montante = await calcularJurosSimples(balance, taxa, limitePrestacao);
    const simples = await calcularPrestacaoSimples(
      balance,
      taxa,
      limitePrestacao
    );
    const arround = Math.round(montante);

    setMontante(arround);
    setSaldo(simples);
    setLimite(limitePrestacao);
    setUserData(investidordata);
    setEmprestimoData(emprestimoByUser);
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
  }, []);

  useEffect(()=>{
    setValor(`${saldo}`);
  }, [saldo])

  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          Transferir fundos à
          <h1>
            <b>Beneficiário:</b> {userData.User.primeiro_nome}{" "}
            {userData.User.segundo_nome}
          </h1>
          <h3>
            <b>Telemovel: </b>
            {userData.User.telemovel}
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
        action={reembolsarFundos}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex justify-between  w-[100%]">
          {" "}
          <span>
            {" "}
            <b>Prestação</b>: {prestacao}/ {limite}{" "}
          </span>{" "}
          <span>
            <b>Totalidade</b>: {montante},00kz
          </span>
        </div>

        <input
          type="text"
          name="investidorId"
          readOnly={true}
          hidden={true}
          value={userData.id}
        />

        <input
          type="text"
          name="investUserId"
          readOnly={true}
          hidden={true}
          value={userData.User.id}
        />

        <input
          type="text"
          name="prestacao"
          readOnly={true}
          hidden={true}
          value={prestacao}
        />

        <input
          type="text"
          name="emprestimoId"
          readOnly={true}
          hidden={true}
          value={userData.Diversificacaos[0]?(userData.Diversificacaos[0].emprestimo_id):('')}
        />
        <input
          type="text"
          name="propUserId"
          readOnly={true}
          hidden={true}
          value={emprestimoData.id}
        />

        <input
          type="text"
          name="proponenteId"
          readOnly={true}
          hidden={true}
          value={emprestimoData.Proponente.id}
        />

        <input
          type="text"
          name="detalhe"
          placeholder="Detalhes"
          required
          className={styles.input}
        />
        <input
          type="text"
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
