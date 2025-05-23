"use client";

import { ContaVinculadaProps } from "@/services/user.service";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function Conteudo() {
  const params = useParams();
  const id = params.id;
  const emprestimoId = Number(id)
  
  const [depositos, setDepositos] = useState<ContaVinculadaProps[]>([]);
  const [solidarios, setSolidarios] = useState<any[]>([]);
  const [step, setStep] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);
 

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "reembolsar":
        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/proponente/garantias/${id}`, {
          method: "PUT",
        });
        alert("Valores reembolsados");
        fetchData()
        break;
      case "reter":
        await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/proponente/garantias/${id}`, {
          method: "GET",
        });
        alert("Valores Retidos");
        fetchData()
        break;
      case "baixar":
        window.open(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/proponente/emprestimo/${id}/comprovativo`,
          "_blank"
        );
        break;
      default:
        break;
    }

    // Atualiza lista após ação
    setPage(1);
  };

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/proponente/garantias?page=${page}&status=${true}&id=${emprestimoId}`
    );

    if (!res.ok) {
      const text = await res.text(); // debug da resposta
      console.error("Erro na API:", res.status, text);
      return;
    }

    const search = await res.json();
    //console.log("vinculados", search.data);
    setDepositos(search.data.vinculadaData);
    setTotalPages(search.totalPages.vinculos);
    setPage(search.totalPages.aval.vinculos);

    setTotal(search.totalPages.aval);
    setSolidarios(search.data.solidariosData);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Todas as Garantias!</h1>
      <div className="flex flex-col">
        <section className="px-2 py-4 bg-white rounded shadow-md flex flex-row justify-between">
          <article
            onClick={() => {
              setStep(true);
            }}
            className="flex flex-col  justify-center hover:bg-gray-100  items-center cursor-pointer"
          >
            <h3>Depósitos vinculados</h3>
          </article>

          <article
            onClick={() => {
              setStep(false);
            }}
            className="flex flex-col justify-center hover:bg-gray-100 items-center cursor-pointer"
          >
            <h3>Guardiãos de emprestimos</h3>
          </article>
        </section>
        {step ? (
          <section className="py-4">
            <table className="min-w-full border border-gray-300 rounded">
              <thead className="bg-gray-100 text-left">
                <tr>
                  {/*<th className="py-2 px-4 border-b">#</th> */}
                  <th className="py-2 px-4 border-b">Valor</th>
                  <th className="py-2 px-4 border-b">Estado</th>
                  <th className="py-2 px-4 border-b">Dia/Mês</th>
                  <th className="py-2 px-4 border-b">Operação</th>
                </tr>
              </thead>
              <tbody>
                {depositos.map((dep, index) => (
                  <tr key={dep.id} className="hover:bg-gray-50">
                    {/*<td className="py-2 px-4 border-b">{(page - 1) * 5 + index + 1}</td>*/}
                    <td className="py-2 px-4 border-b">{dep.valor_retido}Kz</td>
                    <td className="py-2 px-4 border-b">
                      {dep.estado ? "Retido" : "Reembolsado"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(dep.created_at).getDay()} /{" "}
                      {new Date(dep.created_at).getMonth()}
                    </td>
                    <td className="py-2 px-4 border-b text-right">
                      <select
                        onChange={(e) => handleAcao(e.target.value, dep.id)}
                        className="border rounded px-2 py-1 bg-white text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled hidden>
                          Analisar
                        </option>
                        <option value="reembolsar"> Reembolsar</option>
                        <option value="reter">Reter</option>
                        <option value="baixar">Baixar</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </section>
        ) : (
          <section className="py-4">
            <table className="min-w-full border border-gray-300 rounded">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-2 px-4 border-b">Situação</th>
                  <th className="py-2 px-4 border-b">Parentesco</th>
                  <th className="py-2 px-4 border-b">Taxa</th>
                  <th className="py-2 px-4 border-b">Dia/Mês</th>
                </tr>
              </thead>
              <tbody>
                {solidarios.map((dep, index) => (
                  <tr key={dep.id} className="hover:bg-gray-50">
                    {/*<td className="py-2 px-4 border-b">{(page - 1) * 5 + index + 1}</td>*/}
                    <td className="py-2 px-4 border-b">
                      {dep.Solidario.estado ? "Activo" : "Inactivo"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {dep.Solidario.parentesco}
                    </td>
                    <td className="py-2 px-4 border-b">{dep.Solidario.taxa}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(dep.createdAt).getDay()} /{" "}
                      {new Date(dep.createdAt).getMonth()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>
                Página {page} de {total}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, total))}
                disabled={page === total}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
