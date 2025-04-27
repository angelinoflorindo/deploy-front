"use client";

import { clientAPI } from "@/app/lib/definitions";
import { DebitoVinculadoProps } from "@/services/Credito.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const url = clientAPI;
export default function Conteudo() {
  const params = useParams();
  const id = params.id;
  const creditoId = Number(id)

  const [depositos, setDepositos] = useState<DebitoVinculadoProps[]>([]);
  const [solidarios, setSolidarios] = useState<any[]>([]);
  const [step, setStep] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "pagar":
        await fetch(`${url}/api/devedor/garantias/${id}`, {
          method: "PUT",
        }); 
        alert("Pagamento realizado!");
        window.location.reload();
        break;
      case "reter":
        await fetch(`${url}/api/devedor/garantias/${id}`, {
          method: "GET",
        });
        alert("Valores Retidos");
        window.location.reload();
        break;
      case "baixar":
        window.open(
          `${url}/api/devedor/credito/${id}/comprovativo`,
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
      `${url}/api/devedor/garantias?page=${page}&status=${true}&limit=5&id=${creditoId}`
    );

    if (!res.ok) {
      const text = await res.text(); // debug da resposta
      console.error("Erro na API:", res.status, text);
      return;
    }

    const search = await res.json();
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
            <h3>Depósitos Vinculados</h3>
          </article>

          <article
            onClick={() => {
              setStep(false);
            }}
            className="flex flex-col justify-center hover:bg-gray-100 items-center cursor-pointer"
          >
            <h3>Guardiãos de créditos</h3>
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
                      {new Date(dep.createdAt).getDay()} /{" "}
                      {new Date(dep.createdAt).getMonth()}
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
                        <option value="pagar"> pagar</option>
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
