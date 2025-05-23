export const dynamic = "force-dynamic";
import { sequelize } from "@/lib/sequelize";
import { Pessoa } from "@/models/Pessoa";
import { Solidario } from "@/models/Solidario";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// PUT - Método que permite o guardião aceitar o convite
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);
  const body = await req.json();
  const dbData: any = {};

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await Solidario.update(
      { estado: true },
      { where: { id: uuid, tipo: body.tipo } }
    );

    return NextResponse.json(
      { message: "convite aceite com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = Number(id);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const resp = await Solidario.findAll({
      where: { user_id: uuid, estado: false },
      include: [
        {
          model: Pessoa,
          as: "Pessoa",
          include: [
            {
              model: User,
              as: "User",
              attributes: ["primeiro_nome", "segundo_nome", "id", "email"],
            },
          ],
        },
      ],
    });

    const total = await Solidario.sum("taxa", {
      where: { estado: false, user_id: uuid },
    });

    if (!resp) {
      return NextResponse.json(
        { message: "Dados não encontrados" },
        { status: 404 }
      );
    }

    const result = {
      data: resp,
      total: total,
    };
    // console.log("Dados solicitados", result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error },
      { status: 500 }
    );
  }
}

// DELETE - rejeitar o pedido de guardião
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await Solidario.destroy({ where: { id: uuid } }); // posteriormente criar um atributo definido para remoção de dados

    return NextResponse.json("Convite rejeitado!");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
