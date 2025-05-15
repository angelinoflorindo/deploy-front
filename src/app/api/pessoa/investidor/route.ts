export const dynamic = 'force-dynamic';
import { sequelize } from "@/lib/sequelize";
import Investidor from "@/models/Investidor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await sequelize.authenticate()
    await sequelize.sync()

    const result = await Investidor.create(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

