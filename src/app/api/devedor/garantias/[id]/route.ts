export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import DebitoVinculado from "@/models/DebitoVinculado";
import Devedor from "@/models/Devedor";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// PUT - Realizar a devolução do depódito retidos
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = context.params;
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const vinculo = await DebitoVinculado.findOne({
      where: { id: uuid, estado: true },
    });
    if (!vinculo) {
      return NextResponse.json(
        { message: "Pedido já efectuado" },
        { status: 403 }
      );
    }

    const devedor = await Devedor.findOne({
      where: { id: vinculo?.devedor_id },
    });
    const usuario = await User.findOne({ where: { id: devedor?.user_id } });

    const carteira = await Carteira.findOne({
      where: { user_id: usuario?.id },
    });
    carteira!.saldo = carteira!.saldo + vinculo.valor_retido;
    vinculo.estado = false;
    vinculo.save();
    carteira?.save();
    return NextResponse.json({ message: "Serviço efectuado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// Manter os valores retidos por mais tempo
export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  
  
  const { id } =  context.params;
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const vinculo = await DebitoVinculado.findOne({
      where: { id: uuid, estado: false },
    });
    if (!vinculo) {
      return NextResponse.json(
        { message: "Pedido já efectuado" },
        { status: 403 }
      );
    }

    const devedor = await Devedor.findOne({
      where: { id: vinculo?.devedor_id },
    });
    const usuario = await User.findOne({ where: { id: devedor?.user_id } });

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
