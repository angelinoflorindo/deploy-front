"use client";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import { useActionState, useState } from "react";
import { UserInfo } from "@/services/user.service";
import { submitCredito } from "@/app/actions/auth";

const Conteudo = ({ user }: { user: UserInfo }) => {
  const [valor, setValor] = useState<any>(0);
  const [state, formAction] = useActionState(submitCredito, null);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };
  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_solicitar}>
          <h1>
            <b>Valor:</b> {valor},00kz
          </h1>
          <h1>
            <b>Prestações:</b>4
          </h1>
        </div>
        <div className={global.cartao_direita_solicitar}>
          <h1>
            <b>Juros:</b> 10%
          </h1>
          <h1>
            <b>Até:</b> 10 dias
          </h1>
        </div>
      </header>

      <div className="py-4">
        <h1>
          <b>Crédito permitido:</b> max(50.000kz)
        </h1>
      </div>
      <div className="flex py-2 flex-col justify-center itmes-center">
        <form
          action={formAction}
          className="flex flex-col  justify-center itmes-center"
        >
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
            onChange={handler}
            placeholder="Ex:1000(mil Kz) "
            className={styles.input}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default Conteudo;
