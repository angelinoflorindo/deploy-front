import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";

import Carteira from "@/models/Carteira";
import Documento from "@/models/Documento";
import Reembolso from "@/models/Reembolso";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param req
 * @returns
 *
 * ÁREA REZERVADA PARA GESTÃO DE ARQUIVOS
 */

//Listar todos os arquivos

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);

    const page = (await converterString(searchParams.get("page"))) || 1;
    const limit = (await converterString(searchParams.get("limit"))) || 5;

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = { estado: true };
    // para definir as condições de listagem apartir do client
    // if (estado) where.estado = estado;

    const { rows: data, count: total } = await Documento.findAndCountAll({
      where,
      include:[{model:User,attributes:['id', 'primeiro_nome', 'segundo_nome', 'email']}],
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
