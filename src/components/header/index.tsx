"use client";
import Image from "next/image";
import Link from "next/link";
import { UserInfo } from "@/services/user.service";
import { buscarUser } from "@/app/actions/auth";
import DashDropDown from "../dashdropDown";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session, status } = useSession();
  const [perfil, setPerfil] = useState("");
  const nome = session?.user.name;
  const router = useRouter()
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario?email=${session?.user.email}`)
      .then((res) => {
        if (!res.ok) {
          console.log("Erro ao buscar os dados");
          console.log('status', res.status)
          console.log(res.statusText)
          return router.push("/");
        }
        return res.json();
      })
      .then((user: UserInfo) => {
       // console.log("user", user);
        if (user.Papel) {
          setPerfil(user.Papel.perfil);
        }
      });
  }, []);

  return (
    <header className="flex flex-row items-center justify-between   h-15 bg-white   p-[20px]  font-bold">
      <div id="left" className="flex flex-row items-center justify-between">
        <Link href="/dashboard">
          <Image
            src="/img/logo.png"
            alt="Onix Corporation"
            width={30}
            height={30}
          />
        </Link>
        <span className="text-lg p-[5px]"> Onix</span>
      </div>

      <div id="right">
        {perfil === "ADMIN" || perfil === "ANALISTA" ? (
          // Para fins de testes definir ADMIN como padrão
          <DashDropDown userRole={perfil} />
        ) : (
          <>{nome}</>
        )}
      </div>
    </header>
  );
};

export default Header;
