import Image from "next/image";
import Link from "next/link";


const Header = () => {
    return (

        <header className="h-15 bg-white  p-[20px] flex items-center justify-start font-bold">
            <Link href="/dashboard">
            <Image src="/img/logo.png"  alt="Onix Corporation"  width={30} height={30} />
            </Link>
            <span className="text-lg p-[5px]"> Onix</span>
        
        </header>
    );
};

export default Header;
