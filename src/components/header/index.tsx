

import Image from "next/image";
import Link from "next/link";
import DashDropDown from "../dashdropDown";
import { getServerSession } from "next-auth";


export default async function Header(){
    //const {data:session, status} = useSession()
    const session = await getServerSession()
    //console.log("session", session)
    const perfil = session?.user.role
    const nome = session?.user.name

    return (

        <header className="flex flex-row items-center justify-between   h-15 bg-white   p-[20px]  font-bold">
            <div id="left" className="flex flex-row items-center justify-between" >
            <Link href="/dashboard">
            <Image src="/img/logo.png"  alt="Onix Corporation"  width={30} height={30} />
            </Link>
            <span className="text-lg p-[5px]"> Onix</span>

            </div>

            <div id="right" >
                { (perfil === 'ADMIN' || perfil === 'ANALISTA') ? (
              // Para fins de testes definir ADMIN como padrão
              <DashDropDown userRole={perfil} />
                ):(<>{nome}</>) }
            </div>
        
        </header>
    );
};


