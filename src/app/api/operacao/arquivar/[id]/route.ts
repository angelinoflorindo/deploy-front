export const dynamic = "force-dynamic";
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import { Documento } from "@/models/Documento";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param req
 * @param context
 * @returns
 *
 * Página dedicada a especificidade de gestão de arquivos
 */

export async function DELETE(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await Documento.update({ estado: false }, { where: { id: uuid } });
    return NextResponse.json(
      { message: "Documento arquivado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
