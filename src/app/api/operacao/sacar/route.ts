export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Saque from "@/models/Saque";
import { NextRequest, NextResponse } from "next/server";


export  async function  GET(req: NextRequest) {

  try {
    
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);
  
    const page = await converterString(searchParams.get('page')) || 1 
    const limit = await converterString(searchParams.get('limit')) || 5 
    const status = searchParams.get('status') 
    const orderBy = searchParams.get('order') || 'created_at' 

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};
    // para definir as condições de listagem apartir do client
    if (status) where.estado = status;
    
    const { rows: data, count: total } = await Saque.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, 'DESC']],
    });

    const result = {
      data,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    }
     return NextResponse.json(result,{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar pedidos.' }, {status:500});
  }
}



export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const result = await Saque.create({
      valor: await converterString(body.valor),
      user_id: await converterString(body.user_id),
      taxa: await converterString(body.taxa),
      estado: true,
      pendencia: true,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
