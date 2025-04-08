


import { converterString } from "@/app/actions/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context:{params:{id:string}}) {
    //const { searchParams } = new URL(req.url);
    const {id} = await context.params
    const uuid =await converterString(id)
    try {
        const pessoa = await prisma.pessoa.findUnique({
            where: { id:uuid},
        });
        if (!pessoa) {
            return NextResponse.json({ message: "Dados não encontrados" }, { status: 404 });
        }

        return NextResponse.json(pessoa, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao buscar os dados", error }, { status: 500 });
    }


}


// PUT - Atualizar usuário por ID
export async function PUT(req: NextRequest, {params}:{params:{id:number}}) {
 
  //const { searchParams } = new URL(req.url);
  const uuid = await converterString(params.id)
 // const useid = await converterString(searchParams.get("id"))
  const body = await req.json();
    

  
  //console.log("testar pessoaid", useid)
  const infoResidencia = {
    tipo: body.residencia.tipo,
    data_inicio: new Date(body.residencia.data_inicio),

  }

  const infoEmprego = {
    area: body.emprego.area,
    cargo: body.emprego.cargo,
    sector: body.emprego.sector,
    data_inicio: new Date(body.emprego.data_inicio),

  }

  try {

    const empregoId = await converterString(body.emprego.id)
    const empregoResponse = await prisma.emprego.update({
        where: { id:empregoId },
        data: infoEmprego,
      });
     // console.log("emprego atualizado..", empregoResponse);
     const residenciaId = await converterString(body.residencia.id)
      const residenciaResponse = await prisma.residencia.update({
        where: { id: residenciaId },
        data:infoResidencia,
      });
     // console.log("residencia atualizado..", residenciaResponse);
      const userId = await converterString(body.pessoa.user_id)
      const pessoaInfo = {
        profissao: body.pessoa.profissao,
        data_nascimento: new Date(body.pessoa.data_nascimento),
        estado_civil: body.pessoa.estado_civil,
        municipio: body.pessoa.municipio,
        nivel_instrucao: body.pessoa.nivel_instrucao,
        provincia: body.pessoa.provincia,
        user_id: userId,
        emprego_id: empregoResponse.id,
        residencia_id:residenciaResponse.id,
      };
  
      const pessoaResponse = await prisma.pessoa.update({
        where: { id: uuid },
        data: pessoaInfo,
      });
  
     // console.log("pessoa atualizada", pessoaResponse);
  
      const result = {
        pessoa:pessoaResponse,
        emprego:empregoResponse,
        residencia:residenciaResponse
      }
      

    return NextResponse.json(result,{ status:200 });
  } catch (error) {
    return NextResponse.json(error);
  }

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


