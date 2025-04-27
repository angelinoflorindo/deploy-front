"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  buscarGuardiao,
  buscarUser,
  buscarUserQuery,
  convidarSolidario,
} from "@/app/actions/auth";
import {  useRouter } from "next/navigation";
import { Guardiao, SolidarioProps, UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";
import { clientAPI } from "@/app/lib/definitions";
import { useSession } from "next-auth/react";

const url = clientAPI;
const Conteudo = () => {
  const [guard, setGuard] = useState("");
  const [familiar, setFamiliar] = useState("");
  const [proximo, setProximo] = useState(false);
  const [isInvite, setInvite] = useState(true);
  const [parentesco, setParentesco] = useState(false);
  const [taxa, setTaxa] = useState(0);
  const [total, setTotal] = useState(0);
  const [guardData, setGuardData] = useState<Guardiao>({
    id: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    email: "",
    Pessoa: { id: "" },
    user_id: "",
  });

  let guardInfo = new Array<SolidarioProps>();
  const [user, setUser] = useState<UserInfo>({
    id: "",
    bilhete: "",
    email: "",
    genero: "",
    password: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    Carteira: {
      id: "",
      codigo: "",
      createdAt: "",
      numero: "",
      saldo: "",
      updatedAt: "",
      user_id: "",
    },
    Depositos: {
      id: "",
      user_id: "",
      estado: true,
      pendencia: true,
      createdAt: "",
      updatedAt: "",
      valor: "",
    },
    Devedor: {
      id: "",
      estado: true,
      inadimplencia: "",
      adimplencia: "",
      solicitacao: "",
      updatedAt: "",
      createdAt: "",
      user_id: "",
    },
    Investidor: {
      id: undefined,
      maior_risco: false,
      maior_seguranca: false,
      saque_antecipado: false,
      fundo_protegido: false,
      partilhar_emprestimo: false,
      estado: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Diversificacaos: [],
    },
    Documentos: {
      id: undefined,
      tipo: undefined,
      titulo: undefined,
      nome_salvado: undefined,
      nome_original: undefined,
      extensao: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
    },
    Papel: {
      id: undefined,
      perfil: undefined,
    },
    Pessoa: {
      id: undefined,
      estado_civil: undefined,
      provincia: undefined,
      municipio: undefined,
      profissao: undefined,
      user_id: undefined,
      emprego_id: undefined,
      residencia_id: undefined,
      nivel_instrucao: undefined,
      data_nascimento: undefined,
      Conjugue: {
        id: undefined,
        nome_completo: undefined,
        nivel_instrucao: undefined,
        dependentes: undefined,
        data_nascimento: undefined,
      },
      Emprego: {
        id: undefined,
        data_inicio: undefined,
        sector: undefined,
        cargo: undefined,
        area: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Residencium: {
        id: undefined,
        tipo: undefined,
        data_inicio: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      Contum: {
        id: undefined,
        nome: undefined,
        iban: undefined,
        salario: undefined,
        emprego_id: undefined,
        pessoa_id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      User: {
        id: undefined,
        email: undefined,
      },
    },
    Proponente: {
      id: undefined,
      solicitacao: undefined,
      reembolsar: undefined,
      satisfeitos: undefined,
      insatisfeitos: undefined,
      estado: false,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      User: {
        id: undefined,
        primeiro_nome: undefined,
        segundo_nome: undefined,
        password: undefined,
        email: undefined,
        bilhete: undefined,
        telemovel: undefined,
        genero: undefined,
      },
      Emprestimos: [],
    },
    Reclamacaos: {
      id: undefined,
      assunto: undefined,
      conteudo: undefined,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    Saque: {
      id: undefined,
      taxa: undefined,
      valor: undefined,
      estado: true,
      pendencia: true,
      user_id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
  });

  const { data: session, status } = useSession();
  const router = useRouter();
  const fetchData = async () => {
    if (session?.user.email) {
      const user: UserInfo = await buscarUser(session?.user?.email);
      const { data, total } = await buscarGuardiao(user.id);
      guardInfo = data; // como também podia testar com o push
      setTotal(total);
      setUser(user);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuard(e.target.value);
  };

  const mudarSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setFamiliar(selected);
  };

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    const guardiao: Guardiao = await buscarUserQuery(guard);
    setGuard("");

    if (!guardiao) {
      console.log("Guardião não encontrado!");
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }

    if (guardiao.email === user.email) {
      console.log("Convide outro guardião");
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }

    if (!guardiao.Pessoa) {
      console.log("Guardião sem personalidade");
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }

    setInvite(false);
    setGuardData(guardiao);
  }

  async function onConvidar() {
    const solidario = {
      tipo: "CREDITO",
      parentesco: familiar,
      taxa: taxa,
      pessoa_id: guardData.Pessoa.id,
      user_id: user.id,
      estado: false,
    };

    if (!familiar) {
      console.log("Sem relação familiar ");
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }

    if (taxa < 5) {
      console.log("Aumente mais a taxa");
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }

    const resp = await convidarSolidario(solidario);

    if (!resp) {
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }
    setGuard("");
    setParentesco(false);
    setInvite(true);
    window.location.reload();
  }

  async function getNextPage() {
    if (total < 50) {
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }

    const proposta = await fetch(`${url}/api/devedor/solidario`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (!proposta.ok) {
      router.push("/dashboard/credito/vigesima/solidario");
      return 
    }
    router.push("/dashboard/credito/vigesima/solicitar");

    return 
  }

  useEffect(() => {
    //console.log("Proximo", total);
    if (total > 50) {
      setTotal(total);
      setProximo(true);
    }

  }, [taxa]);

  if (user.Pessoa === null || user.Pessoa === undefined) {
    return (
      <div>
        <section className="shadow-md py-5 px-5 ">
          <h1 className="text-green-500">Termina de registrar o perfil! </h1>
          <span>(*) Informações pessoais</span> <br />
          <span>(*) Informações profissionais</span>
        </section>
        <button
          onClick={() => {
            router.push("/ferramenta/usuario");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-align">Aval solidário </h1>
      <span>Convide guardião de creditos</span>
      {/* Pesquisar guardiao */}

      <form onSubmit={submitForm}>
        <input
          type="text"
          name="guardiao"
          value={guard}
          onChange={handler}
          placeholder="Pesuisar por email ou telemovel"
          className={styles.input}
        />
        <SubmitButton />
      </form>
      {/* Resultados */}
      <div className="flex flex-col  mx-auto justify-around items-center  ">
        {isInvite ? (
          <div>
            <span className="text-green-500 py-5">Convites enviados</span>{" "}
            <br />
            {guardInfo.map((event: SolidarioProps) => (
              <li key={event.id}>
                {event.Pessoa.User.primeiro_nome}{" "}
                {event.Pessoa.User.segundo_nome}
              </li>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-row justify-evenly shadow-md w-[100%]">
              <Image
                src="/img/guardiao.png"
                className={global.imagemGuardiao}
                width={50}
                height={0}
                alt=""
              />

              <div className="flex flex-col w-[100%] p-5">
                <span>
                  {guardData.primeiro_nome} {guardData.segundo_nome}
                </span>
                <div className="flex flex-row justify-evenly items-center">
                  <div className="bg-gray-100 w-20 h-20 flex  justify-center items-center">
                    {taxa}%
                  </div>
                  <div>
                    <Image
                      src="/img/aumentar.png"
                      onClick={() => {
                        setTaxa(taxa + 1);
                      }}
                      className={global.footerImagem}
                      width={25}
                      height={25}
                      alt=""
                    />

                    <Image
                      src="/img/reduzir.png"
                      onClick={() => {
                        if(taxa >0) setTaxa(taxa - 1);
                      }}
                      className={global.footerImagem}
                      width={25}
                      height={25}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-row justify-between  w-[100px]">
                    <Image
                      src="/img/parentesco.png"
                      onClick={() => {
                        setParentesco(true);
                      }}
                      className={global.footerImagem}
                      width={30}
                      height={30}
                      alt=""
                    />
                    {parentesco && familiar !== "" && (
                      <Image
                        src="/img/convite.png"
                        onClick={onConvidar}
                        className={global.footerImagem}
                        width={30}
                        height={30}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {parentesco ? (
              <div id="parentesco" className="flex flex-col justify-center">
                <h1>
                  <b>Grau Parantesto</b>
                </h1>
                <select
                  name="parentesco"
                  value={familiar}
                  onChange={mudarSelect}
                  className="border p-2 rounded"
                >
                  <option value="">Selecione</option>
                  <option value="PAI">PAI</option>
                  <option value="MAE">MAE</option>
                  <option value="FILHO">FILHO</option>
                  <option value="FILHA">FILHA</option>
                  <option value="AVO">AVÔ</option>
                  <option value="NETO">NETO</option>
                  <option value="NETA">NETA</option>
                  <option value="IRMAO">IRMÃO</option>
                  <option value="IRMA">IRMÃ</option>
                  <option value="TIO">TIO</option>
                  <option value="TIA">TIA</option>
                  <option value="SOBRINHO">SOBRINHO</option>
                  <option value="SOBRINHA">SOBRINHA</option>
                  <option value="PRIMO">PRIMO</option>
                  <option value="PRIMA">PRIMA</option>
                  <option value="CUNHADO">CUNHADO</option>
                  <option value="CUNHADA">CUNHADA</option>
                  <option value="SOGRO">SOGRO</option>
                  <option value="SOGRA">SOGRA</option>
                  <option value="GENRO">GENRO</option>
                  <option value="NORA">NORA</option>
                  <option value="ENTEADO">ENTEADO</option>
                  <option value="ENTEADA">ENTEADA</option>
                  <option value="PADRASTO">PADRASTO</option>
                  <option value="MADRASTA">MADRASTA</option>
                </select>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row w-[100%] justify-between items-center  h-14">
        <Link
          href="/dashboard/credito/vigesima"
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Voltar
        </Link>
        {proximo ? (
          <button
            type="button"
            onClick={getNextPage}
            className="px-4 py-2 bg-violet-500 text-white rounded cursor-pointer"
          >
            Proximo
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Conteudo;
