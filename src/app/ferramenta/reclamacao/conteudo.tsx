'use client';
import React, { useActionState} from "react";
import global from "@/modules/Login.module.css";
import { clientAPI } from "@/app/lib/definitions";
import { efectuarReclamacao } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submitButton";

const url = clientAPI;
const Conteudo = ({ userId }: { userId: number }) => {
  const [state, formAction] = useActionState(efectuarReclamacao, null);

  return (
    <div className="flex flex-col justify-around items-center ">
      <h1 className="font-bold text-center">Comunicar um problema</h1>

      <form action={formAction} className="shadow-md p-5 flex flex-col justify-center items-center">
       
        <input
            type="text"
            name="user_id"
            value={userId}
            readOnly={true}
            hidden={true}
          />

          <input
            type="text"
            name="assunto"
            placeholder="Assunto"
            className={global.input}
          />
          <textarea
            rows={4}
            cols={35}
            name="conteudo"
            className={global.input}
            placeholder="Descreva os detalhes do problema"
          ></textarea>
          <SubmitButton/>
       
      </form>
    </div>
  );
};

export default Conteudo;
