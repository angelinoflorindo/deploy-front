"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { EmprestimoDef, UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";
import { useActionState, useEffect, useState } from "react";
import { concederEmprestimo } from "@/app/actions/auth";

const Conteudo = ({
  emprestimoData,
  saldo,
  userData,
}: {
  emprestimoData: EmprestimoDef;
  saldo: any;
  userData: UserInfo;
}) => {
  const [state, formAction] = useActionState(concederEmprestimo, null);
  const [valor, setValor] = useState('');

  const handleValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };

  useEffect(() => {
    if (
      emprestimoData.taxaDiversificada > 100 ||
      emprestimoData.taxaDiversificada === 100
    ) {
      setValor(emprestimoData.valor);
    }

    setValor(saldo);
  }, []);

  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          Transferir fundos à
          <h1>
            <b>Beneficiário:</b> {emprestimoData.Proponente.User.primeiro_nome}{" "}
            {emprestimoData.Proponente.User.segundo_nome}
          </h1>
          <h3>
            <b>Telemovel: </b>
            {emprestimoData.Proponente.User.telemovel}
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
          <input
          type="text"
          name="emprestimoId"
          readOnly={true}
          hidden={true}
          value={emprestimoData.id}
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
          name="propUserId"
          readOnly={true}
          hidden={true}
          value={emprestimoData.Proponente.User.id}
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
