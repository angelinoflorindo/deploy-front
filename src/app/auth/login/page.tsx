"use client";
import React, { useState } from "react";
import styles from "@/modules/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function Auth() {
  // const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //  const router = useRouter();

  // Manipula mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.error) {
      console.log("Erro na autenticação:", res.error);
      redirect('/')
    } else {
      redirect("/dashboard");
    }
  }
  return (
    <div className={styles.container}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col h-screen   justify-center items-center  p-[20px] w-[400px] bg-white mx-auto shadow-lg "
      >
        <div className={styles.header}>
          <Image
            src="/img/logo.png"
            alt="Onix Corporation"
            width={60}
            height={60}
          />
          <h1 className={styles.h1}>Onix</h1>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Palavra passe"
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <Link href="/auth/registrar" className={styles.center}>
          <span className={styles.criarConta}>Criar uma conta!</span>
        </Link>
      </form>
    </div>
  );
}
