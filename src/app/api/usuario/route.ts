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
        pessoa: {
          include: { emprego: true, residencia: true, conjugue: true },
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

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const pessoaInfo = {
    estado_civil: body.estado,
    provincia: body.provincia,
    municipio: body.municipio,
    data_nascimento: body.data_nascimento,
  }
  
  try {
    if (!body.password) {
      const userInfo = {
          primeiro_nome: body.primeiro_nome,
          segundo_nome: body.segundo_nome,
          password: body.password,
          email: body.email,
          bilhete: body.bilhete,
          telemovel: body.telemovel,
          genero: body.genero,
        };

      
      return NextResponse.json({})   
    }
  
  
  
    return NextResponse.json({})
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
