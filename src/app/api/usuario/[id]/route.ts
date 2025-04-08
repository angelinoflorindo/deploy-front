import { converterString, hashPassword } from "@/app/actions/auth";
import { UserProps } from "@/services/user.service";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uuid = Number(searchParams.get("id"));

  try {
    const userInfo = await prisma.user.findUnique({
      where: { id: uuid },
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

// PUT - Atualizar usuário por ID
export async function PUT(req: NextRequest, context:{params:{id:string}}) { 
  //const { searchParams } = new URL(req.url);
const {id} = await context.params
  const uuid = await converterString(id)
  let body = await req.json();
  

  //console.log("testar userId", useid)
  //console.log("user info", body)
  try {
    let userInfo = {
      primeiro_nome: body.primeiro_nome,
      segundo_nome: body.segundo_nome,
      email: body.email,
      bilhete: body.bilhete,
      telemovel: body.telemovel,
      genero: body.genero,
    };

    let bodyInfo = {
      primeiro_nome: body.primeiro_nome,
      segundo_nome: body.segundo_nome,
      email: body.email,
      bilhete: body.bilhete,
      telemovel: body.telemovel,
      genero: body.genero,
      password: body.password,
    }

    if (body.password) {
      const hashPass = await hashPassword(body.password);
      bodyInfo.password = hashPass;
    
      const userResponse = await prisma.user.update({
        where: { id: uuid },
        data: bodyInfo,
      });

      if (!userResponse) {
        return NextResponse.json(
          { message: "Operação mal sucedida" },
          { status: 404 }
        );
      }
      console.log("from client", userResponse)
      return NextResponse.json(userResponse, { status: 200 });
    }

    const userResponse = await prisma.user.update({
      where: { id: uuid },
      data: userInfo,
    });

    if (!userResponse) {
      return NextResponse.json(
        { message: "Operação mal sucedida" },
        { status: 404 }
      );
    }

    return NextResponse.json(userResponse, { status: 200 });
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
