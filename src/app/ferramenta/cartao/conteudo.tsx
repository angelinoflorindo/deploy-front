import Image from "next/image";
import global from "@/modules/global.module.css";
import Link from "next/link";

const Conteudo = () => {
  return (
    <div className={global.grid}>
      <header className={global.cartao_header}>
        <div className={global.cartao_esquerda} >
            <h1>Angelino Franisco</h1>
            <h3><b>0040.0000.9986</b></h3>
        </div>
        <div className={global.cartao_direita}>
            <div className={global.cartao_saldo}>
                500.000kz
            </div>
        </div>
      </header>
      <section>
        
        <article className=" flex flex-row justify-around py-2">
            <span className="flex flex-col justify-center items-center">
                <Link href="/ferramenta/cartao/depositar"><div className={global.cartao_btn}>+</div></Link>
                Depositar
            </span>

            <span className="flex flex-col justify-center items-center">
                <Link href="/ferramenta/cartao/retirar"><div className={global.cartao_btn}>-</div></Link>
                Retirar
            </span>
            
            <span className="flex flex-col justify-center items-center">
                <Link href="/ferramenta/cartao/transferir" ><div className={global.cartao_btn}>::</div></Link>
                Transferir
            </span>
        </article>
        
        <h1 className="py-2">
          {" "}
          <b>Transações efectuadas</b>{" "}
        </h1>
        <article></article>
      </section>
    </div>
  );
};

export default Conteudo;
