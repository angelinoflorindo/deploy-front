import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { converterString } from "@/app/actions/auth";
import { getToken } from "next-auth/jwt";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Documento from "@/models/Documento";
import ContaVinculada from "@/models/ContaVinculada";
import Proponente from "@/models/Proponente";
import User from "@/models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  const uuid = await converterString(id);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || (token.role !== "ADMIN" && token.role != "ANALISTA")) {
    return NextResponse.json("Não autorizado", { status: 403 });
  }

  
  try {
   
  await sequelize.authenticate();
  await sequelize.sync();
  setupAssociations();

  const vinculo = await ContaVinculada.findOne({
    where: { id: uuid },
  });

  const proponente = await Proponente.findOne({where:{id:vinculo?.proponente_id}})
  const usuario = await User.findOne({where:{id:proponente?.user_id}})

  //console.log('vinculos', vinculo)

  const infovinculo = {
    data: vinculo?.createdAt.getDate(),
    horas: vinculo?.createdAt.getHours(),
  };

  const documentos = await Documento.findAll({
    where: {
      user_id: usuario?.id,
      tipo: "DEPOSITO"
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

  // Caminho absoluto do arquivo (ajuste conforme tua estrutura)
  const filePath = path.join(
    process.cwd(),
    "uploads",
    `user_${comprovativo.user_id}`,
    `${comprovativo.nome_salvado}`
  );

  //console.log("caminho", filePath);

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
