import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Diversificacao from "@/models/Diversificacao";

//  investidor -  Permite registrar a taxa de diversificação
export async function POST(req: NextRequest) {
  const body = await req.json();

  const data = {
    emprestimo_id: await converterString(body.emprestimo_id),
    investidor_id: await converterString(body.investidor_id),
    taxa: await converterString(body.taxa),
    protencao: false,
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const [result, created] = await sequelize.transaction(async (t) => {
      return await Diversificacao.findOrCreate({
        where: {
          emprestimo_id: data.emprestimo_id,
          investidor_id: data.investidor_id,
        },
        defaults: data,
        transaction: t,
      });
    });

    // Se o registro já existir ele vai atualizar
    if (!created) {
      const result = await sequelize.transaction(async(t)=>{
        return await Diversificacao.update({taxa:data.taxa}, {where:{
          emprestimo_id:data.emprestimo_id,
          investidor_id:data.investidor_id
        }})
      });
      
      return NextResponse.json(result, { status: 200 });
 
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: error.message || error },
      { status: 500 }
    );
  }
}
