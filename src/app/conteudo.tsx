import Image from "next/image";
import global from "@/modules/global.module.css"
import Link from "next/link";

const Conteudo = () => {
    return (
        <div  className="flex flex-col  h-[100%] justify-center items-center">
            <h1 className={global.h1} ><b>Pagina 404: Inexistente</b></h1>
            <p className="w-[80%] text-start"> Voltar a se autenticar  </p>
            <hr className={global.divider} />
            <div className="w-[80%] flex justify-start">
            <Link href="/" className={global.voltar}>
                Voltar
            </Link>
            </div>
        </div>

    );
};

export default Conteudo;
