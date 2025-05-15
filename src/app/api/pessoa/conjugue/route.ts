export const dynamic = 'force-dynamic';
import { sequelize } from "@/lib/sequelize";
import {Conjugue} from "@/models/Conjugue";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const body = await req.json();

  const info = {
    nome_completo: body.nome_completo,
    dependentes:Number(body.dependentes),
    nivel_instrucao: body.nivel_instrucao,
    data_nascimento: body.data_nascimento,
    pessoa_id: Number(body.pessoa_id),
  };

  try {
    await sequelize.authenticate()
    await sequelize.sync()
    const resp = await Conjugue.create(info);

    return NextResponse.json(resp);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
