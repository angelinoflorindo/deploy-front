export const dynamic = 'force-dynamic';
import { converterString, validarEstado } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import ContaVinculada from "@/models/ContaVinculada";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import {Solidario} from "@/models/Solidario";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);

  const emprestimoId = await converterString(searchParams.get("id"));
  const page = (await converterString(searchParams.get("page"))) || 1;
  const limit = (await converterString(searchParams.get("limit"))) || 5;
  const status = await validarEstado(searchParams.get("status"));
  const orderBy = searchParams.get("order") || "created_at";

  const offset = (Number(page) - 1) * Number(limit);
  const where: any = {};
  // para definir as condições de listagem apartir do client
  where.emprestimo_id = emprestimoId;


  try {
    await sequelize.authenticate()
    await sequelize.sync()

    const emprestimo = await Emprestimo.findOne({
      where: { id: emprestimoId },
    });

    const { rows: vinculadaData, count: vinculos } =
      await ContaVinculada.findAndCountAll({
        where: { proponente_id: emprestimo?.proponente_id},
        offset,
        limit: Number(limit),
        order: [[`${orderBy}`, "DESC"]],
      });

    const { rows: solidariosData, count: aval } =
      await EmprestimoSolidario.findAndCountAll({
        where,
        offset,
        limit: Number(limit),
        order: [[`${orderBy}`, "DESC"]],
        include: [{ model: Solidario,as:"Solidario",where:{estado:status} }],
      });

    const result = {
      data: {
        solidariosData,
        vinculadaData,
      },

      totalPages: {
        aval: Math.ceil(aval / Number(limit)),
        vinculos: Math.ceil(vinculos / Number(limit)),
      },
      currentPage: Number(page),
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
