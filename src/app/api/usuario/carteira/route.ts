export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import {
  gerarCodigoCartao,
  gerarNumeroCartao,
} from "@/app/actions/ramdom";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const codigoGerado = await gerarCodigoCartao();
  const numeroGerado = await gerarNumeroCartao();

  await sequelize.authenticate();
  await sequelize.sync();
  setupAssociations();

  const [result] = await Carteira.findOrCreate({
    where: {
      user_id: await converterString(body.user_id),
      codigo: codigoGerado,
      numero: numeroGerado,
    },
    defaults: {
      saldo: 0,
      user_id: await converterString(body.user_id),
      codigo: codigoGerado,
      numero: numeroGerado,
    },
  });
  return NextResponse.json(result);

  /*
  try {
    
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }

  */
}
