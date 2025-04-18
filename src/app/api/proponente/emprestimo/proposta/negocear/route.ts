import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Diversificacao from "@/models/Diversificacao";
import NegocearEmprestimos from "@/models/NegocearEmprestimo";
import User from "@/models/User";
import Investidor from "@/models/Investidor";



// Investidor - inicia negociação do emprestimo
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id)
  
  const data:any = {
    emprestimo_id: await converterString(body.emprestimo_id),
    valor: await converterString(body.valor),
    juro: await converterString(body.juro),
    prazo:body.prazo,
    prestacao:await converterString(body.prestacao),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const user = await User.findByPk(userId, {include:[{model:Investidor, attributes:['id']}],raw:false
    })
    const investidor:any = await user?.get('Investidor')
    data.investidor_id = investidor.id
    
    const result = await NegocearEmprestimos.findOrCreate({where:{
      investidor_id:data.investidor_id,
      emprestimo_id:data.emprestimo_id
    }, defaults:data});
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: error.message || error },
      { status: 500 }
    );
  }
}
