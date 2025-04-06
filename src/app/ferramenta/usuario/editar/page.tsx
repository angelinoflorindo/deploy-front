"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css";
import { editarUsuario, hashPassword } from "@/app/actions/auth";
import { PessoaProps, UserInfo, UserProps } from "@/services/user.service";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { clientAPI } from "@/app/lib/definitions";

const userApi = clientAPI;
export default function EditarUsuario() {
  const [step, setStep] = useState(1);
  const [genero, setGenero] = useState("");
  const [estado, setEstado] = useState("");
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserProps>({
    id:"",
    primeiro_nome: "",
    segundo_nome: "",
    password: "",
    email: "",
    bilhete: "",
    telemovel: "",
    genero: "",
  });
  const [pessoaData, setPessoaData] = useState<PessoaProps>({
    id:"",
    provincia:"",
    municipio:"",
    estado_civil:"",
    profissao:"",
    nivel_instrucao:"",
    data_nascimento:""
  })

  const email = session?.user?.email;
  if (!email) return redirect("/");

  const mudarGenero = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setGenero(selected);
  };

  const mudarEstado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setEstado(selected);
  };
  // Manipula mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UserProps) => ({ ...prev, [name]: value }));
  };

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    let info = {
      primeiro_nome: formData.primeiro_nome,
      segundo_nome: formData.segundo_nome,
      password: formData.password,
      email: formData.email,
      email_antigo:session?.user?.email,
      bilhete: formData.bilhete,
      telemovel: formData.telemovel,
      genero: genero,
      estado_civil: estado,
      provincia: formData.provincia,
      municipio: formData.municipio,
      data_nascimento: formData.data_nascimento,
    };

    if (info.password) {
      const hashPass = await hashPassword(formData.password);
      info.password = hashPass;
       await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      return signOut({callbackUrl:"/"});
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      }
    );

    return signOut({callbackUrl:"/"});
  }

  useEffect(() => {
    fetch(`${userApi}/api/usuario?email=${session?.user?.email}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          return redirect("/");
        }
        return res.json();
      })
      .then((users: UserInfo) => {
        if (users.pessoa === null) {
          const info = {
            primeiro_nome: users.primeiro_nome,
            segundo_nome: users.segundo_nome,
            password: "",
            email: users.email,
            bilhete: users.bilhete,
            telemovel: users.telemovel,
            genero: users.genero,
            estado_civil: "",
            provincia: "",
            municipio: "",
            data_nascimento: "",
          };
          setFormData(info);

          return;
        }
        const info = {
          primeiro_nome: users.primeiro_nome,
          segundo_nome: users.segundo_nome,
          password: "",
          email: users.email,
          bilhete: users.bilhete,
          telemovel: users.telemovel,
          genero: users.genero,
          estado_civil: users.pessoa.estado_civil,
          provincia: users.pessoa.provincia,
          municipio: users.pessoa.municipio,
          data_nascimento: users.pessoa.data_nascimento,
        };
        setFormData(info);
        /*  setTimeout(() => {
          setNome(dadosDaApi.nome);
        }, 1500); // espera 1,5s
        */
        return;
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] mx-auto shadow-lg">
        {/* Navbar Fixa */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          <form onSubmit={submitForm}>
            {/* Etapa 1: Dados Pessoais */}
            {step === 1 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="primeiro_nome"
                  placeholder="Primeiro Nome"
                  value={formData.primeiro_nome}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="segundo_nome"
                  placeholder="Segundo Nome"
                  value={formData.segundo_nome}
                  required
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Inserir nova"
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="tel"
                  name="telemovel"
                  placeholder="Telemovel"
                  value={formData.telemovel}
                  required
                  onChange={handleChange}
                  className={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            )}

            {/* Etapa 2: Informações Adicionais */}
            {step === 2 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="bilhete"
                  placeholder="Bilhete nacional"
                  value={formData.bilhete}
                  required
                  onChange={handleChange}
                  className={styles.input}
                />

                <select
                  value={genero}
                  name="genero"
                  className={styles.input}
                  required
                  onChange={mudarGenero}
                >
                  <option value="Nenhum">Gênero</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>

                <select
                  name="estado_civil"
                  value={estado}
                  onChange={mudarEstado}
                  className={styles.input}
                  required
                >
                  <option value="Nenhum">Estado Civil</option>
                  <option value="SOLTEIRO">Solteiro</option>
                  <option value="CASADO">Casado</option>
                </select>

                <input
                  type="text"
                  name="provincia"
                  value={formData.provincia}
                  placeholder="Residente em (Província)"
                  required
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="municipio"
                  placeholder="Município de..."
                  value={formData.municipio}
                  required
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="date"
                  name="data_nascimento"
                  required
                  onChange={handleChange}
                  className={styles.input}
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
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Registrar
                </button>
              )}
            </div>
          </form>
        </main>

        {/* Rodapé Fixo */}
        <Footer />
      </div>
    </div>
  );
}
