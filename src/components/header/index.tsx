"use client";
import Image from "next/image";
import Link from "next/link";
import { UserInfo } from "@/services/user.service";
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
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/perfil?email=${session?.user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na requisição")
          
        }
        return res.json();
      })
      .then((user: UserInfo) => {
        console.log("user", user)
        if (user.Papel != null || user.Papel != undefined) {
          setPerfil(user.Papel.perfil);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar usuário:", err);
        router.push("/");
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
