export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import Emprestimo from "@/models/Emprestimo";
import Saque from "@/models/Saque";
import { NextRequest, NextResponse } from "next/server";

/** ÁREA RESERVADA PARA GESTÃO DE EMPRSTIMOS PELO ADMIN | ANALISTA */

// Aprovar o pedido de  Emprestimo
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    await Emprestimo.update({ progresso: 'CONCLUIDO' }, { where: { id: uuid } });
    return NextResponse.json({ message: "Pedido efectuado" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}


// Rejeitar o pedido de  Emprestimo

export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

   await Emprestimo.update({progresso:'CANCELADO'}, {where:{id:uuid}})
    return NextResponse.json({ message: "Pedido foi rejeitado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
  
}

// Eliminar o pedido de  Emprestimo

export async function DELETE(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

     await Emprestimo.update({ estado: false }, { where: { id: uuid } });
    return NextResponse.json({ message: "Pedido Elimindado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
