

import Header from "@/components/header";
import Footer from "@/components/footer";
import Conteudo from "./conteudo";
import styles from "@/modules/Login.module.css"

export default function Notfound(){

    return (
        <div className={styles.container}>
        <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg" >
  
          {/* Conteúdo Principal */}
          <main className="flex-1 overflow-y-auto p-4 bg-white">
            <Conteudo />
          </main>
        </div>
      </div>
    )

}