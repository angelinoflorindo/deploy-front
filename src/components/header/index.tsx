import Image from "next/image";



const Header = () => {
    return (

        <header className="h-15 bg-white  p-[20px] flex items-center justify-start font-bold">
            
            <Image src="/img/logo.png" alt="Onix Corporation"  width={30} height={30} />
            <span className="text-lg p-[5px]"> Onix</span>
        
        </header>
    );
};

export default Header;
