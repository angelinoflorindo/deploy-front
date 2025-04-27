"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import {
  buscarCreditoValidadoByEmail,
  buscarInvestidor,
  buscarPagamentoByDev,
  calcularJurosCompostos,
  calcularPrestacaoSimples,
  pagarCreditos,
} from "@/app/actions/auth";
import { InvestidorProps } from "@/services/user.service";
import { CreditoUserProps, PagamentosProps } from "@/services/Credito.service";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const Conteudo = () => {
  const [valor, setValor] = useState("");

  const handleValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };

  const { data: session, status } = useSession();
  const params = useParams();
  const id = params.id;
  const [creditoData, setCreditoData] = useState<CreditoUserProps>({
    bilhete: undefined,
    email: undefined,
    id: undefined,
    primeiro_nome: undefined,
    segundo_nome: undefined,
    Devedor: {
      id: undefined,
      estado: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      Creditos: [],
    },
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
  const [saldo, setSaldo] = useState(0);
  const [prestacao, setPrestacao] = useState(0);
  const [montante, setMontante] = useState(0);
  const [limite, setLimite] = useState(0);

  const fetchData = async () => {
    const creditoByUser: CreditoUserProps = await buscarCreditoValidadoByEmail(
      session?.user.email
    );
    const investidordata: InvestidorProps = await buscarInvestidor(id);

    const limitePrestacao =
      investidordata.Diversificacaos[0].Emprestimo.prestacao;

    // calcular a prestação
    const pagamentoData: PagamentosProps = await buscarPagamentoByDev(
      creditoByUser.Devedor.id
    );

    let novaPrestacao = 1; // Default
    if (pagamentoData && pagamentoData.prestacao < 3) {
      novaPrestacao = pagamentoData.prestacao + 1;
    }
/*
    const saldo = Math.round(
      investidordata.Diversificacaos[0].Emprestimo.valor *
        (investidordata.Diversificacaos[0].taxa / 100)
    );*/

    const taxa = creditoByUser.Devedor.Creditos[0].juro - 2;
    const montante = await calcularJurosCompostos(
      creditoByUser.Devedor.Creditos[0].valor,
      taxa / 100,
      3
    );
    const parcela = await calcularPrestacaoSimples(
      creditoByUser.Devedor.Creditos[0].valor,
      taxa / 100,
      3
    );

    setMontante(montante);
    setSaldo(parcela);
    setPrestacao(novaPrestacao);
    setLimite(limitePrestacao);
    setUserData(investidordata);
    setCreditoData(creditoByUser);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValor(`${saldo}`);
  }, [saldo]);

  // calcular a prestação

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
            <b>Telemovel: </b> {userData.User.telemovel}
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

      {/* Aqui é onde muda */}
      <form
        action={pagarCreditos}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex justify-between w-[100%]">
          <span>
            <b>Prestação</b>: {prestacao}/3
          </span>
          <span>
            <b>Totalidade</b>: {montante},00kz
          </span>
        </div>

        <input type="hidden" name="investidorId" value={userData.id} />
        <input type="hidden" name="investUserId" value={userData.User.id} />
        <input type="hidden" name="prestacao" value={prestacao} />
        <input
          type="hidden"
          name="creditoId"
          value={creditoData.Devedor.Creditos[0].id}
        />
        <input type="hidden" name="devUserId" value={creditoData.id} />
        <input type="hidden" name="devedorId" value={creditoData.Devedor.id} />

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
