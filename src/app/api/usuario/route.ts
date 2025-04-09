import { UserProps } from "@/services/user.service";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  }

  try {
    const userInfo = await prisma.user.findUnique({
      where: { email: email },
      omit: { password: true },
      include: {
        investidor:true,
        devedor:true,
        deposito:true,
        saque:true,
        carteira:true,
        reclamacao:true,
        documento:true,
        pessoa: {
          include: { emprego: true, residencia: true, conjugue: true, conta:true},
        },
      },
    });

    if (!userInfo) {
      return NextResponse.json(
        { message: "Usuário não existe" },
        { status: 404 }
      );
    }

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await req.json();

  const result = await prisma.user.create({ data: user });
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
