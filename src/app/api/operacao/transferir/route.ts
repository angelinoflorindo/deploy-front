import {
  converterString,
} from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

   
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
