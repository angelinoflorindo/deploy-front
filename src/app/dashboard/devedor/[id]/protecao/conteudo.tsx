"use client";
import React, { useEffect, useState } from "react";
import global from "@/modules/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { EmprestimoDef, UserInfo } from "@/services/user.service";
import { SubmitButton } from "@/components/submitButton";
import { diversificarEmprestimo } from "@/app/actions/auth";
import { CreditoDef } from "@/services/Credito.service";
import { useForm, useFormState } from "react-hook-form";

const Conteudo = ({
  formData,
  userData,
  saldo,
}: {
  formData: CreditoDef;
  userData: UserInfo;
  saldo: any;
}) => {
  const { register, handleSubmit, control } = useForm<FormData>();
  const { isDirty, isValid } = useFormState({ control });
  const [taxa, setTaxa] = useState(0);

  useEffect(() => {
    if (taxa < 0) {
      setTaxa(0);
    }
  }, [taxa]);
  return (
    <div>
      <div className="py-2">
        <h2 className="font-bold  py-2">Quantia disponível</h2>
        <small>Avalie quanto podes aplicar neste pedido</small>
        {saldo > 0 ? (
          <>{saldo},00kz</>
        ) : (
          <>
            <h3 className="text-blue-500 font-bold">
              {" "}
              Seja o primeiro a diversificar!
            </h3>
          </>
        )}
      </div>
      <div className="py-2">
        <h2 className="font-bold">Reduzir o risco</h2>
        <small>
          Decida quanto do valor total <br /> Pretende investir
        </small>
        <form onSubmit={handleSubmit(diversificarEmprestimo)}>
          <div className="flex flex-row justify-between items-center">
            <input
              type="text"
              name="taxa"
              value={taxa}
              readOnly={true}
              hidden={true}
            />
            <input
              type="text"
              name="emprestimo_id"
              value={formData.id}
              readOnly={true}
              hidden={true}
            />
            <input
              type="text"
              name="investidor_id"
              value={userData.Investidor.id}
              readOnly={true}
              hidden={true}
            />
            <span className="flex font-bold w-40 h-20 shadow-md justify-center items-center">
              {taxa}%
            </span>
            <span className="flex flex-col p-2 w-[100%] justify-between items-start">
              <div className="p-2">
                <Image
                  src="/img/aumentar.png"
                  width={30}
                  height={30}
                  alt=""
                  onClick={() => {
                    setTaxa(taxa + 1);
                  }}
                  className={global.footerImagem}
                />
              </div>
              <div className="p-2">
                <Image
                  src="/img/reduzir.png"
                  width={30}
                  height={30}
                  alt=""
                  onClick={() => {
                    setTaxa(taxa - 1);
                  }}
                  className={global.footerImagem}
                />
              </div>
            </span>
          </div>

          <div className="flex flex-row itmes-center  justify-around">
            <Link
              href={`/dashboard/proponente/${formData.id}`}
              className="bg-gray-500 text-white rounded px-6 py-2 "
            >
              Voltar
            </Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conteudo;
