export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import Reclamacao from "@/models/Reclamacao";

export  async function  GET(req: NextRequest) {
  try {
    
    const { searchParams } = new URL(req.url);
  
    const page = await converterString(searchParams.get('page')) || 1
    const limit = await converterString(searchParams.get('limit')) || 5
   const status = searchParams.get('status') 

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {estado:true};
    // para definir as condições de listagem apartir do client
  // if (status) where.estado = status;
    
    const { rows: data, count: total } = await Reclamacao.findAndCountAll({
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



export async function POST(req: NextRequest) {
  const body = await req.json();

  const info = {};
  try {
    const resp = await Reclamacao.create({
      assunto: body.assunto,
      conteudo: body.conteudo,
      user_id: body.user_id
    });

    return NextResponse.json(resp);
  } catch (error) {
    console.error("Erro ao submeter reclamação ", error);
    return NextResponse.json(error, { status: 404 });
  }
}
