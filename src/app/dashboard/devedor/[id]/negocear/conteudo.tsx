"use client";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { SubmitButton } from "@/components/submitButton";
import { useEffect, useState } from "react";
import { EmprestimoDef, UserInfo } from "@/services/user.service";
import { negocearEmprestimo } from "@/app/actions/auth";
import Link from "next/link";
import { useForm, useFormState } from "react-hook-form";

const Conteudo = ({
  user,
  formData,
}: {
  user: UserInfo;
  formData: EmprestimoDef;
}) => {
  const [valor, setValor] = useState<any>(0);
  const [prazo, setPrazo] = useState("");
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

  useEffect(() => {
    if (formData.valor) {
      setValor(formData.valor);
    }
    if (formData.juro) {
      setJuro(formData.juro);
    }
    if (formData.prestacao) {
      setPrestacao(formData.prestacao);
    }
    if (formData.prazo) {
      setPrazo(formData.prazo.split("T")[0]);
    }
  }, []);
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
        <h3 className="text-blue-500">Reajustar os termos</h3>
        <form
          onSubmit={handleSubmit(negocearEmprestimo)}
          className="flex flex-col  justify-center itmes-center"
        >
          <input
            type="text"
            name="emprestimo_id"
            value={formData.id}
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
              value={valor}
              onChange={valorHandler}
              className={styles.input}
            />

            <input
              type="number"
              name="juro"
              onChange={juroHandler}
              value={juro}
              className={styles.input}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <input
              type="number"
              name="prestacao"
              onChange={prestacaoHandler}
              value={prestacao}
              className={styles.input}
            />

            <input
              type="date"
              name="prazo"
              onChange={prazoHandler}
              value={prazo}
              className={styles.input}
            />
          </div>
          <div className="flex flex-row justify-around">
            <Link
              href={`/dashboard/proponente/${formData.id}`}
              className="px-4 py-2 bg-gray-500  text-white rounded cursor-pointer"
            >
              Voltar
            </Link>

            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conteudo;
