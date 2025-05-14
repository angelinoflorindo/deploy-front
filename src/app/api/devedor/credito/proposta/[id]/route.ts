export const dynamic = 'force-dynamic';
import {Credito} from "@/models/Credito";
import {CreditoSolidario} from "@/models/CreditoSolidario";
import {Solidario} from "@/models/Solidario";
import {User} from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { fn, col, literal } from "sequelize";
import {DebitoVinculado} from "@/models/DebitoVinculado";
import {Devedor} from "@/models/Devedor";

// Buscar os dados dos Creditos aprovados
export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = context.params;
  const uuid = Number(id);

  try {


    const credito = await Credito.findOne({
      where: {
        id: uuid,
        progresso: "CONCLUIDO",
        estado: true,
        pendencia: true,
      },
      attributes: [
        "id",
        "juro",
        "prestacao",
        "valor",
        "tipo",
        "prazo",
        "progresso",
        "devedor_id",
        "created_at",
        "updated_at",
        [
          fn("COUNT", literal("DISTINCT CreditoSolidarios.id")),
          "totalGuardiaos",
        ],
        [
          fn("COALESCE", fn("SUM", col("CreditoSolidarios.Solidario.taxa")), 0),
          "totalTaxa",
        ],
      ],
      include: [
        {
          model: CreditoSolidario,
          include: [
            {
              model: Solidario,
              where: { estado: true },
              attributes: ["parentesco", "taxa", "tipo"],
            },
          ],
        },
        {
          model: Devedor,
          include: [
            {
              model: User,
              attributes: [
                "id",
                "primeiro_nome",
                "segundo_nome",
                "email",
                "telemovel",
              ],
            },
            {
              model: DebitoVinculado,
              where: { estado: true },
              required: false,
            },
          ],
        },
      ],
      group: [
        "Credito.id",
        "Devedor.id",
        "Devedor->User.id",
        "Devedor->DebitoVinculados.id",
      ],
      raw: false,
    });

    //console.log("validar", credito)
    return NextResponse.json(credito, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// PUT - Atualizar a taxa de participação do investidor
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = context.params;
  const uuid = Number(id);

  try {

    await Credito.update({ pendencia: false }, { where: { id: uuid } });
    return NextResponse.json({ message: "Pedido efectuado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
