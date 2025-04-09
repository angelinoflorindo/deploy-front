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

  console.log("confirmar dados", body)
  const info = {
    assunto: body.assunto,
    conteudo: body.conteudo,
    user_id: body.user_id,
  };

  const resp = await prisma.reclamacao.create({data:info})

  return NextResponse.json(resp);
}

