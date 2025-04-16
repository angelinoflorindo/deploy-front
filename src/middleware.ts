import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


const rotasProtegidas = [
  "/dashboard",
  "/dashboard/credito",
  "/dashboard/credito/garantia",
  "/dashboard/credito/garantia?id",
  "/dashboard/credito/tipo-credito",
  "/dashboard/credito/tipo-credito?id",
  "/dashboard/historico",
  "/dashboard/historico?id",
  "/dashboard/historico/relatorio",
  "/dashboard/historico/saques",
  "/dashboard/proponente",
  "/dashboard/proponente?id",
  "/dashboard/proponente/avaliacao",
  "/dashboard/proponente/protecao",
  "/ferramenta",
  "/desenvolvimento",
  "/ferramenta/detalhes",
  "/ferramenta/detalhes?id",
  "/ferramenta/investidor",
  "/ferramenta/reclamacao",
  "/ferramenta/usuario",
  "/ferramenta/usuario?id",
  "gestao/depositos",
  "gestao/creditos",
  "gestao/emprestimos",
  "gestao/pagamentos",
  "gestao/reclamacoes",
  "gestao/saques"
];

const rotasPublicas = ["/", "/auth"];

// Função para verificar se a rota é protegida
function isRotaProtegida(path: any) {
  return rotasProtegidas.some((route) => path.startsWith(route));
}

// Função para verificar se a rota é pública
function isRotaPublica(path: any) {
  return rotasPublicas.includes(path);
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Verificar se a rota é pública ou protegida
  const isProtegida = isRotaProtegida(path);
  const isPublica = isRotaPublica(path);

  // Recuperar o token do usuário (Verifica se está logado)
  const token = await getToken({ req, secret:process.env.NEXTAUTH_SECRET});

  // Se a rota for protegida e o usuário não estiver logado, redireciona para a página inicial
  //
  if (isProtegida && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Se a rota for pública, mas o usuário já estiver logado, redireciona para o dashboard
  //
  if (isPublica && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ferramenta/:path*",
    "/gestao/:path*",
    "/api/documento/:path*",
   // "/api/upload",
  ],
};
