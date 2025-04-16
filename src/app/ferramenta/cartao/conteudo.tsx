"use client";
import Image from "next/image";
import global from "@/modules/global.module.css";
import Link from "next/link";
import { CarteiraProps, UserProps } from "@/services/user.service";
import { clientAPI } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const url = clientAPI;
const Conteudo = ({
  carteira,
  userData,
}: {
  carteira: CarteiraProps;
  userData: UserProps;
}) => {
  async function gerarCartao() {
    //Gerar Cartão digital
    const cartaoDigital = await fetch(`${url}/api/usuario/carteira`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_id: userData.id }),
    });

    if (!cartaoDigital.ok) {
      return redirect("/ferramenta");
    }
    return redirect("/ferramenta/cartao");
  }

 /* const updateTransations = async () => {
    const res = await fetch(
      `${url}/api/operacao/depositar?page=1&pendencia=false&limit=1&order=updated_at`
    );

    console.log(await res.json())
  };

  useEffect(() => {
    updateTransations();
  }, []);*/
  return (
    <div className={global.grid}>
      <header className={global.cartao_header}>
        <div className={global.cartao_esquerda}>
          <h1>
            {userData.primeiro_nome} {userData.segundo_nome}
          </h1>
          {!carteira || carteira === null ? (
            <>
              <h3>Sem cartão</h3>
              <button
                className="px-3 py-2 bg-violet-500 text-white rounded cursor-pointer"
                onClick={gerarCartao}
              >
                activar
              </button>
            </>
          ) : (
            <div>
              <h3>{carteira.numero}</h3>
              <h3>
                PIN <b>{carteira.codigo}</b>
              </h3>
            </div>
          )}
        </div>
        <div className={global.cartao_direita}>
          <div className={global.cartao_saldo}>
            {!carteira || carteira === null ? (
              <>Kz</>
            ) : (
              <div>{carteira.saldo}kz</div>
            )}
          </div>
        </div>
      </header>
      <section>
        <article className=" flex flex-row justify-around py-2">
          <span className="flex flex-col justify-center items-center">
            <Link href="/ferramenta/cartao/depositar">
              <div className={global.cartao_btn}>+</div>
            </Link>
            Depositar
          </span>

          <span className="flex flex-col justify-center items-center">
            <Link href="/ferramenta/cartao/retirar">
              <div className={global.cartao_btn}>-</div>
            </Link>
            Retirar
          </span>

          <span className="flex flex-col justify-center items-center">
            <Link href="/desenvolvimento">
              <div className={global.cartao_btn}>::</div>
            </Link>
            Transferir
          </span>
        </article>

        <h1 className="py-2">
          {" "}
          <b>Transações efectuadas</b>{" "}
        </h1>
        <article></article>
      </section>
    </div>
  );
};

export default Conteudo;
