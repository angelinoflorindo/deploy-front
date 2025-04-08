


import { converterString } from "@/app/actions/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verificarEstado } from "../route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context:{params:{id:string}}) {
    //const { searchParams } = new URL(req.url);
    const {id} = await context.params
    const uuid =await converterString(id)
    try {
        const pessoa = await prisma.pessoa.findUnique({
            where: { id:uuid},
            include:{conta:true, emprego:true,conjugue:true,residencia:true,solidario:true}
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
export async function PUT(req: NextRequest, context:{params:{id:number}}) {
  const {id} = await context.params
  const uuid = await converterString(id)
  const body = await req.json();

  try {

      const result = await prisma.investidor.update({
        where: { id: uuid },
        data: body,
      });

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


