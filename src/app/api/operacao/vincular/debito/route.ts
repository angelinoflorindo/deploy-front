import { converterString } from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Deposito from "@/models/Deposito";
import Proponente from "@/models/Proponente";
import ContaVinculada from "@/models/ContaVinculada";
import { NextRequest, NextResponse } from "next/server";
import Devedor from "@/models/Devedor";
import DebitoVinculado from "@/models/DebitoVinculado";

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);

    const page = (await converterString(searchParams.get("page"))) || 1;
    const limit = (await converterString(searchParams.get("limit"))) || 5;
    //    const estado = searchParams.get('status')

    const offset = (Number(page) - 1) * Number(limit);
    // const where: any = { estado: true };
    // para definir as condições de listagem apartir do client
    // if (estado) where.estado = estado;

    const { rows: data, count: total } = await ContaVinculada.findAndCountAll({
      offset,
      limit: Number(limit),
      order: [["created_at", "DESC"]],
    });

    console.log(" depositos", data);
    const result = {
      data,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    };
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar os depósitos." },
      { status: 500 }
    );
  }
}


// REZERVADO PARA RETENÇÃO DE DÉBBITOS COMO GARANTIAS
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const info = {
      solicitacao: 0,
      adimplencia: 0,
      inadimplencia: 0,
      user_id: userId,
    };

    const result = await sequelize.transaction(async (t)=>{
      const devedor = await Devedor.findOrCreate({
        where: { user_id: userId },
        defaults: info,
        transaction:t
      });

      const [debitos, iscreated] = await DebitoVinculado.findOrCreate(
        {where:{
          devedor_id: devedor[0].id,
          estado:true
        }, defaults:{
          devedor_id: devedor[0].id,
          valor_retido: await converterString(body.valor),
          data_desbloqueio: new Date()
        }, transaction:t}
      );
  
  
      if(!iscreated){
        await DebitoVinculado.update({estado:false}, {where:{devedor_id:devedor[0].id}})
        await DebitoVinculado.create({ devedor_id:devedor[0].id,
          valor_retido: await converterString(body.valor),
          data_desbloqueio: new Date()})
      }
  
      return {devedor, debitos}
    })


    return NextResponse.json(result,{ status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const { searchParams } = new URL(req.url);

    const page = (await converterString(searchParams.get("page"))) | 1;
    const limit = (await converterString(searchParams.get("limit"))) | 5;
    const status = searchParams.get("status");
    const pendencia = searchParams.get("pendencia");
    const orderBy = searchParams.get("order") || "created_at";

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};
    // para definir as condições de listagem apartir do client
    if (status) where.estado = status;
    if (pendencia) where.pendencia = pendencia;

    const { rows: data, count: total } = await Deposito.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
    });

    //console.log("dados de depositos", data)
    const result = {
      data,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    };
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar os depósitos." },
      { status: 500 }
    );
  }
}
