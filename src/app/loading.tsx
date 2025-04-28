import React from "react";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="flex flex-col  h-[100%] justify-center items-center">
            <h1 className={global.h2}>
              <b>Buscando a pagina ...</b>
            </h1>
            <p className="w-[80%] text-start"> Aguarde alguns segundos </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Loading;
