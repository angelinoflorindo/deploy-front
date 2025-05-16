export const dynamic = "force-dynamic"; 
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import { Deposito } from "@/models/Deposito";
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

    const deposito = await Deposito.findOne({ where: { id: id } });
    const carteira = await Carteira.findOne({
      where: { user_id: deposito?.user_id },
    });
    let income;
    if (carteira?.estado === true && deposito?.pendencia === true) {
      income = carteira?.saldo + deposito?.valor;
    }

    await Deposito.update({ pendencia: false }, { where: { id: uuid } });
    await Carteira.update(
      { saldo: income },
      { where: { user_id: deposito?.user_id } }
    );

    return NextResponse.json({ message: "Depósito aprovado" }, { status: 200 });
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
    
    const deposito = await Deposito.findOne({ where: { id: id } });
    if (deposito?.pendencia) {
      return NextResponse.json(
        { message: "Depósito inalterado" },
        { status: 200 }
      );
    }

    const carteira = await Carteira.findOne({
      where: { user_id: deposito?.user_id },
    });

    let income;
    if (carteira?.estado === true && deposito?.pendencia == false) {
      income = carteira?.saldo - deposito?.valor;
    }

    await Deposito.update({ pendencia: true }, { where: { id: uuid } });
    await Carteira.update(
      { saldo: income },
      { where: { user_id: deposito?.user_id } }
    );

    return NextResponse.json(
      { message: "Depósito foi revertido" },
      { status: 200 }
    );
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
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    
    await Deposito.update({ estado: false }, { where: { id: uuid } });
    return NextResponse.json(
      { message: "Depósito Elimindado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
