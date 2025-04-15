import React from "react";
import styles from "@/modules/Login.module.css";

const Pagamento = () => {
  return (
    <div>
      <h1 className="font-bold text-center">Confirmar operação</h1>

      <section className="shadow-md p-5">
        <h2> Formas de pagamentos</h2>
        <div className="flex flex-row justify-between  py-2">
          <div className="flex flex-col  ">
            <span className="font-bold"> XX,00KZ </span>
            <small>
              de <b>1</b> ate <b>X</b> prestação
            </small>
          </div>
          <div className="flex flex-col ">
            <span className="font-bold"> XX,00KZ </span>
            <small> Ultima prestação</small>
          </div>
        </div>

        <hr className={styles.divider} />

        <h2> Mais detalhes </h2>
        <div className="flex flex-row justify-between py-2 ">
          <div className="flex flex-col">
            <div className="bg-gray-100 w-30 h-15 flex justify-center  items-center ">
              <b>XX,00KZ</b>
            </div>

            <div className="py-2 flex flex-col justify-center  items-center">
              <span>Prestações </span>
              <h3>
                {" "}
                <b>5</b>{" "}
              </h3>
            </div>
          </div>
          <div className="flex flex-col justify-between p-3   items-center ">
            <span>
              <b>XX%</b> mensal
            </span>

            <div className="flex flex-col    justify-center  items-center">
              <span>Duração </span>
              <h3>
                {" "}
                <b>150</b> dias{" "}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-between w-[100%] py-5 ">
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-violet-500 text-white rounded"
        >
          confirmar
        </button>
      </div>
    </div>
  );
};

export default Pagamento;
