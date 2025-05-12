"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/modules/Login.module.css";
import {
  ConjugueProps,
  EmpregoProps,
  PessoaProps,
  ResidenciaProps,
  UserInfo,
  UserProps,
} from "@/services/user.service";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { SubmitButton } from "@/components/submitButton";

export default function EditarUsuario() {
  const [step, setStep] = useState(1);
  const [genero, setGenero] = useState("");
  const [estado_civil, setEstado] = useState("");
  const [propriedade, setPropriedade] = useState("");
  const [area, setArea] = useState("");
  const [sector, setSector] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter()
  const [userData, setUserData] = useState<UserProps>({
    id: "",
    primeiro_nome: "",
    segundo_nome: "",
    password: "",
    email: "",
    bilhete: "",
    telemovel: "",
    genero: "",
  });
  const [PessoaData, setPessoaData] = useState<PessoaProps>({
    id: "",
    provincia: "",
    municipio: "",
    estado_civil: "",
    profissao: "",
    nivel_instrucao: "",
    data_nascimento: "",
    emprego_id: "",
    residencia_id: "",
    user_id: "",
  });

  const [EmpregoData, setEmpregoData] = useState<EmpregoProps>({
    id: "",
    area: "",
    cargo: "",
    sector: "",
    data_inicio: "",
    createdAt: "",
    updatedAt: "",
  });


  const [ResidenciaData, setResidenciaData] = useState<ResidenciaProps>({
    id: "",
    tipo: "",
    data_inicio: "",
    createdAt: "",
    updatedAt: "",
  });

  const email = session?.user?.email;
  if (!email) return redirect("/");

  const mudarGenero = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setGenero(selected);
  };

  const mudarArea = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setArea(selected);
  };

  const mudarEstado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setEstado(selected);
  };

  const mudarPropriedade = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setPropriedade(selected);
  };

  const mudarSector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSector(selected);
  };

  // Manipula mudanças nos inputs
  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev: UserProps) => ({ ...prev, [name]: value }));
  };

  const handlePessoa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPessoaData((prev: PessoaProps) => ({ ...prev, [name]: value }));
  };



  const handleEmprego = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpregoData((prev: EmpregoProps) => ({ ...prev, [name]: value }));
  };

  const handleResidencia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResidenciaData((prev: ResidenciaProps) => ({ ...prev, [name]: value }));
  };

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    let infoUser = {
      id: userData.id,
      primeiro_nome: userData.primeiro_nome,
      segundo_nome: userData.segundo_nome,
      password: userData.password,
      email: userData.email,
      bilhete: userData.bilhete,
      telemovel: userData.telemovel,
      genero: genero,
    };

    let infoPessoa = {
      id: PessoaData.id,
      profissao: PessoaData.profissao,
      data_nascimento: PessoaData.data_nascimento,
      estado_civil: estado_civil,
      municipio: PessoaData.municipio,
      nivel_instrucao: PessoaData.nivel_instrucao,
      provincia: PessoaData.provincia,
      emprego_id: PessoaData.emprego_id,
      residencia_id: PessoaData.residencia_id,
      user_id: userData.id,
    };

    let infoResidencia = {
      id: ResidenciaData.id,
      tipo: propriedade,
      data_inicio: ResidenciaData.data_inicio,
    };

    let infoEmprego = {
      id: EmpregoData.id,
      area: area,
      cargo: EmpregoData.cargo,
      sector: sector,
      data_inicio: EmpregoData.data_inicio,
    };

    const reqUser = {
      pessoa: infoPessoa,
      emprego: infoEmprego,
      residencia: infoResidencia,
    };

    const updateUser = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/${infoUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(infoUser),
      }
    );

    if (!updateUser.ok) {
      console.log("error ao atualizar", updateUser.statusText);
      signOut({ callbackUrl: "/" });
      return;
    }

    if (infoPessoa.id) {
      const updatePessoa = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa/${infoPessoa.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reqUser),
        }
      );

      if (!updatePessoa.ok) {
        console.log("error ao atualizar", updatePessoa.statusText);
        signOut({ callbackUrl: "/" });
        return;
      }

      return signOut({callbackUrl:"/"})
    }

    const createPessoa = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reqUser),
      }
    );

    if (!createPessoa.ok) {
      console.log("error ao registrar", createPessoa.statusText);
      signOut({ callbackUrl: "/" });
      return;
    }
  
   router.push('/ferramenta/usuario') 
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa?email=${session?.user?.email}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          return redirect("/");
        }
        return res.json();
      })
      .then((users: UserInfo) => {
        //console.log("users",users)
        const resUser = {
          id: users.id,
          primeiro_nome: users.primeiro_nome,
          segundo_nome: users.segundo_nome,
          password: "",
          email: users.email,
          bilhete: users.bilhete,
          telemovel: users.telemovel,
          genero: users.genero,
        };
        setUserData(resUser);

        if (users.Pessoa) {
          const resPessoa: PessoaProps = {
            id: users.Pessoa.id,
            municipio: users.Pessoa.municipio,
            data_nascimento: users.Pessoa.data_nascimento.split('T')[0],
            estado_civil: users.Pessoa.estado_civil,
            nivel_instrucao: users.Pessoa.nivel_instrucao,
            profissao: users.Pessoa.profissao,
            provincia: users.Pessoa.provincia,
            emprego_id: users.Pessoa.emprego_id,
            residencia_id: users.Pessoa.residencia_id,
            user_id: users.Pessoa.user_id,
          };
          setPessoaData(resPessoa);

          const resEmprego: EmpregoProps = {
            id: users.Pessoa.Emprego.id,
            area: users.Pessoa.Emprego.area,
            cargo: users.Pessoa.Emprego.cargo,
            sector: users.Pessoa.Emprego.sector,
            data_inicio: users.Pessoa.Emprego.data_inicio.split('T')[0],
            createdAt: users.Pessoa.Emprego.createdAt,
            updatedAt: users.Pessoa.Emprego.updatedAt,
          };
          setEmpregoData(resEmprego);

          const resResidencia: ResidenciaProps = {
            id: users.Pessoa.Residencium.id,
            tipo: users.Pessoa.Residencium.tipo,
            data_inicio: users.Pessoa.Residencium.data_inicio.split('T')[0],
            createdAt: users.Pessoa.Residencium.createdAt,
            updatedAt: users.Pessoa.Residencium.updatedAt,
          };
          setResidenciaData(resResidencia);
        }
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
                <h2>
                  {" "}
                  <b>Informações da Conta</b>{" "}
                </h2>
                <input
                  type="text"
                  name="primeiro_nome"
                  placeholder="Primeiro Nome"
                  value={userData.primeiro_nome}
                  onChange={handleUser}
                  required
                  className={styles.input}
                />

                <input
                  type="text"
                  name="segundo_nome"
                  placeholder="Segundo Nome"
                  value={userData.segundo_nome}
                  required
                  onChange={handleUser}
                  className={styles.input}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Inserir nova"
                  onChange={handleUser}
                  className={styles.input}
                />

                <input
                  type="tel"
                  name="telemovel"
                  placeholder="Telemovel"
                  value={userData.telemovel}
                  required
                  onChange={handleUser}
                  className={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  required
                  onChange={handleUser}
                  className={styles.input}
                />
              </div>
            )}

            {/* Etapa 2: Informações Adicionais */}
            {step === 2 && (
              <div className="space-y-4">
                <h2>
                  <b>Informações Pessoais</b>
                </h2>
                <input
                  type="text"
                  name="bilhete"
                  placeholder="Bilhete nacional"
                  value={userData.bilhete}
                  required
                  onChange={handleUser}
                  className={styles.input}
                />

                <select
                  value={genero}
                  name="genero"
                  className={styles.input}
                  required
                  onChange={mudarGenero}
                >
                  <option value="">Gênero</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>

                <select
                  name="estado_civil"
                  value={estado_civil}
                  onChange={mudarEstado}
                  className={styles.input}
                  required
                >
                  <option value="">Estado Civil</option>
                  <option value="SOLTEIRO">Solteiro</option>
                  <option value="CASADO">Casado</option>
                </select>

                <input
                  type="text"
                  name="provincia"
                  value={PessoaData.provincia}
                  placeholder="Residente em (Província)"
                  required
                  onChange={handlePessoa}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="municipio"
                  placeholder="Município de..."
                  value={PessoaData.municipio}
                  required
                  onChange={handlePessoa}
                  className={styles.input}
                />
              </div>
            )}

            {/* Etapa 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h2>
                  <b>Informações Profissionais</b>
                </h2>
                <input
                  type="text"
                  name="profissao"
                  placeholder="Profissão"
                  value={PessoaData.profissao}
                  required
                  onChange={handlePessoa}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="nivel_instrucao"
                  placeholder="Grau Acadêmico"
                  value={PessoaData.nivel_instrucao}
                  required
                  onChange={handlePessoa}
                  className={styles.input}
                />
                <label>
                  Data de Nascimento
                  <input
                    type="date"
                    name="data_nascimento"
                    value={PessoaData.data_nascimento}
                    required
                    onChange={handlePessoa}
                    className={styles.input}
                  />
                </label>

                <select
                  name="tipo"
                  value={propriedade}
                  onChange={mudarPropriedade}
                  className={styles.input}
                  required
                >
                  <option value="">Residência</option>
                  <option value="PROPRIA">Própria</option>
                  <option value="RENDA">Arrendado</option>
                </select>
                <label>
                  Início da residência
                  <input
                    type="date"
                    name="data_inicio"
                    value={ResidenciaData.data_inicio}
                    required
                    onChange={handleResidencia}
                    className={styles.input}
                  />
                </label>
              </div>
            )}

            {/** Etapa: 4 */}
            {step === 4 && (
              <div className="space-y-4">
                <h2>
                  <b>Informações Adicionais</b>
                </h2>

                <input
                  type="text"
                  name="cargo"
                  placeholder="Cargo no trabalho"
                  value={EmpregoData.cargo}
                  required
                  onChange={handleEmprego}
                  className={styles.input}
                />

                <select
                  name="sector"
                  value={sector}
                  onChange={mudarSector}
                  className={styles.input}
                  required
                >
                  <option value="">Sector</option>
                  <option value="PUBLICO">Público</option>
                  <option value="PRIVADO">Privado</option>
                </select>

                <select
                  name="area"
                  value={area}
                  onChange={mudarArea}
                  className={styles.input}
                  required
                >
                  <option value="">Área de trabalho</option>
                  <option value="EDUCACAO">Educação</option>
                  <option value="SAUDE">Saúde</option>
                  <option value="ENERGIA">Energia</option>
                  <option value="PETROLEO">Petróleo</option>
                  <option value="MINERACAO">Mineração</option>
                  <option value="FINANCAS">Finanças</option>
                  <option value="CONSTRUCAO">Construção</option>
                  <option value="TECNOLOGIA">Tecnologia</option>
                  <option value="COMERCIO">Comércio</option>
                  <option value="AGRICULTURA">Agricultura</option>
                  <option value="TURISMO">Turismo</option>
                  <option value="ADMINISTRACAO_PUBLICA">
                    Administração Pública
                  </option>
                  <option value="DEFESA_SEGURANCA">Defesa e Segurança</option>
                </select>

                <label>
                  Início de trabalho
                  <input
                    type="date"
                    name="data_inicio"
                    value={EmpregoData.data_inicio}
                    required
                    onChange={handleEmprego}
                    className={styles.input}
                  />
                </label>
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

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Próximo
                </button>
              ) : (
                <SubmitButton/>
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
