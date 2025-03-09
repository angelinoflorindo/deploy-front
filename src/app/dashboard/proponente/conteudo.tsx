import Image from "next/image";
import Link from "next/link";

const Conteudo = () => {
    return (
        <div>
            <h1 className="font-bold text-center py-2">Proponentes</h1>
            <Link href="/dashboard/proponente/3" className="flex flex-row justify-evenly p-4   shadow-md w-[100%]" >
                <Image src="/img/guardiao.png"  width={40} height={30} alt="" />
                <div className="flex flex-col w-[100%] px-4" >
                    <span  >Celeste Domingos</span>
                    <div className="flex flex-row justify-between items-center" >
                        <span className="flex font-bold justify-center items-center">
                            XY,00KZ
                        </span>
                        <span className="flex  justify-center items-center">
                            <b className="px-2">8%</b> mensal
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Conteudo;
