import { converterString } from "@/app/actions/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verificarEstado } from "../route";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {
    const resp = await prisma.solidario.findMany({
      where: { user_id: uuid },
      include: {
        pessoa: {
          include: {
            user: {
              select: {
                primeiro_nome: true,
                segundo_nome: true,
                id: true,
                email: true,
              },
            },
          },
        },
      },
    })

    const total = await prisma.solidario.groupBy({
      by:['user_id'],
      where:{user_id:uuid},
      _sum:{taxa:true}
      
    })

    if (!resp) {
      return NextResponse.json(
        { message: "Dados não encontrados" },
        { status: 404 }
      );
    }

    
    const result = {
      data:resp,
      total:total
    }

    return NextResponse.json(result, { status: 200 });
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
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);
  const body = await req.json();

  try {
    const result = await prisma.investidor.update({
      where: { id: uuid },
      data: body,
    });

    return NextResponse.json(result, { status: 200 });
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
