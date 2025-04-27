'use client';
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";

const Conteudo = () => {
  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          Transferir fundos à
          <h1>
            <b>Gestor:</b> XXXXXXXXXX
          </h1>
          
          <h3>
            <b>Conta:</b>XXXXXXXXXX
          </h3>
          <h3>
            <b>Iban:</b> XXXXXXXXXX
          </h3>
        </div>
        <div className={global.cartao_direita_depositar}>
          <Image
            src="/img/logo.png"
            alt="Onix Corporation"
            width={30}
            height={30}
          />
        </div>
      </header>
      <form action="" className="flex flex-col justify-center items-center">
        
      <input
          type="text"
          name="guardiao"
          placeholder="Pesuisar por email ou telemovel"
          className={styles.input}
        />

        <input
          type="number"
          name="valor"
          placeholder="Especificar o valor"
          required
          className={styles.input}
        />
        
        <SubmitButton/>
      </form>
    </div>
  );
};

export default Conteudo;
