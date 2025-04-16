import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Deposito from "@/models/Deposito";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";



export  async function  GET(req: NextRequest) {

  try {
    
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);
  
    const page = await converterString(searchParams.get('page')) | 1 
    const limit = await converterString(searchParams.get('limit')) | 5 
//    const estado = searchParams.get('status') 

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {estado:true};
    // para definir as condições de listagem apartir do client
   // if (estado) where.estado = estado;
    
    const { rows: data, count: total } = await Deposito.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [['created_at', 'DESC']],
    });

    //console.log("dados de depositos", data)
    const result = {
      data,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    }
     return NextResponse.json(result,{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar os depósitos.' }, {status:500});
  }
}
export  async function  DELETE(req: NextRequest) {

  try {
    
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);
  
    const page = await converterString(searchParams.get('page')) | 1 
    const limit = await converterString(searchParams.get('limit')) | 5 
   const status = searchParams.get('status') 
   const pendencia = searchParams.get('pendencia') 
   const orderBy = searchParams.get('order') || 'created_at' 

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};
    // para definir as condições de listagem apartir do client
    if (status) where.estado = status;
    if (pendencia) where.pendencia = pendencia;
    
    const { rows: data, count: total } = await Deposito.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, 'DESC']],
    });

    //console.log("dados de depositos", data)
    const result = {
      data,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    }
     return NextResponse.json(result,{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar os depósitos.' }, {status:500});
  }
}



export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();
    const result = await Deposito.create({
      valor: await converterString(body.valor),
      user_id: await converterString(body.user_id),
      estado: true,
      pendencia: true,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
