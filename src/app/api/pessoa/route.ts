export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { Pessoa } from "@/models/Pessoa";
import { Emprego } from "@/models/Emprego";
import { Residencia } from "@/models/Residencia";
import { Conjugue } from "@/models/Conjugue";
import { Conta } from "@/models/Conta";
import { User } from "@/models/User";
import { sequelize } from "@/lib/sequelize";



async function findPessoaByUserId(userId: number) {
  return await Pessoa.findOne({ where: { user_id: userId } });
}

// Rota dedicada para operações da conta do usuário
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  
  await sequelize.authenticate();
  await sequelize.sync();
  
  const userInfo = await User.findOne({
    where: { email: email },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Pessoa,
        as:"Pessoa",
        include: [
          {
            model: Emprego,
            as:"Emprego",
          },
          { model: Residencia, as:"Residencia" },
          { model: Conjugue, as:"Conjugue"},
          { model: Conta, as:"Conta"},
        ],
      },
    ],
  });

  return NextResponse.json(userInfo, { status: 200 });

  /*
  try {
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }

  */
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = Number(body.pessoa.user_id);

  try {
    
  await sequelize.authenticate();
  await sequelize.sync();

  const existingPessoa = await findPessoaByUserId(userId);
  if (existingPessoa) {
    return NextResponse.json(
      { message: "Usuário já possui dados de pessoa registrados." },
      { status: 400 }
    );
  }
  const result = await sequelize.transaction(async (t) => {
    const residencia = await Residencia.create(
      {
        tipo: body.residencia.tipo,
        data_inicio: new Date(body.residencia.data_inicio),
      },
      {
        transaction: t,
      }
    );

    const emprego = await Emprego.create(
      {
        area: body.emprego.area,
        cargo: body.emprego.cargo,
        sector: body.emprego.sector,
        data_inicio: new Date(body.emprego.data_inicio),
      },
      { transaction: t }
    );

    const pessoa = await Pessoa.create(
      {
        profissao: body.pessoa.profissao,
        data_nascimento: new Date(body.pessoa.data_nascimento),
        estado_civil: body.pessoa.estado_civil,
        municipio: body.pessoa.municipio,
        nivel_instrucao: body.pessoa.nivel_instrucao,
        provincia: body.pessoa.provincia,
        user_id: userId,
        emprego_id: emprego.id,
        residencia_id: residencia.id,
      },
      { transaction: t }
    );

    return [emprego, residencia, pessoa];
  });

  return NextResponse.json({ result });
    
  } catch (error: any) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: error.message || error },
      { status: 500 }
    );
  }

}
