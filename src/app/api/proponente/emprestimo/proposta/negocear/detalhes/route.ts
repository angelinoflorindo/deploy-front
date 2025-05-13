export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import Emprestimo from "@/models/Emprestimo";
import Investidor from "@/models/Investidor";
import NegocearEmprestimos from "@/models/NegocearEmprestimo";
import Proponente from "@/models/Proponente";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// Buscar os dados da negociação pelo investidor-emprestimo

export async function GET(
  req: NextRequest
) {

  
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const investidorId = await converterString(searchParams.get("investidorId"));

  try {


    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();
  
    const user = await User.findOne({
      where: { email: email },
      attributes: ["id"],
      include: [{ model: Proponente, attributes: ["id"] }],
    });
    const emprestimo = await Emprestimo.findOne({
      where: { estado: true, proponente_id: user?.toJSON().Proponente.id },
    });
    const result = await NegocearEmprestimos.findOne({
      where: {
        pendencia: true,
        estado: true,
        investidor_id:investidorId,
        emprestimo_id: emprestimo?.toJSON().id,
      },
      include: [
        {
          model: Investidor,
          attributes: ["id"],
          include: [
            {
              model: User,
              attributes: ["id", "primeiro_nome", "segundo_nome"],
            },
          ],
        }
      ],
    });
    //console.log(result)
  
    return NextResponse.json(result, { status: 200 });    
   
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }

}
