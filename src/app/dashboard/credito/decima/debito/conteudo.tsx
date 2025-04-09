import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import Link from "next/link";

const Conteudo = () => {
  return (
    <div>
      <h1 className="font-bold text-align">Ordem de débitos</h1>

      <form action="" method="post" className="shadow-md p-5">
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
          accept="image/*"
          className="w-full  p-2 border rounded"
        />
      </form>

      <div className="flex flex-row w-[100%] justify-between items-center  h-14">
        <Link
          href="/dashboard/credito/decima"
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Voltar
        </Link>
        <Link
          href="/dashboard/credito/decima/solicitar"
          type="submit"
          className="px-4 py-2 bg-violet-500 text-white rounded"
        >
          Proximo
        </Link>
      </div>
    </div>
  );
};

export default Conteudo;
