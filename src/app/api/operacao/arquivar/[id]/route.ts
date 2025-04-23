import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import Deposito from "@/models/Deposito";
import Documento from "@/models/Documento";
import Reembolso from "@/models/Reembolso";
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
  const uuid = await converterString(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

     await Documento.update({ estado: false }, { where: { id: uuid } });
    return NextResponse.json({ message: "Documento arquivado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
