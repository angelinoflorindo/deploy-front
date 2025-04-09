import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import Link from "next/link";

const Conteudo = () => {
  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_depositar}>
          <h1>
            <b>Gestor:</b> Angelino Franisco
          </h1>
          <h3>
            <b>Iban:</b> 0040.0000.4234
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
      <form action="">
        <input
          type="text"
          name="valor"
          placeholder="Especificar o valor"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default Conteudo;
