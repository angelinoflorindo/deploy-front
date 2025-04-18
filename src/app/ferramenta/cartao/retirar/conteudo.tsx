"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { UserInfo } from "@/services/user.service";
import { sacarFundos } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submitButton";
import { useActionState } from "react";
import { redirect } from "next/navigation";

const Conteudo = ({ user }: { user: UserInfo }) => {
  const [state, formAction] = useActionState(sacarFundos, null);

  //console.log(user)
  if(user.Carteira === null || user.Carteira === undefined){
    return redirect('/ferramenta/cartao')
  }

  if (user.Pessoa === null || user.Pessoa === undefined) {
    return redirect("/ferramenta/usuario");
  }

  if(user.Pessoa.Contum === null || user.Pessoa.Contum === undefined){
    return redirect('/ferramenta/detalhes')
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
            <b>Conta:</b> {user.Pessoa.Contum.nome}
          </h3>
          <h3>
            <b>Iban:</b> {user.Pessoa.Contum.iban}
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
