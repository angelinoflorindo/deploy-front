"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import { useActionState, useEffect, useState } from "react";
import { pagarCreditos, reembolsarFundos } from "@/app/actions/auth";
import { EmprestimoValidado } from "@/services/Emprestimo.service";
import { InvestidorProps } from "@/services/user.service";
import { CreditoProps, CreditoUserProps } from "@/services/Credito.service";

const Conteudo = ({
  creditoData,
  userData,
  saldo,
  prestacao,
  montante,
}: {
  creditoData: CreditoUserProps;
  userData: InvestidorProps;
  saldo: any;
  prestacao: any;
  montante: any;
}) => {
  const [state, formAction] = useActionState(pagarCreditos, null);
  const [valor, setValor] = useState("");

  const handleValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };

  useEffect(() => {
    setValor(saldo);
  }, []);

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
        action={formAction}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex justify-between  w-[100%]">
          {" "}
          <span>
            {" "}
            <b>Prestação</b>: {prestacao}/3
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
          name="creditoId"
          readOnly={true}
          hidden={true}
          value={creditoData.Devedor.Creditos[0].id}
        />
        <input
          type="text"
          name="devUserId"
          readOnly={true}
          hidden={true}
          value={creditoData.id}
        />

        <input
          type="text"
          name="devedorId"
          readOnly={true}
          hidden={true}
          value={creditoData.Devedor.id}
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
