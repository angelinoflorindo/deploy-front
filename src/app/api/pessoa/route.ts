export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import Pessoa from "@/models/Pessoa";
import Emprego from "@/models/Emprego";
import Residencia from "@/models/Residencia";
import Conjugue from "@/models/Conjugue";
import Conta from "@/models/Conta";
import User from "@/models/User";

async function findOrCreateResidencia(info: any) {
  const [residencia] = await Residencia.findOrCreate({
    where: {
      tipo: info.tipo,
      data_inicio: info.data_inicio,
    },
    defaults: {
      tipo: info.tipo,
      data_inicio: info.data_inicio,
    },
    transaction:info.t
  });
  return residencia;
}

async function findOrCreateEmprego(info: any) {
  const [emprego] = await Emprego.findOrCreate({
    where: {
      area: info.area,
      cargo: info.cargo,
      sector: info.sector,
      data_inicio: info.data_inicio,
    },
    defaults: {
      area: info.area,
      cargo: info.cargo,
      sector: info.sector,
      data_inicio: info.data_inicio,
    },
    transaction:info.t
  });
  return emprego;
}

async function findPessoaByUserId(userId: number) {
  return await Pessoa.findOne({ where: { user_id: userId } });
}


      
// Rota dedicada para operações da conta do usuário 
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    //await sequelize.authenticate();
    //await sequelize.sync();
    //setupAssociations();
    const userInfo = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
      include: [
          {
          model: Pessoa,
          include: [
            {
              model: Emprego,
            },
            { model: Residencia },
            { model: Conjugue },
            { model: Conta },
          ],
        },
      ],
    });
    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.pessoa.user_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const existingPessoa = await findPessoaByUserId(userId);
    if (existingPessoa) {
      return NextResponse.json(
        { message: "Usuário já possui dados de pessoa registrados." },
        { status: 400 }
      );
    }
   const [emprego,residencia, pessoa ] =  await sequelize.transaction(async (t) => {
      const residencia = await findOrCreateResidencia({
        tipo: body.residencia.tipo,
        data_inicio: new Date(body.residencia.data_inicio),
        t: t,
      });

      const emprego = await findOrCreateEmprego({
        area: body.emprego.area,
        cargo: body.emprego.cargo,
        sector: body.emprego.sector,
        data_inicio: new Date(body.emprego.data_inicio),
        t: t,
      });

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

      return [emprego, residencia, pessoa]
    });

    return NextResponse.json({
      pessoa,
      emprego,
      residencia,
    });
  } catch (error: any) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: error.message || error },
      { status: 500 }
    );
  }
}
