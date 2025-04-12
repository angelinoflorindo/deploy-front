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

  console.log("registrar Documentos", body)
  return
  const result = await prisma.solidario.create({ data: body });
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

export async function verificarEstado(key:any){
  console.log("imprimir status", key)
  if(key === "on" || key == true ) return true
  return false
}