import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import NegocearEmprestimos from "@/models/NegocearEmprestimo";
import User from "@/models/User";
import Investidor from "@/models/Investidor";
import Emprestimo from "@/models/Emprestimo";
import Proponente from "@/models/Proponente";

// Investidor - inicia negociação do emprestimo

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id);

  const data: any = {
    emprestimo_id: await converterString(body.emprestimo_id),
    valor: await converterString(body.valor),
    juro: await converterString(body.juro),
    prazo: body.prazo,
    prestacao: await converterString(body.prestacao),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const user = await User.findByPk(userId, {
      include: [{ model: Investidor, attributes: ["id"] }],
      raw: false,
    });
    const investidor: any = await user?.get("Investidor");
    data.investidor_id = investidor.id;

    const [result, created] = await sequelize.transaction(async (t) => {
      return await NegocearEmprestimos.findOrCreate({
        where: {
          investidor_id: data.investidor_id,
          emprestimo_id: data.emprestimo_id,
        },
        defaults: data,
        transaction: t,
      });
    });

    // Se o registro já existir
    if (!created) {
      const result = await NegocearEmprestimos.update(data, {
        where: {
          investidor_id: data.investidor_id,
          emprestimo_id: data.emprestimo_id,
        },
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

// Buscar as negociações dos investidores interessados, condicionado pelo email do proponente

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email")
 
  
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const user = await User.findOne({where:{email:email}, attributes:['id'], include:[{model:Proponente, attributes:['id']}]})
    const emprestimo = await Emprestimo.findOne({where:{estado:true,proponente_id:user?.toJSON().Proponente.id}})
    const result = await NegocearEmprestimos.findAll({
      where: {
        pendencia: true,
        estado: true,
        emprestimo_id:emprestimo?.toJSON().id,
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
        },
        {
          model: Emprestimo,
          attributes: ["id"]
        },
      ],
    });
  
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}
