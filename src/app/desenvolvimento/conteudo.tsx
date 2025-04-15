
"use client";
import global from "@/modules/global.module.css";
import { redirect } from "next/navigation";

const Desenvolvimento = () => {
  return (
    <div className="flex flex-col  h-[100%] justify-center items-center">
      <h1 className={global.h1}>
        <b>Página em  desenvolvimento</b>
      </h1>
      <p className="w-[80%] text-start"> Voltar para dashboard</p>
      <hr className={global.divider} />
      <div className="w-[80%] flex justify-start">
        <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"  onClick={() => redirect('/dashboard')}>avançar </button>
      </div>
    </div>
  );
};

export default Desenvolvimento;