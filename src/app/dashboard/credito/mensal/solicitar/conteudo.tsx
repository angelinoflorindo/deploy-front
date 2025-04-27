"use client";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import { useState } from "react";
import { UserInfo } from "@/services/user.service";
import { solicitarCredito } from "@/app/actions/auth";
import { useForm, useFormState } from "react-hook-form";

const Conteudo = ({ user }: { user: UserInfo }) => {
  const [valor, setValor] = useState<any>(0);
  const [prazo, setPrazo] = useState<any>(0);
  const [guardiao, setGuardiao] = useState(false);
  const { register, handleSubmit, control } = useForm<FormData>();
  const { isDirty, isValid } = useFormState({ control });

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
        <h3 className="text-blue-500">
          {guardiao
            ? "Guardiãos convidados"
            : "Sem guardiãos | clicar duas vezes!"}
        </h3>
        <form
          onSubmit={handleSubmit(solicitarCredito)}
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
            type="checkbox"
            checked={guardiao}
            name="guardiao"
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
              placeholder="valor max. 50000,00kz"
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
              onDoubleClick={() => {
                setGuardiao(false);
              }}
              onClick={() => {
                setGuardiao(true);
              }}
            >
              Guardião
            </button>

            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conteudo;
