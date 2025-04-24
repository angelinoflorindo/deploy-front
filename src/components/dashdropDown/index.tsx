
'use client'

import { useState } from 'react';

type Role = 'ADMIN' | 'ANALISTA';

interface MenuItem {
  label: string;
  path: string;
  roles: Role[];
}

const menuItems: MenuItem[] = [
  { label: 'Gerir Depósitos', path: '/gestao/depositos', roles: ['ADMIN', 'ANALISTA'] },
  //{ label: 'Gerir Pagamentos', path: '/gestao/pagamentos', roles: ['ADMIN', 'ANALISTA'] },
  //{ label: 'Gerir Reembolsos', path: '/gestao/pagamentos', roles: ['ADMIN', 'ANALISTA'] },
  { label: 'Gerir Saques', path: '/gestao/saques', roles: ['ADMIN'] },
  { label: 'Gerir Empréstimos', path: '/gestao/emprestimos', roles: ['ADMIN'] },
  { label: 'Gerir Créditos', path: '/gestao/creditos', roles: ['ADMIN'] },
  { label: 'Gerir Reclamações', path: '/gestao/reclamacoes', roles: ['ADMIN', 'ANALISTA'] },
  { label: 'Gerir Documentos', path: '/gestao/documentos', roles: ['ADMIN', 'ANALISTA'] },
 // { label: 'Gerir Contas', path: '/gestao/contas', roles: ['ADMIN', 'ANALISTA'] }, // ficará pendente
  //{ label: 'Gerir Proteções', path: '/gestao/protecoes', roles: ['ADMIN'] },
];


export default function DashDropDown({ userRole }: {userRole:Role}) {
  const [open, setOpen] = useState(false);

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        painel de análise 
      </button>

      {open && (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {filteredItems.map(item => (
              <a
                key={item.path}
                href={item.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
