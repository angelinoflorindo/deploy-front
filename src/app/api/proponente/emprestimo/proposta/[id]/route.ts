import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import ContaVinculada from "@/models/ContaVinculada";
import Diversificacao from "@/models/Diversificacao";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import Proponente from "@/models/Proponente"; 
import Solidario from "@/models/Solidario";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { fn, col, literal } from "sequelize";


// Buscar os dados do emprestimo como proposta
export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  

  try {

    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();
  
   
    const emprestimo = await Emprestimo.findOne({
      where: { id: uuid },
      attributes: [
        "id", "juro", "prestacao", "valor", "prazo","progresso", "proponente_id",
        "created_at", "updated_at",
        [fn("COUNT", literal("DISTINCT EmprestimoSolidarios.id")), "totalGuardiaos"],
        [fn("COALESCE", fn("SUM", col("EmprestimoSolidarios.Solidario.taxa")), 0), "totalTaxa"],
        [fn("COALESCE", fn("SUM", col("Diversificacaos.taxa")), 0), "taxaDiversificada"],
      ],
      include: [
        {
          model: EmprestimoSolidario,
          include: [{ model: Solidario, attributes: ['parentesco', 'taxa', 'tipo'] }],
        },
        {model:Diversificacao},
        {
          model: Proponente,
          include: [
            {
              model: User,
              attributes: ["id", "primeiro_nome", "segundo_nome", "email"],
            },
            {
              model: ContaVinculada,
              attributes: ['id', 'valor_retido', 'created_at', 'updated_at'],
              where: { estado: true },
              required: false,
            },
          ],
        },
      ],
      group: ["Emprestimo.id", "Proponente.id", "Proponente->User.id", "Proponente->ContaVinculadas.id"],
      raw: false,
    });
  
    //console.log("validar", emprestimo)
    return NextResponse.json(emprestimo, {status:200});
  
  
  
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
  const uuid = await converterString(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    await Emprestimo.update({ pendencia: false }, { where: { id: uuid } });
    return NextResponse.json({ message: "Pedido efectuado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
