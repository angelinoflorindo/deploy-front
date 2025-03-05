import Image from "next/image";
import global from "@/modules/global.module.css"

const Conteudo = () => {
    return (

        <div className={global.grid} >
            <div className="flex flex-col justify-center font-bold justify-center items-center w-[100%] h-40 shadow-lg">
                <Image src="/img/dinheiro.png" width={50} height={60} alt="" />
                Solicitar créditos
            </div>
            <section className={global.section}>
                <div className="flex flex-col justify-center font-bold justify-center items-center w-[100%] h-40 shadow-lg">
                    <Image src="/img/proponente.png"  width={50} height={60} alt="" />
                    Proponentes
                </div>

                <div className="flex flex-col justify-center font-bold justify-center items-center w-[100%] h-40 shadow-lg">
                    <Image src="/img/historico.png" width={50} height={60} alt="" />
                    Históricos
                </div>
            </section>
        </div>
    );
};

export default Conteudo;
