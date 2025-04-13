// app/api/upload/route.ts
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { converterString } from "@/app/actions/auth";
import Documento from "@/models/Documento"


export async function POST(req: Request) {
  const formData = await req.formData();

  const files = formData.getAll("scanner") as File[];

  const rawTitulo = formData.get("titulo");
  const rawTipo = formData.get("tipo");

  const titulo = typeof rawTitulo === "string" ? rawTitulo : "";
  const tipo = typeof rawTipo === "string" ? rawTipo : "";

  if (files.length === 0) {
    return new Response(
      JSON.stringify({ message: "Nenhum ficheiro enviado." })
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const savedFiles = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalExtension = file.name.split(".").pop();
    const uniqueName = `${randomUUID()}.${originalExtension}`;

    const filePath = path.join(uploadDir, uniqueName);

    await writeFile(filePath, buffer);

    const documento = {
      nome_salvado: uniqueName,
      nome_orignal: file.name,
      extensao: file.type,
      tamanho: file.size,
      titulo: titulo,
      tipo: tipo,
      user_id: await converterString(formData.get("user_id")),
    };
   const res =  await Documento.create(documento)
   savedFiles.push(res) 
  }
  
  if(savedFiles.length < 1){
    return new Response(
      JSON.stringify({ message: "Houve um erro ao registrar documentos!" })
    );
  }
    

  return new Response(JSON.stringify(savedFiles));
}
