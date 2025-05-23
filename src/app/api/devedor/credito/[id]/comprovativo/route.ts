export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getToken } from "next-auth/jwt";
import { Documento } from "@/models/Documento";
import { User } from "@/models/User";
import { DebitoVinculado } from "@/models/DebitoVinculado";
import { Devedor } from "@/models/Devedor";
import { sequelize } from "@/lib/sequelize";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; //mantendo informações actuais
  const uuid = Number(id);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || (token.role !== "ADMIN" && token.role != "ANALISTA")) {
    return NextResponse.json("Não autorizado", { status: 403 });
  }

  try {
    await sequelize.authenticate()
    await sequelize.sync()
     const vinculo = await DebitoVinculado.findOne({
      where: { id: uuid },
    });

    const devedor = await Devedor.findOne({
      where: { id: vinculo?.devedor_id },
    });
    const usuario = await User.findOne({ where: { id: devedor?.user_id } });

   
    const infovinculo = {
      data: vinculo?.createdAt.getDate(),
      horas: vinculo?.createdAt.getHours(),
    };

    const documentos = await Documento.findAll({
      where: {
        user_id: usuario?.id,
        tipo: "ORDEM_DEBITO",
        estado: true,
      },
    });

    const comprovativo: any = {};
    documentos.forEach((doc) => {
      if (
        doc.createdAt.getDate() === infovinculo.data &&
        doc.createdAt.getHours() === infovinculo.horas
      ) {
        comprovativo.nome_original = doc.nome_original;
        comprovativo.nome_salvado = doc.nome_salvado;
        comprovativo.extensao = doc.extensao;
        comprovativo.tamanho = doc.tamanho;
        comprovativo.user_id = doc.user_id;
        return;
      }
    });

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
