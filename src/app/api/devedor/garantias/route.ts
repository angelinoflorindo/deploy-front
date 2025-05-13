export const dynamic = 'force-dynamic';
import { converterString, validarEstado } from "@/app/actions/auth"; 
import { sequelize } from "@/lib/sequelize";
import Credito from "@/models/Credito";
import CreditoSolidario from "@/models/CreditoSolidario";
import DebitoVinculado from "@/models/DebitoVinculado";
import Solidario from "@/models/Solidario";
import { NextRequest, NextResponse } from "next/server";

// ÁREA REZERVADA A LISTAGEM DE GARANTIAS DO DEVEDOR
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const creditoId = await converterString(searchParams.get("id"));
  const page = (await converterString(searchParams.get("page"))) || 1;
  const limit = (await converterString(searchParams.get("limit"))) || 5;
  const status = await validarEstado(searchParams.get("status"));
  const orderBy = searchParams.get("order") || "created_at";

  const offset = (Number(page) - 1) * Number(limit);
  const where: any = {};
  // para definir as condições de listagem apartir do client
  where.credito_id = creditoId;

  try {

    
  await sequelize.authenticate();
  await sequelize.sync();
  //setupAssociations();

  const credito = await Credito.findOne({
    where: { id: creditoId },
  });

  const { rows: vinculadaData, count: vinculos } =
    await DebitoVinculado.findAndCountAll({
      where: { devedor_id: credito?.devedor_id, },
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
    });

  const { rows: solidariosData, count: aval } =
    await CreditoSolidario.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
      include: [{ model: Solidario, where:{estado:status} }],
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
