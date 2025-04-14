import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import {sequelize} from "@/lib/sequelize"
import {setupAssociations} from "@/lib/associations"
import Pessoa from "@/models/Pessoa"
import Emprego from "@/models/Emprego"
import Residencia from "@/models/Residencia"


export async function GET() {
  const pessoas = await Pessoa.findAll();
  return NextResponse.json(pessoas);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const infoResidencia = {
    tipo: body.residencia.tipo,
    data_inicio: new Date(body.residencia.data_inicio),
  };

  const infoEmprego = {
    area: body.emprego.area,
    cargo: body.emprego.cargo,
    sector: body.emprego.sector,
    data_inicio: new Date(body.emprego.data_inicio),
  };

  try{

    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const residenciaResponse = await Residencia.create(infoResidencia);
    
    const empregoResponse = await Emprego.create(infoEmprego);
  
    const userId = await converterString(body.pessoa.user_id);
    const pessoaInfo = {
      profissao: body.pessoa.profissao,
      data_nascimento: new Date(body.pessoa.data_nascimento),
      estado_civil: body.pessoa.estado_civil,
      municipio: body.pessoa.municipio,
      nivel_instrucao: body.pessoa.nivel_instrucao,
      provincia: body.pessoa.provincia,
      user_id: userId,
      emprego_id: empregoResponse.id,
      residencia_id: residenciaResponse.id,
    };
  
    const pessoaResponse = await Pessoa.create(pessoaInfo);
    //console.log("pessoa criada", pessoaResponse);
  
    const result = {
      pessoa: pessoaResponse,
      emprego: empregoResponse,
      resedencia: residenciaResponse,
    };
    return NextResponse.json(result);

  }catch(error){
    return NextResponse.json(
      { message: error },
      { status: 404 }
    );
  }

  
}
