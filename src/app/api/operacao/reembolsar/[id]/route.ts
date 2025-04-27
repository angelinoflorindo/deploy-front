export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import Deposito from "@/models/Deposito";
import Reembolso from "@/models/Reembolso";
import { NextRequest, NextResponse } from "next/server";


/**
 * 
 * @param req 
 * @param context 
 * @returns 
 * 
 * Página dedicada a informações de reembolso
 */


// Consultar o registro de reembolsos de emprestimos

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

    const result = await Reembolso.findOne({ where: {proponente_id: id, estado:true}});

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}




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

    const deposito = await Deposito.findOne({ where: { id: uuid } });
    const carteira = await Carteira.findOne({
      where: { user_id: deposito?.user_id },
    });
    let income;
    if (carteira?.estado ===true  && deposito?.pendencia=== true) {
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

     await Deposito.update({ estado: false }, { where: { id: uuid } });
    return NextResponse.json({ message: "Depósito Elimindado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
