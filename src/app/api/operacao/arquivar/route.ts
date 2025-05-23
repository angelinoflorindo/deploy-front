export const dynamic = "force-dynamic";

import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";

import { Documento } from "@/models/Documento";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

//Listar todos os arquivos

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = (await converterString(searchParams.get("page"))) || 1;
  const limit = (await converterString(searchParams.get("limit"))) || 5;

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = { estado: true };
    // para definir as condições de listagem apartir do client
    // if (estado) where.estado = estado;

    const { rows: data, count: total } = await Documento.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as:"User",
          attributes: ["id", "primeiro_nome", "segundo_nome", "email"],
        },
      ],
      offset,
      limit: Number(limit),
      order: [["created_at", "DESC"]],
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
