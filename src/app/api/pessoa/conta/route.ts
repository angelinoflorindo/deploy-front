import { converterString } from "@/app/actions/auth";
import { UserProps } from "@/services/user.service";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const info = {
    nome: body.nome,
    iban: body.iban,
    salario: await converterString(body.salario),
    emprego_id: await converterString(body.emprego_id),
    pessoa_id: await converterString(body.pessoa_id),
  };

  const result = await prisma.conta.create({ data: info });
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
