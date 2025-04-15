import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Pessoa from "@/models/Pessoa";
import Emprego from "@/models/Emprego";
import Residencia from "@/models/Residencia";

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
  });
  return emprego;
}

async function findPessoaByUserId(userId: number) {
  return await Pessoa.findOne({ where: { user_id: userId } });
}

export async function GET() {
  const pessoas = await Pessoa.findAll();
  return NextResponse.json(pessoas);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.pessoa.user_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const existingPessoa = await findPessoaByUserId(userId);
    if (existingPessoa) {
      return NextResponse.json(
        { message: "Usuário já possui dados de pessoa registrados." },
        { status: 400 }
      );
    }

    const residencia = await findOrCreateResidencia({
      tipo: body.residencia.tipo,
      data_inicio: new Date(body.residencia.data_inicio),
    });

    const emprego = await findOrCreateEmprego({
      area: body.emprego.area,
      cargo: body.emprego.cargo,
      sector: body.emprego.sector,
      data_inicio: new Date(body.emprego.data_inicio),
    });

    const pessoa = await Pessoa.create({
      profissao: body.pessoa.profissao,
      data_nascimento: new Date(body.pessoa.data_nascimento),
      estado_civil: body.pessoa.estado_civil,
      municipio: body.pessoa.municipio,
      nivel_instrucao: body.pessoa.nivel_instrucao,
      provincia: body.pessoa.provincia,
      user_id: userId,
      emprego_id: emprego.id,
      residencia_id: residencia.id,
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
