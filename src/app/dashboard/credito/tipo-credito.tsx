import Image from "next/image";
import global from "@/modules/global.module.css"
import Link from "next/link";

const TipoCredito = () => {
    return (

        <div className={global.grid} >
            <h1 className="font-bold text-center">Escolher o tipo </h1>

            <section className={global.sectionLink}>
                <Link href="/dashboard/credito/tipo-credito/2" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md" >
                    <Image src="/img/dinheiro.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Crédito consumo
                </Link>

                <Link href="/dashboard/credito/tipo-credito/2" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md" >
                    <Image src="/img/dinheiro.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Crédito 10 dias 
                </Link>
                <Link href="/dashboard/credito/tipo-credito/2" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md">
                    <Image src="/img/dinheiro.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Crédito 20 dias
                </Link>
                <Link href="/dashboard/credito/tipo-credito/2" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md">
                    <Image src="/img/dinheiro.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Crédito 30 dias 
                </Link>
            </section>
        </div>
    );
};

export default TipoCredito;
