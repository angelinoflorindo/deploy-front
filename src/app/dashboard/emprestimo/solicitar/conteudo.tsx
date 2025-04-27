"use client";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import { useState } from "react";
import { UserInfo } from "@/services/user.service";
import { submitEmprestimo } from "@/app/actions/auth";
import { useForm, useFormState } from "react-hook-form";

const Conteudo = ({ user }: { user: UserInfo }) => {
  const [valor, setValor] = useState<any>(0);
  const [prazo, setPrazo] = useState("");
  const [guardiao, setGuardiao] = useState(false);
  const [juro, setJuro] = useState<any>(0);
  const [prestacao, setPrestacao] = useState<any>(0);
  const { register, handleSubmit, control } = useForm<FormData>();
  const { isDirty, isValid } = useFormState({ control });

  const valorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };

  const prazoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrazo(e.target.value);
  };

  const prestacaoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrestacao(e.target.value);
  };

  const juroHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJuro(e.target.value);
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
            {prestacao}
          </h1>
        </div>
        <div className={global.cartao_direita_solicitar}>
          <h1>
            <b>Juros:</b>
            {juro}%
          </h1>
          <h1>
            <b>Prazo:</b> {prazo}
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
          onSubmit={handleSubmit(submitEmprestimo)}
          className="flex flex-col  justify-center itmes-center"
        >
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
          <div className="flex flex-row justify-center items-center">
            <input
              type="number"
              name="valor"
              onChange={valorHandler}
              placeholder="Ex:1000(mil Kz) "
              className={styles.input}
            />

            <input
              type="number"
              name="juro"
              onChange={juroHandler}
              placeholder="Juros Ex:10"
              className={styles.input}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <input
              type="number"
              name="prestacao"
              onChange={prestacaoHandler}
              placeholder="prestações Ex: 8"
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
