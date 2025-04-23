"use client";
import { vincluarConta } from "@/app/actions/auth";
import styles from "@/modules/Login.module.css";
import { UserInfo } from "@/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState } from "react";

const Conteudo = ({ user }: { user: UserInfo }) => {
  const [state, formAction] = useActionState(vincluarConta, null);

  return (
    <div>
      <h1 className="font-bold text-align">Conta vinculada</h1>
      <p>
        Faça o depósito de uma quantia <br /> Que será retida durante o
        empréstimo
      </p>
      <form action={formAction} className="shadow-md p-5">
        <h2>Detalhe</h2>

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
          placeholder="Ex: 10000 (dez mil)"
          className={styles.input}
        />
        <h2>Anexar Documentos</h2>
        <input
          type="file"
          name="scanner"
          multiple={true}
          className="w-full  p-2 border rounded"
        />
        <div className="flex flex-row w-[100%] justify-between items-center  h-14">
          <Link
            href="/dashboard/emprestimo"
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Voltar
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 text-white rounded"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Conteudo;
