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

  console.log("confirmar dados", body);
  const info = {
    assunto: body.assunto,
    conteudo: body.conteudo,
    user_id: body.user_id,
  };
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const resp = await Reclamacao.create(info);

    return NextResponse.json(resp);
  } catch (error) {
    console.error("Erro ao submeter reclamação ", error);
    return NextResponse.json(error,{ status:404});
  }
}
