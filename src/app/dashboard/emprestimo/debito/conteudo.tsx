
/*
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { registrarDocumento, uploadDocumento } from "@/app/actions/auth";

import { UserInfo } from "@/services/user.service";

const Conteudo =  ({user}:{user:UserInfo}) => {
  
  async function submitForm(data:FormData) {
    "use server";
    
    data.append('tipo', 'BEM_MOVEL')
    data.append('user_id', `${user.id}`)
    

    const res = await fetch(`${process.env.CLIENT_URL}/api/upload`, {
      method: "POST",
      body: data,
    });

  return;
  
 // const res = await registrarDocumento(info)

    if (!res.ok) {
      console.log("Erro registrar documento!");
      return redirect("/dashboard/credito/decima/debito");
    }

    return redirect("/dashboard/credito/decima/solicitar");
  }

  return (
    <div>
      <h1 className="font-bold text-align">Ordem de débitos</h1>

      <form action={submitForm} className="shadow-md p-5">
        <h2>Titulo</h2>
        <input
          type="text"
          name="titulo"
          placeholder="Inserir"
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
            href="/dashboard/credito/decima"
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Voltar
          </Link>

          <button
            type="submit"
            className="px-4 py-2 bg-violet-500 text-white rounded"
          >
            Proximo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Conteudo;
*/