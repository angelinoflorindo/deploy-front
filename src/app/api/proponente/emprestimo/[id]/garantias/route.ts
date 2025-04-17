import { converterString, validarEstado } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import ContaVinculada from "@/models/ContaVinculada";
import Documento from "@/models/Documento";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import Proponente from "@/models/Proponente";
import Solidario from "@/models/Solidario";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const emprestimoId = await converterString(id);
  const { searchParams } = new URL(req.url);
  const page = (await converterString(searchParams.get("page"))) | 1;
  const limit = (await converterString(searchParams.get("limit"))) | 5;
  const status = await validarEstado(searchParams.get("status"));
  const orderBy = searchParams.get("order") || "created_at";

  const offset = (Number(page) - 1) * Number(limit);
  const where: any = {};
  // para definir as condições de listagem apartir do client
  where.emprestimo_id = emprestimoId
  if (status) {
    where.estado = status;
  }

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const emprestimo = await Emprestimo.findOne({where:{id:emprestimoId}})

    const { rows: vinculadaData, count: vinculos } = await ContaVinculada.findAndCountAll({
      where:{proponente_id:emprestimo?.proponente_id},
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
    
    });

    
    const { rows: solidariosData, count: aval } = await EmprestimoSolidario.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
      include:[{model:Solidario}]
    });


    const result = {
      data:{
        solidariosData,
        vinculadaData
      },
  
      totalPages: {
        aval:Math.ceil(aval / Number(limit)),
        vinculos:Math.ceil(vinculos / Number(limit))
      },
      currentPage: Number(page),
    };

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
