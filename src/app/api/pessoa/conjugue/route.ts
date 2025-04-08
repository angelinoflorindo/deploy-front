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

  const info = {
    nome_completo: body.nome_completo,
    dependentes: await converterString(body.dependentes),
    nivel_instrucao: body.nivel_instrucao,
    data_nascimento:body.data_nascimento,
    pessoa_id: await converterString(body.pessoa_id),
  }
  const resp = await prisma.conjugue.create({
    data: info,
  });

  return NextResponse.json(resp);
}

