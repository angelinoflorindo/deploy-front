"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import styles from "@/modules/Login.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buscarUserQuery, convidarSolidario } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Guardiao, SolidarioProps } from "@/services/user.service";

const Conteudo = ({
  user,
  guardInfo,
  total,
}: {
  user: Guardiao;
  guardInfo: any;
  total: any;
}) => {
  const [guard, setGuard] = useState("");
  const [familiar, setFamiliar] = useState("");
  const [proximo, setProximo] = useState(false);
  const [parentesco, setParentesco] = useState(false);
  const [taxa, setTaxa] = useState(0);
  const [guardData, setGuardData] = useState<Guardiao>({
    id: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    email: "",
    pessoa: { id: "" },
    user_id: "",
  });

  const { data: session, status } = useSession();

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
      return redirect("/dashboard/credito/consumo/solidario");
    }

    if (guardiao.email === session?.user?.email) {
      console.log("Convide outro guardião");
      return redirect("/dashboard/credito/consumo/solidario");
    }

    if (!guardiao.pessoa) {
      console.log("Guardião sem personalidade");
      return redirect("/dashboard/credito/consumo/solidario");
    }

    setGuardData(guardiao);
  }

  async function onConvidar() {
    const solidario = {
      tipo: "CREDITO",
      parentesco: familiar,
      taxa: taxa,
      pessoa_id: guardData.pessoa.id,
      user_id: user.id,
    };

    if (!familiar) {
      console.log("Sem relação familiar ");
      return redirect("/dashboard/credito/consumo/solidario");
    }

    setGuard("");
    setGuardData({
      id: "",
      email: "",
      pessoa: { id: "" },
      primeiro_nome: "",
      segundo_nome: "",
      telemovel: "",
      user_id: "",
    });
    setParentesco(false);

    if (taxa < 1) {
      console.log("Aumente mais a taxa");
      return redirect("/dashboard/credito/consumo/solidario");
    }

    const resp: Guardiao = await convidarSolidario(solidario);
    console.log("convite enviado", resp);
    setProximo(true);
  }

  async function getNextPage() {
    if (total < 50) {
      return redirect("/dashboard/credito/consumo/solidario");
    }
    return redirect("/dashboard/credito/consumo/solicitar");
  }

  useEffect(() => {
    if (total > 50) {
      setProximo(true);
    }
    if (taxa < 0) {
      setTaxa(0);
    }
  }, [taxa]);

  if (!user.pessoa)
    return (
      <div>
        <section className="shadow-md py-5 px-5 ">
          <h1 className="text-green-500">Termina de registrar o perfil! </h1>
          <span>(*) Informações pessoais</span> <br />
          <span>(*) Informações profissionais</span>
        </section>
        <button
          onClick={() => {
            redirect("/ferramenta/usuario");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
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
        <button
          type="submit"
          className="px-4 py-2 bg-violet-500 text-white rounded"
        >
          Pesquisar
        </button>
      </form>
      {/* Resultados */}
      <div className="flex flex-col  mx-auto justify-around items-center  ">
        {!guardData.id ? (
          <div>
            <span className="text-green-500 py-5">
              Convide + pessoas que garantam o teu crédito
            </span>{" "}
            <br />
            {guardInfo.map((event: SolidarioProps) => (
              <li key={event.id}>
                {event.pessoa.user.primeiro_nome}{" "}
                {event.pessoa.user.segundo_nome}
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
                height={-50}
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
                        setTaxa(taxa - 1);
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

                    <Image
                      src="/img/convite.png"
                      onClick={onConvidar}
                      className={global.footerImagem}
                      width={30}
                      height={30}
                      alt=""
                    />
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
          href="/dashboard/credito/consumo"
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Voltar
        </Link>
        {proximo ? (
          <button
            type="button"
            onClick={getNextPage}
            className="px-4 py-2 bg-violet-500 text-white rounded"
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
