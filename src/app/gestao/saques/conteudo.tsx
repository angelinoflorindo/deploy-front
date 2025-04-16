
"use client";

import { clientAPI } from "@/app/lib/definitions";
import { SaqueProps } from "@/services/user.service";
import { useEffect, useState } from "react";

const url = clientAPI;
export default function Conteudo() {
  const [depositos, setDepositos] = useState<SaqueProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "aprovar":
        await fetch(`${url}/api/operacao/sacar/${id}`, {
          method: "PUT",
        });
        alert("Pedido aprovado");
        window.location.reload()
        break
      case "reverter":
        await fetch(`${url}/api/operacao/sacar/${id}`, {
          method: "GET",
        });
        alert("Pedido Revertido");
        window.location.reload()
        break
      case "eliminar":
        await fetch(`${url}/api/operacao/sacar/${id}`, {
          method: "DELETE",
        });
        alert("Pedido eliminado");
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
      `${url}/api/operacao/sacar?page=${page}&limit=5&status=${true}`
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
      <h2 className="text-xl font-bold mb-4">Pedidos de Levantamentos</h2>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            {/*<th className="py-2 px-4 border-b">#</th> */}
            <th className="py-2 px-4 border-b">Valor</th>
            <th className="py-2 px-4 border-b">Situação</th>
            <th className="py-2 px-4 border-b">Dia/Mês</th>
            <th className="py-2 px-4 border-b">Operação</th>
          </tr>
        </thead>
        <tbody>
          {depositos.map((dep, index) => (
            <tr key={dep.id} className="hover:bg-gray-50">
              {/*<td className="py-2 px-4 border-b">{(page - 1) * 5 + index + 1}</td>*/}
              <td className="py-2 px-4 border-b">{dep.valor}Kz</td>
              <td className="py-2 px-4 border-b">
                {dep.pendencia ? "Pendente" : "Concluido"}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(dep.createdAt).getDay()}/
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
                  <option value="aprovar"> Aprovar</option>
                  <option value="reverter">Reverter</option>
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
