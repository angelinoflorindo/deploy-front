// app/api/documento/[filename]/route.ts
import path from "path";
import fs from "fs";
import { NextRequest } from "next/server";
import { createReadStream } from "fs";
//import  {middleware}  from "@/middleware"; // Exemplo

export async function GET(req: NextRequest, context: { params: { filename: string } }) {
  const {filename} = context.params;

  // Aqui podes adicionar autenticação/autorização
  const isAutorizado = 0 //  await middleware(req);
  if (!isAutorizado) {
    return new Response("Não autorizado", { status: 401 });
  }

  const filePath = path.join(process.cwd(), "uploads", filename);

  if (!fs.existsSync(filePath)) {
    return new Response("Arquivo não encontrado", { status: 404 });
  }

  const stream = createReadStream(filePath);
  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/pdf", // ou outro tipo
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
