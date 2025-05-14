export const dynamic = 'force-dynamic';
import { converterString, hashPassword } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import Reclamacao from "@/models/Reclamacao";

// DELETE - Remover usuário por ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {
    await Reclamacao.update({ estado: false }, { where: { id: uuid } });

    return NextResponse.json("Reclamação eliminado");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
