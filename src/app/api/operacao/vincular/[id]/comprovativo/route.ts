export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { converterString } from "@/app/actions/auth";
import { getToken } from "next-auth/jwt";
import {Deposito} from "@/models/Deposito";
import {Documento} from "@/models/Documento";


// mantentdo informaçoes atuais 
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || (token.role !== "ADMIN" && token.role != "ANALISTA")) {
    return NextResponse.json("Não autorizado", { status: 403 });
  }
  try {

    const deposito = await Deposito.findOne({ where: { id: uuid } });
    const infoDeposito = {
      data: deposito?.createdAt.getDate(),
      horas: deposito?.createdAt.getHours(),
    };

    const documentos = await Documento.findAll({
      where: {
        user_id: deposito?.user_id,
        tipo: "DEPOSITO",
      },
    });

    const comprovativo: any = {};
    documentos.forEach((doc) => {
      if (
        doc.createdAt.getDate() === infoDeposito.data &&
        doc.createdAt.getHours() === infoDeposito.horas
      ) {
        comprovativo.nome_original = doc.nome_original;
        comprovativo.nome_salvado = doc.nome_salvado;
        comprovativo.extensao = doc.extensao;
        comprovativo.tamanho = doc.tamanho;
        comprovativo.user_id = doc.user_id;
        return;
      }
    });

    // Caminho absoluto do arquivo (ajuste conforme tua estrutura)
    const filePath = path.join(
      process.cwd(),
      "uploads",
      `user_${comprovativo.user_id}`,
      `${comprovativo.nome_salvado}`
    );

    //  console.log('caminho', filePath)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Arquivo não encontrado" },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${comprovativo.nome_salvado}"`,
      },
    });
  } catch (error) {
    console.error("error de download", error);
    return NextResponse.json(error, { status: 404 });
  }
}
