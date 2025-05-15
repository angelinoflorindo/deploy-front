"use client";
import styles from "@/modules/global.module.css";
import { UserInfo } from "@/services/user.service";


export default function Conteudo({users}:{users:UserInfo}) {

  return (
    <div>
      {users ? (
      <section className="shadow-md p-5">
        <div className="flex flex-row justify-between  py-2">
          
            <div className="flex flex-col  ">
            <span className="py-1">
              Gênero: <b>{users?.genero}</b>
            </span>
            <span className="py-1">
              Telemovel: <b>{users?.telemovel}</b>
            </span>
            <span className="py-1">
              Bilhete: <b>{users?.bilhete}</b>
            </span>
            <span className="py-1">
              Email: <b>{users?.email}</b>
            </span>
          </div>
        </div>
        <hr className={styles.divider} />
        <h2>Informações complementares</h2>
        {users?.Pessoa == null ? (
          <b className="text-red-500">Sem informação</b>
        ) : (
          <div className="flex flex-col">
            <span className="py-1">
              Estado civil:
              <b>{users?.Pessoa.estado_civil}</b>
            </span>
            <span className="py-1">
              Data nascimento:
              <b>{users?.Pessoa.data_nascimento ? (users.Pessoa.data_nascimento.split("T")[0]):(users.Pessoa.data_nascimento)}</b>
            </span>
            <span className="py-1">
              Resindente em:
              <b>{users?.Pessoa.provincia}</b>
            </span>
            <span className="py-1">
              Município:
              <b>{users?.Pessoa.municipio}</b>
            </span>
          </div>
        )}
        
      </section>
      ):(<p>Carregando as informações ...</p>)}
    
    </div>
  );
}
