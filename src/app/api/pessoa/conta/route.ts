export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import {Conta} from "@/models/Conta";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const info = {
    nome: body.nome,
    iban: body.iban,
    salario: await converterString(body.salario),
    emprego_id: await converterString(body.emprego_id),
    pessoa_id: await converterString(body.pessoa_id),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const result = await Conta.create(info);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({message:error}, {status:404})
  }
}
