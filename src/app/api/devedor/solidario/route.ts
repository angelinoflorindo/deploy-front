export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import Devedor from "@/models/Devedor"; 
import { NextRequest, NextResponse } from "next/server";

// Registrar devedor assim que cionvidar os guardiãos
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const info = {
      solicitacao: 0,
      adimplencia: 0,
      inadimplencia: 0,
      user_id: userId,
    };
    const devedor = await Devedor.findOrCreate({
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
