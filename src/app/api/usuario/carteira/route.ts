import {
  converterString,
  gerarCodigoCartao,
  gerarNumeroCartao,
} from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const codigoGerado = await gerarCodigoCartao();
  const numeroGerado = await gerarNumeroCartao();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const [result] = await Carteira.findOrCreate({
      where: {
        user_id: await converterString(body.user_id),
        codigo: await converterString(codigoGerado),
        numero: await converterString(numeroGerado),
      },
      defaults:{
        saldo: 0,
        user_id: await converterString(body.user_id),
        codigo: await converterString(codigoGerado),
        numero: await converterString(numeroGerado),
      }
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
