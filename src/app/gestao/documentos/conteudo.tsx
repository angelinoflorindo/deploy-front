"use client";

import { clientAPI } from "@/app/lib/definitions";
import {  DocumentoProps } from "@/services/user.service";
import { useEffect, useState } from "react";

const url = clientAPI;
export default function Conteudo() {
  const [arquivos, setArquivos] = useState<DocumentoProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "arquivar":
        await fetch(`${url}/api/operacao/arquivar/${id}`, {
          method: "DELETE",
        });
        alert("Documento arquivado");
        fetchData()
        break;
      case "baixar":
        window.open(
          `${url}/api/operacao/arquivar/${id}/comprovativo`,
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
      `${url}/api/operacao/arquivar?page=${page}&status=${true}&limit=5`
    );

    if (!res.ok) {
      const text = await res.text(); // debug da resposta
      console.error("Erro na API:", res.status, text);
      return;
    }

    const search = await res.json();

    setArquivos(search.data);
    setTotalPages(search.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Gestão de arquivos</h2>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            {/*<th className="py-2 px-4 border-b">#</th> */}
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">Proprietario</th>
            <th className="py-2 px-4 border-b">Operação</th>
          </tr>
        </thead>
        <tbody>
          {arquivos.map((dep, index) => (
            <tr key={dep.id} className="hover:bg-gray-50">
              {/*<td className="py-2 px-4 border-b">{(page - 1) * 5 + index + 1}</td>*/}
              <td className="py-2 px-4 border-b">{dep.tipo}</td>
              <td className="py-2 px-4 border-b">{dep.titulo}</td>
              <td className="py-2 px-4 border-b">{dep.User.primeiro_nome} {dep.User.segundo_nome}</td>
              <td className="py-2 px-4 border-b text-right">
                <select
                  onChange={(e) => handleAcao(e.target.value, dep.id)}
                  className="border rounded px-2 py-1 bg-white text-sm"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Analisar
                  </option>
                  <option value="arquivar"> Arquivar</option>
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
