"use client";
import React from "react";
import styles from "@/modules/Login.module.css";
import Header from "@/components/header";
import { hashPassword } from "@/app/actions/auth";
import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { clientAPI } from "@/app/lib/definitions";
import { SubmitButton } from "@/components/submitButton";

const url = clientAPI;
const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");

  const [formData, setFormData] = useState({
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    email: "",
    password: "",
    bilhete: "",
    profilePicture: "",
  });

  const mudarGenero = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

  // Manipula mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const hashPass = await hashPassword(formData.password);
    const password = formData.password;
    const picture = formData.profilePicture;
    const usuario = {
      primeiro_nome: formData.primeiro_nome,
      password: hashPass,
      genero: gender,
      email: formData.email,
      bilhete: formData.bilhete,
      segundo_nome: formData.segundo_nome,
      telemovel: formData.telemovel,
    };

    if (picture === null || !picture) {
      console.log("Anexe os documentos!");
      return redirect("/auth/registrar");
    }

    setFormData({
      primeiro_nome: "",
      segundo_nome: "",
      telemovel: "",
      email: "",
      password: "",
      bilhete: "",
      profilePicture: "",
    });

    const resp = await fetch(`${url}/api/usuario`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(usuario),
    });
    const response = await resp.json();
    console.log("user id", response.id);
    if (!resp.ok) {
      console.log("Error de sintaxe", resp.statusText);
      return redirect("/auth/registrar");
    }
    const data = new FormData();
    data.append("tipo", "BILHETE");
    data.append("titulo", "Bilhete de identidade");
    data.append("user_id", `${response.id}`);
    data.append("scanner", picture);

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!result.ok) {
      console.log("Erro ao anexar documentos", result.statusText);
      redirect("/auth/registrar");
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: usuario.email,
      password: password,
    });

    if (res?.error) {
      console.log("Erro na autenticação:", res.error);
      redirect("/");
    } else {
      return redirect("/dashboard");
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] bg-white mx-auto shadow-lg">
        <Header />
        <div className=" p-[20px]">
          <h2 className="text-xl font-bold text-start mb-4">
            {step === 1 ? "Criar uma conta" : "Criar uma conta"}
          </h2>

          <form onSubmit={onSubmit}>
            {/* Etapa 1: Dados Pessoais */}
            {step === 1 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="primeiro_nome"
                  placeholder="Primeiro Nome"
                  required
                  className={styles.input}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="segundo_nome"
                  placeholder="Segundo Nome"
                  required
                  className={styles.input}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Palavra passe"
                  required
                  className={styles.input}
                  onChange={handleChange}
                />

                <input
                  type="tel"
                  name="telemovel"
                  placeholder="Telemovel"
                  required
                  className={styles.input}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Etapa 2: Informações Adicionais */}
            {step === 2 && (
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={styles.input}
                  onChange={handleChange}
                />

                <select
                  name="genero"
                  value={gender}
                  onChange={mudarGenero}
                  className={styles.input}
                  required
                >
                  <option value="Nenhum">Selecione</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>

                <input
                  type="text"
                  name="bilhete"
                  placeholder="Numero do bilhete"
                  required
                  className={styles.input}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  name="scanner"
                  multiple={true}
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      profilePicture: e.target.files?.[0] || null,
                    }))
                  }
                  className="w-full  p-2 border rounded"
                />
              </div>
            )}

            {/* Botões de Navegação */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Voltar
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Próximo
                </button>
              ) : (
                <SubmitButton />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
