export const dynamic = 'force-dynamic';
import { converterString, hashPassword } from "@/app/actions/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Pessoa from "@/models/Pessoa";
import Reclamacao from "@/models/Reclamacao";

// DELETE - Remover usuário por ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    await Reclamacao.update({ estado: false }, { where: { id: uuid } });

    return NextResponse.json("Reclamação eliminado");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
