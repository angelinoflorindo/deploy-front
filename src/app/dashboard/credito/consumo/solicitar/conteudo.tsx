import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import Link from "next/link";

const Conteudo = () => {
  return (
    <div className={global.grid}>
      <header className={global.cartao_header_depositar}>
        <div className={global.cartao_esquerda_solicitar}>
          <h1>
            <b>Valor:</b> 15000Kz
          </h1>
          <h1>
            <b>Prestações:</b>4
          </h1>
        </div>
        <div className={global.cartao_direita_solicitar}>
          <h1>
            <b>Juros:</b> 12%/mês
          </h1>
          <h1>
            <b>Até:</b> 12 meses
          </h1>
        </div>
      </header>

      <div>
        <h1>
          <b>Crédito permitidos:</b>
        </h1>
        min(150.000kz) && max(500.000kz)
      </div>
      <div className="flex py-4 flex-col justify-center itmes-center">
        <form
          action=""
          method="post"
          className="flex flex-row  justify-around "
        >
          <label className="md-2">
            Valor de crédito
            <input
              type="number"
              name="valor"
              placeholder="Ex:(Mil Kz) 1000"
              className={styles.input}
            />
          </label>
          <label className="md-2">
            Número de prestações
            <input
              type="number"
              name="valor"
              placeholder="Ex:6"
              className={styles.input}
            />
          </label>
        </form>
        <button
          type="button"
          className="px-4 py-2 bg-violet-500  text-white rounded"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Conteudo;
