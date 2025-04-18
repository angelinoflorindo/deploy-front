import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Proponente from "@/models/Proponente";
import Solidario from "@/models/Solidario";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const info = {
      solicitacao: 0,
      reembolsar: 0,
      satisfeitos: 0,
      insatisfeitos: 0,
      user_id: userId,
    };
    const proponente = await Proponente.findOrCreate({
      where: { user_id: userId },
      defaults: info,
    });

    return NextResponse.json(
      { message: "registrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
