export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import Saque from "@/models/Saque";
import { NextRequest, NextResponse } from "next/server";

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const saque = await Saque.findOne({ where: { id: uuid } });
    const carteira = await Carteira.findOne({
      where: { user_id: saque?.user_id },
    });
    let income;
    if (carteira?.estado ===true  && saque?.pendencia=== true) {
      income = carteira?.saldo - saque?.valor;
    }

      await Saque.update({ pendencia: false }, { where: { id: uuid } });
     await Carteira.update(
      { saldo: income },
      { where: { user_id: saque?.user_id } }
    );


    return NextResponse.json({ message: "Levantamento efectuado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const saque = await Saque.findOne({ where: { id: id } });
    if (saque?.pendencia) {
      return NextResponse.json(
        { message: "Pedido inalterado" },
        { status: 200 }
      );
    }

    const carteira = await Carteira.findOne({
      where: { user_id: saque?.user_id },
    });
    
    let income;
    if (carteira?.estado ===true && saque?.pendencia==false) {
      income = carteira?.saldo + saque?.valor;
    }


    await Saque.update({ pendencia: true }, { where: { id: uuid } });
    await Carteira.update(
      { saldo: income },
      { where: { user_id: saque?.user_id } }
    );


    return NextResponse.json({ message: "Pedido foi revertido" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}


//Delete documente

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

     await Saque.update({ estado: false }, { where: { id: uuid } });
    return NextResponse.json({ message: "Pedido Elimindado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
