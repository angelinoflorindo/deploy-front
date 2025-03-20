import Image from "next/image";
import global from "@/modules/global.module.css"
import Link from "next/link";

const Conteudo = () => {
    return (

    
        <div className={global.grid} >
            <h1 className="font-bold text-center">Ferramentas </h1>

            <section className={global.sectionLink}>
                <Link href="/ferramenta/usuario" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md" >
                    <Image src="/img/minhaconta.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Minha conta  
                </Link>

                <Link href="/ferramenta/detalhes" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md" >
                    <Image src="/img/financeiro.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Informações financeiras
                </Link>
                <Link href="/ferramenta/investidor" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md">
                    <Image src="/img/carteira.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Perfil de investidor  
                </Link>
                <Link href="/ferramenta/reclamacao" className="flex flex-row w-[100%] justify-start items-center  h-14 shadow-md">
                    <Image src="/img/mensagem.png" className={global.imagens} alt="imagem" width={40} height={40} />
                    Comunicar um problema 
                </Link>
            </section>
        </div>

    );
};

export default Conteudo;
