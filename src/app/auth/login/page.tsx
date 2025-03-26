
import React from "react";
import styles from "@/modules/Login.module.css"
import Image from "next/image";
import Link from "next/link";
import { login } from "@/app/actions/auth";




export default async function Auth() {
  return (

    <div className={styles.container} >

      <form  action={login}  className="flex flex-col h-screen   justify-center items-center  p-[20px] w-[400px] bg-white mx-auto shadow-lg ">

        <div className={styles.header} >
          <Image src="/img/logo.png" alt="Onix Corporation" width={60} height={60} />
          <h1 className={styles.h1} >Onix</h1>

        </div>
        <input type="email" name="email"  placeholder="Email" className={styles.input} />

        <input type="password" name="password"  placeholder="Palavra passe"  className={styles.input} />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <Link href="/auth/registrar" className={styles.center}  >
          <span className={styles.criarConta} >Criar uma conta!</span>
        </Link>
      </form>
    </div>
  )
}



