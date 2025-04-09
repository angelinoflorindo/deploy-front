
import React, { useState } from "react";
import global from "@/modules/Login.module.css";
import { clientAPI } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

const url = clientAPI;
const Conteudo = ({ userId }: { userId: number }) => {
 /* const [textData, setText] = useState("");
  const [formData, setFormData] = useState("");

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
*/
  async function submitForm(formData:FormData) {
    "use server";
  //  e.preventDefault();

    const info = {
      assunto: formData.get("assunto"),
      conteudo: formData.get("conteudo"),
      user_id: userId,
    };

    console.log("user client", info);
    const res = await fetch(`${url}/api/usuario/reclamacao`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (!res.ok) {
     return   signOut({ callbackUrl: "/" });
    } else {
      return redirect("/ferramenta");
    }
  }

  return (
    <div className="flex flex-col justify-around items-center ">
      <h1 className="font-bold text-center">Comunicar um problema</h1>

      <form action={submitForm}>
        <section className="shadow-md p-5">
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
          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 text-white rounded"
          >
            submeter
          </button>
        </section>
      </form>
    </div>
  );
};

export default Conteudo;
