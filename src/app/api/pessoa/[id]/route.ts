import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Pessoa from "@/models/Pessoa";
import Conta from "@/models/Conta";
import Emprego from "@/models/Emprego";
import Conjugue from "@/models/Conjugue";
import Residencia from "@/models/Residencia";
import Solidario from "@/models/Solidario";
import User from "@/models/User";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const pessoa = await Pessoa.findOne({
      where: { id: uuid },
      include: [
        { model: Conta },
        { model: Emprego },
        { model: Conjugue },
        { model: Residencia },
        { model: Solidario },
        {model:User,
          attributes:['id', 'email']
        }
      ],
    });

    if (!pessoa) {
      return NextResponse.json(
        { message: "Dados não encontrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(pessoa, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error },
      { status: 500 }
    );
  }
}

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = await converterString(id);
  let body = await req.json();
  
  const userId = await converterString(body.pessoa.user_id);

  const infoResidencia = {
    id:await converterString(body.residencia.id),
    tipo: body.residencia.tipo,
    data_inicio: new Date(body.residencia.data_inicio),
  };

  const infoEmprego = {
    id:await converterString(body.emprego.id),
    area: body.emprego.area,
    cargo: body.emprego.cargo,
    sector: body.emprego.sector,
    data_inicio: new Date(body.emprego.data_inicio),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    await Residencia.update(infoResidencia, {where:{id:infoResidencia.id}});
    await Emprego.update(infoEmprego, {where:{id:infoEmprego.id}});

    const pessoaInfo = {
      profissao: body.pessoa.profissao,
      data_nascimento: new Date(body.pessoa.data_nascimento),
      estado_civil: body.pessoa.estado_civil,
      municipio: body.pessoa.municipio,
      nivel_instrucao: body.pessoa.nivel_instrucao,
      provincia: body.pessoa.provincia,
      user_id: userId,
      emprego_id: infoEmprego.id,
      residencia_id: infoResidencia.id,
    };

    await Pessoa.update(pessoaInfo, {where:{id:uuid}});
    //console.log("pessoa criada", pessoaResponse);


    return NextResponse.json({message:"Atualização bem sucedida"}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
