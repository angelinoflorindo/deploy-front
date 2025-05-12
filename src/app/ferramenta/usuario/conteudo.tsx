"use client";
import styles from "@/modules/global.module.css";
import { UserInfo } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Conteudo() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter()
  if(!session?.user?.email) return redirect('/')
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/pessoa?email=${session?.user?.email}`)
      .then((res) => {
        if (!res.ok){
          throw Error('Erro na rquisição')
        }
        return res.json()
      })
      .then((users:UserInfo) => {
        setUserInfo(users);
      }).catch((error)=>{
        console.log("Error message", error)
        router.push('/')
      })
  }, []);

  return (
    <div>
      <h1 className="font-bold text-center">Minha conta </h1>
      <section className="shadow-md p-5">
        <div className="flex flex-row justify-between  py-2">
          <div className="flex flex-col  ">
            <span className="py-1">
              Gênero: <b>{userInfo?.genero}</b>
            </span>
            <span className="py-1">
              Telemovel: <b>{userInfo?.telemovel}</b>
            </span>
            <span className="py-1">
              Bilhete: <b>{userInfo?.bilhete}</b>
            </span>
            <span className="py-1">
              Email: <b>{userInfo?.email}</b>
            </span>
          </div>
        </div>
        <hr className={styles.divider} />
       <h2>Informações complementares</h2>
       {userInfo?.Pessoa == null ? (
             <b className="text-red-500">Sem informação</b>
       ):(
         <div className="flex flex-col">
         <span className="py-1">
           Estado civil:             
           <b>{userInfo?.Pessoa.estado_civil}</b>

         </span>
         <span className="py-1">
           Data nascimento:
           <b>{userInfo?.Pessoa.data_nascimento.split("T")[0]}</b>
         </span>
         <span className="py-1">
           Resindente em:
           <b>{userInfo?.Pessoa.provincia}</b>
         </span>
         <span className="py-1">
           Município:
           <b>{userInfo?.Pessoa.municipio}</b>
         </span>
       </div>
       )}
      </section>
    </div>
  );
}
