
"use client";

import { clientAPI } from "@/app/lib/definitions";
import { DepositoProps, ReclamacaoProps } from "@/services/user.service";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const url = clientAPI;
export default function Conteudo() {
  const [depositos, setDepositos] = useState<ReclamacaoProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "eliminar":
        await fetch(`${url}/api/usuario/reclamacao/${id}`, {
          method: "DELETE",
        });
        alert("Reclamação eliminada");
        window.location.reload()
        break
      default:
        break;
    }

    // Atualiza lista após ação
    setPage(1);
  };

  const fetchData = async () => {
    const res = await fetch(
      `${url}/api/usuario/reclamacao?page=${page}&limit=5&status=${true}`
    );

    if (!res.ok) {
      const text = await res.text(); // debug da resposta
      console.error("Erro na API:", res.status, text);
      return;
    }

    const search = await res.json();

    setDepositos(search.data);
    setTotalPages(search.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Lista de Reclamações</h2>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            {/*<th className="py-2 px-4 border-b">#</th> */}
            <th className="py-2 px-4 border-b">Assunto</th>
            <th className="py-2 px-4 border-b">Conteudo</th>
            <th className="py-2 px-4 border-b">Operação</th>
          </tr>
        </thead>
        <tbody>
          {depositos.map((dep, index) => (
            <tr key={dep.id} className="hover:bg-gray-50">
              {/*<td className="py-2 px-4 border-b">{(page - 1) * 5 + index + 1}</td>*/}
              <td className="py-2 px-4 border-b">{dep.assunto}</td>
              <td className="py-2 px-4 border-b">
                {dep.conteudo}
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
                  <option value="eliminar">Eliminar</option>
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
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
