import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Deposito from "@/models/Deposito";
import Proponente from "@/models/Proponente";
import ContaVinculada from "@/models/ContaVinculada";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);

    const page = (await converterString(searchParams.get("page"))) || 1;
    const limit = (await converterString(searchParams.get("limit"))) || 5;
    //    const estado = searchParams.get('status')

    const offset = (Number(page) - 1) * Number(limit);
    // const where: any = { estado: true };
    // para definir as condições de listagem apartir do client
    // if (estado) where.estado = estado;

    const { rows: data, count: total } = await ContaVinculada.findAndCountAll({
      offset,
      limit: Number(limit),
      order: [["created_at", "DESC"]],
    });

    console.log(" depositos", data);
    const result = {
      data,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    };
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar os depósitos." },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);

    const page = (await converterString(searchParams.get("page"))) | 1;
    const limit = (await converterString(searchParams.get("limit"))) | 5;
    const status = searchParams.get("status");
    const pendencia = searchParams.get("pendencia");
    const orderBy = searchParams.get("order") || "created_at";

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};
    // para definir as condições de listagem apartir do client
    if (status) where.estado = status;
    if (pendencia) where.pendencia = pendencia;

    const { rows: data, count: total } = await Deposito.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
    });

    //console.log("dados de depositos", data)
    const result = {
      data,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    };
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar os depósitos." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const info = {
      solicitacao: 0,
      reembolsar: 0,
      satisfeitos: 0,
      insatisfeitos: 0,
      user_id: userId,
    };
    const proponente = await Proponente.findOrCreate({
      where: { user_id: userId },
      defaults: info,
    });

    // console.log("proponente", proponente)
    //console.log("proponente guardado ", proponente[0].id)
    const result = await ContaVinculada.create({
      valor_retido: await converterString(body.valor),
      proponente_id: proponente[0].id,
      data_desbloqueio: new Date(),
    });

    // console.log("vinculada", result)

    return NextResponse.json(
      { message: "registrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
