import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Investidor from "@/models/Investidor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const result = await Investidor.create(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function verificarEstado(key: any) {
  console.log("imprimir status", key);
  if (key === "on" || key == true) return true;
  return false;
}
