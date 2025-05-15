"use client";
import styles from "@/modules/Login.module.css";
import global from "@/modules/global.module.css";
import { UserInfo } from "@/services/user.service";
import Link from "next/link";

const ConteudoInfo = ({ users }: { users: UserInfo }) => {
  return (
    <div>
      <section className="shadow-md p-5">
        <div className="flex flex-col   py-2">
          <h2> Informações adicionais</h2>
          {users?.Pessoa == null ? (
            <b className="text-red-500"> Sem Informação</b>
          ) : (
            <article>
              <div className="flex flex-col  ">
                <span className="py-1">
                  Nível de instrução:
                  <b>{users?.Pessoa.nivel_instrucao}</b>
                </span>
                <span className="py-1">
                  Tipo de residência:
                  <b>{users?.Pessoa.Residencia.tipo}</b>
                </span>
                <span className="py-1">
                  Tempo de residência:
                  <b>{users?.Pessoa.Residencia.data_inicio}</b>
                </span>
              </div>

              <hr className={styles.divider} />

              <div>
                {users.Pessoa.estado_civil == "CASADO" ? (
                  <>
                    <h2> Informações do Conjugue</h2>

                    {users?.Pessoa.Conjugue == null ? (
                      <div className="flex flex-col">
                        <b className="text-red-500">Sem informação</b>
                        <Link
                          href={`/ferramenta/usuario/${users.Pessoa.id}`}
                          className={global.voltar}
                        >
                          + registrar
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="py-1">
                          Nome Completo:
                          <b>{users?.Pessoa.Conjugue.nome_completo}</b>
                        </span>
                        <span className="py-1">
                          Nível de instrução:
                          <b>{users?.Pessoa.Conjugue.nivel_instrucao}</b>
                        </span>
                        <span className="py-1">
                          Data nascimento :
                          <b>
                            {users?.Pessoa.Conjugue.data_nascimento
                              ? users?.Pessoa.Conjugue.data_nascimento.split(
                                  "T"
                                )[0]
                              : users?.Pessoa.Conjugue.data_nascimento}
                          </b>
                        </span>
                        <span className="py-1">
                          Número de dependentes:
                          <b>{users?.Pessoa.Conjugue.dependentes}</b>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
};

export default ConteudoInfo;
