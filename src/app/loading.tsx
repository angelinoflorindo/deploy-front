import React from "react";
import Content from "./content";
import styles from "@/modules/Login.module.css"



const Loading = () => {

  return (
    <div className={styles.container}>
    <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-4 bg-white">
        <Content />
      </main>
    </div>
  </div>
)
};

export default Loading;



