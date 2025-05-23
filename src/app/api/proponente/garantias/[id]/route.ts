export const dynamic = "force-dynamic";
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import ContaVinculada from "@/models/ContaVinculada";
import Proponente from "@/models/Proponente";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const vinculo = await ContaVinculada.findOne({
      where: { id: uuid, estado: true },
    });
    if (!vinculo) {
      return NextResponse.json(
        { message: "Pedido já efectuado" },
        { status: 403 }
      );
    }

    const proponente = await Proponente.findOne({
      where: { id: vinculo?.proponente_id },
    });
    const usuario = await User.findOne({ where: { id: proponente?.user_id } });

    const carteira = await Carteira.findOne({
      where: { user_id: usuario?.id },
    });
    if (!carteira) {
      return NextResponse.json(
        { message: "Carteira digital não encontrada" },
        { status: 403 }
      );
    }
    carteira!.saldo = carteira!.saldo + vinculo.valor_retido;
    vinculo.estado = false;
    vinculo.save();
    carteira?.save();
    return NextResponse.json({ message: "Serviço efectuado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const vinculo = await ContaVinculada.findOne({
      where: { id: uuid, estado: false },
    });
    if (!vinculo) {
      return NextResponse.json(
        { message: "Pedido já efectuado" },
        { status: 403 }
      );
    }

    const proponente = await Proponente.findOne({
      where: { id: vinculo?.proponente_id },
    });
    const usuario = await User.findOne({ where: { id: proponente?.user_id } });

    const carteira = await Carteira.findOne({
      where: { user_id: usuario?.id },
    });
    if (!carteira) {
      return NextResponse.json(
        { message: "Carteira digital não encontrada" },
        { status: 403 }
      );
    }
    carteira!.saldo = carteira!.saldo - vinculo.valor_retido;
    vinculo.estado = true;
    vinculo.save();
    carteira?.save();
    return NextResponse.json(
      { message: "Pedido efectuado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
