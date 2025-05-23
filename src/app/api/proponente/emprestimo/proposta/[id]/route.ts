export const dynamic = "force-dynamic";
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import ContaVinculada from "@/models/ContaVinculada";
import Diversificacao from "@/models/Diversificacao";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import Proponente from "@/models/Proponente";
import { Solidario } from "@/models/Solidario";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { fn, col, literal } from "sequelize";

// Buscar os dados do emprestimo como proposta
export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const emprestimo = await Emprestimo.findOne({
      where: { id: uuid },
      attributes: [
        "id",
        "juro",
        "prestacao",
        "valor",
        "prazo",
        "progresso",
        "proponente_id",
        "created_at",
        "updated_at",
        [
          fn("COUNT", literal("DISTINCT EmprestimoSolidarios.id")),
          "totalGuardiaos",
        ],
        [
          fn(
            "COALESCE",
            fn("SUM", col("EmprestimoSolidarios.Solidario.taxa")),
            0
          ),
          "totalTaxa",
        ],
        [
          fn("COALESCE", fn("SUM", col("Diversificacaos.taxa")), 0),
          "taxaDiversificada",
        ],
      ],
      include: [
        {
          model: EmprestimoSolidario,
          as:"EmprestimoSolidarios",
          include: [
            {
              model: Solidario,
              as:"Solidario",
              where: { estado: true },
              attributes: ["parentesco", "taxa", "tipo"],
            },
          ],
        },
        { model: Diversificacao, as:"Diversificacaos" },
        {
          model: Proponente, as:"Proponente",
          include: [
            {
              model: User,
              as:"User",
              attributes: [
                "id",
                "primeiro_nome",
                "segundo_nome",
                "email",
                "telemovel",
              ],
            },
            {
              model: ContaVinculada,
              as:"ContaVinculadas",
              attributes: ["id", "valor_retido", "created_at", "updated_at"],
              where: { estado: true },
              required: false,
            },
          ],
        },
      ],
      group: [
        "Emprestimo.id",
        "Proponente.id",
        "Proponente->User.id",
        "Proponente->ContaVinculadas.id",
      ],
      raw: false,
    });

    //console.log("validar", emprestimo)
    return NextResponse.json(emprestimo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// PUT - Atualizar a taxa de participação do investidor
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await Emprestimo.update({ pendencia: false }, { where: { id: uuid } });
    return NextResponse.json({ message: "Pedido efectuado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
