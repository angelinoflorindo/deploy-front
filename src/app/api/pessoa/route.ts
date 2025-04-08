import { converterString } from "@/app/actions/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const pessoas = await prisma.pessoa.findMany();
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

  const residenciaResponse = await prisma.residencia.create({
    data: infoResidencia,
  });

  // console.log("residencia criado..", residenciaResponse);

  const empregoResponse = await prisma.emprego.create({
    data: infoEmprego,
  });
  //  console.log("emprego criado..", empregoResponse);

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

  const pessoaResponse = await prisma.pessoa.create({
    data: pessoaInfo,
  });
  //console.log("pessoa criada", pessoaResponse);

  const result = {
    pessoa: pessoaResponse,
    emprego: empregoResponse,
    resedencia: residenciaResponse,
  };
  return NextResponse.json(result);
}

// DELETE - Remover usuário por ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json("Dados eliminado");
  } catch (error) {
    return NextResponse.json(error);
  }
}
