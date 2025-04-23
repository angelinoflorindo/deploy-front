import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { converterString } from "@/app/actions/auth";
import { getToken } from "next-auth/jwt";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Documento from "@/models/Documento";

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
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const arquivo = await Documento.findOne({ where: { id: uuid } });

    let comprovativo:any = {}

    comprovativo.nome_original = arquivo?.nome_original;
    comprovativo.nome_salvado = arquivo?.nome_salvado;
    comprovativo.extensao = arquivo?.extensao;
    comprovativo.tamanho = arquivo?.tamanho;
    comprovativo.user_id = arquivo?.user_id

    // Caminho absoluto do arquivo (ajuste conforme tua estrutura)
    const filePath = path.join(
      process.cwd(),
      "uploads",
      `user_${comprovativo.user_id}`,
      `${comprovativo.nome_salvado}`
    );

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
