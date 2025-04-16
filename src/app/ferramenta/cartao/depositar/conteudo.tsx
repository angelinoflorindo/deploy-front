"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { UserInfo } from "@/services/user.service";
import { carregarConta } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submitButton";
import { useActionState, useState } from "react";
import { redirect } from "next/navigation";

const Conteudo = ({ user }: { user: UserInfo }) => {
  const [state, formAction] = useActionState(carregarConta, null);

  if (user.Carteira === null || user.Carteira === undefined) {
    return redirect("/ferramenta/cartao");
  }

  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          <h1>
            <b>Gestor</b> Angelino Franisco
          </h1>
          <h3>
            <b>Conta</b> 1233255756
          </h3>
          <h3>
            <b>Iban</b> 0040.0000.4234
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
          type="number"
          name="user_id"
          readOnly
          value={user.id}
          hidden={true}
        />

        <input
          type="number"
          name="valor"
          placeholder="Especificar o valor"
          required
          className={styles.input}
        />
        <input
          type="file"
          name="scanner"
          multiple={true}
          className={styles.input}
        />
        <SubmitButton />
      </form>
    </div>
  );
};

export default Conteudo;
