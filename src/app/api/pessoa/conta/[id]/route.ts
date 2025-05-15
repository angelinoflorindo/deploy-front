export const dynamic = "force-dynamic";
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import { Conta } from "@/models/Conta";
import { NextRequest, NextResponse } from "next/server";

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);
  const body = await req.json();

  const info = {
    nome: body.nome,
    iban: body.iban,
    salario: await converterString(body.salario),
    emprego_id: Number(body.emprego_id),
    pessoa_id: Number(body.pessoa_id),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const result = await Conta.update(info, { where: { id: uuid } });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
