import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Solidario from "@/models/Solidario";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const result = await Solidario.create(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
