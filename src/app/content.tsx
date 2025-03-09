import Image from "next/image";
import global from "@/modules/global.module.css"
import Link from "next/link";

const Content = () => {
    return (
        <div  className="flex flex-col  h-[100%] justify-center items-center">
            <h1 className={global.h2} ><b>Buscando a pagina ...</b></h1>
            <p className="w-[80%] text-start"> Aguarde alguns segundos  </p>
            
        </div>

    );
};

export default Content;
