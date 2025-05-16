export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import Reclamacao from "@/models/Reclamacao";
import { sequelize } from "@/lib/sequelize";

// DELETE - Remover usuário por ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const uuid = Number(id);
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    await Reclamacao.update({ estado: false }, { where: { id: uuid } });

    return NextResponse.json("Reclamação eliminado");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
