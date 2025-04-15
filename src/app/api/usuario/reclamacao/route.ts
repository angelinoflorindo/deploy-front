import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Reclamacao from "@/models/Reclamacao";

export async function GET() {
  await sequelize.authenticate();
  await sequelize.sync();
  setupAssociations();

  const pessoas = await Reclamacao.findAll();
  return NextResponse.json(pessoas);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const info = {};
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const resp = await Reclamacao.create({
      assunto: body.assunto,
      conteudo: body.conteudo,
      user_id: body.user_id
    });

    return NextResponse.json(resp);
  } catch (error) {
    console.error("Erro ao submeter reclamação ", error);
    return NextResponse.json(error, { status: 404 });
  }
}
