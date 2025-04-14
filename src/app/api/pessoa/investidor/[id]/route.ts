import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Investidor from "@/models/Investidor";
import { NextRequest, NextResponse } from "next/server";




// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const result = await Investidor.update({body}, { where: { id: uuid }});
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({message:error}, {status:404});
  }
}

