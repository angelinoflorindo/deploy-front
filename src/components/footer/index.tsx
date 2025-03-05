import Image from "next/image";
import global from  "@/modules/global.module.css"
import Link from "next/link";
const Footer = () => {
  return (

    <footer className={global.footer}  >
      <Link href="" className={global.footerButton}>
        <Image src="/img/home.png" width={25} height={25} alt="imagem" className={global.footerImagem}  />
      </Link>
      <Link href="" className={global.footerButton}>
        <Image src="/img/credit.png" width={25} height={25} alt="imagem" className={global.footerImagem} />
      </Link>
      <Link  href="" className={global.footerButton}>
        <Image src="/img/ferramenta.png" width={25} height={25} alt="imagem" className={global.footerImagem}/>
      </Link>
    </footer>
  );
};

export default Footer;
