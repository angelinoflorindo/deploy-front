'use client';
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import { EmprestimoDef, UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";

const Conteudo = ({emprestimoData}:{emprestimoData:EmprestimoDef}) => {
  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          Transferir fundos à
          <h1>
            <b>Beneficiário:</b> {emprestimoData.Proponente.User.primeiro_nome} {" "} {emprestimoData.Proponente.User.segundo_nome}
          </h1> 
          
          <h3>
            <b>Telemovel: </b>{emprestimoData.Proponente.User.telemovel}
          </h3>
          <h3>
            <b>Email: </b> {emprestimoData.Proponente.User.email}
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
          name="numero"
          placeholder="Inserir email ou telemovel"
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
