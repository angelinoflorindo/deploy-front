export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import {Credito} from "@/models/Credito";
import {CreditoSolidario} from "@/models/CreditoSolidario";
import {Devedor} from "@/models/Devedor";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import {Pessoa} from "@/models/Pessoa";
import Proponente from "@/models/Proponente";
import {Solidario} from "@/models/Solidario";
import {User} from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// PUT - Método que permite o guardião aceitar o convite
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  const body = await req.json();
  const dbData: any = {};

  try {

    const user = await User.findByPk(body.user_id, {
      include: [
        { model: Devedor, attributes: ["id"] },
        { model: Proponente, attributes: ["id"] },
      ],
    });

    if (user?.toJSON().Devedor) {
      dbData.credito = await Credito.findOne({
        where: {
          devedor_id: user?.toJSON().Devedor.id,
          progresso: "CONCLUIDO",
          estado: true,
        },
      });
    }

    if (user?.toJSON().Proponente) {
      dbData.emprestimo = await Emprestimo.findOne({
        where: {
          proponente_id: user?.toJSON().Proponente.id,
          progresso: "CONCLUIDO",
          estado: true,
        },
      });
    }

    await sequelize.transaction(async (t) => {
      await Solidario.update(
        { estado: true },
        { where: { id: uuid, tipo: body.tipo }, transaction: t }
      );

      if (body.tipo === "CREDITO") {
        const [result, iscreated] = await CreditoSolidario.findOrCreate({
          where: {
            credito_id: dbData.credito?.id,
            solidario_id: uuid,
          },
          defaults: { credito_id: dbData.credito?.id, solidario_id: uuid },
          transaction: t,
        });
      }

      const [result, iscreated] = await EmprestimoSolidario.findOrCreate({
        where: {
          emprestimo_id: dbData.emprestimo?.id,
          solidario_id: uuid,
        },
        defaults: { emprestimo_id: dbData.emprestimo?.id, solidario_id: uuid },
        transaction: t,
      });
    });
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
  const uuid = await converterString(id);
  try {

    const resp = await Solidario.findAll({
      where: { user_id: uuid, estado: false },
      include: [
        {
          model: Pessoa,
          include: [
            {
              model: User,
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
  const uuid = await converterString(id);

  try {

    await Solidario.destroy({ where: { id: uuid } }); // posteriormente criar um atributo definido para remoção de dados

    return NextResponse.json("Convite rejeitado!");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
