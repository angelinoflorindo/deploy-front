import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Conta from "@/models/Conta";
import { NextRequest, NextResponse } from "next/server";

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  const body = await req.json();
  
  const info = {
    saldo: body.saldo,
    numero: body.numero,
    codigo: 234,
    user_id: await converterString(body.user_id),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const result = await Conta.update(info, {where: { id: uuid }});

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({message:error}, {status:404});
  }
}
