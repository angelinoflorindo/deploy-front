export const dynamic = 'force-dynamic';
import { converterString, validarEstado } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import Solidario from "@/models/Solidario";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { Op } from "sequelize";
import Credito from "@/models/Credito";
import CreditoSolidario from "@/models/CreditoSolidario";
import Devedor from "@/models/Devedor";

/**
 *
 * @param req
 * PÁGINA REZERVADA PARA OPERAÇÕES DE CRÉDITO
 * @returns
 */

// Listar todos os pedidos de créditos 
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = (await converterString(searchParams.get("page"))) || 1;
  const limit = (await converterString(searchParams.get("limit"))) || 5;
  const status = await validarEstado(searchParams.get("status"));
  const pendencia = await validarEstado(searchParams.get("pendencia"));
  const devedorId = await converterString(searchParams.get("devedor"));
  const progresso = searchParams.get("progresso")
  const orderBy = searchParams.get("order") || "created_at";
  const offset = (Number(page) - 1) * Number(limit);
  const where: any = {};
  // para definir as condições de listagem apartir do client

  //console.log('p', pendencia)
  if (status) {
    where.estado = status;
  }

  if (pendencia) {
    where.pendencia = pendencia; // se a pendencia for false => já foi investido, senão, vale o contrário 
  }

  if (devedorId) {
    where.devedor_id = { [Op.ne]: devedorId }; // exibir expto do devedor que consulta
  }
  if(progresso){
    where.progresso
  }
  // console.log('conditions',  where)
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();
    
    const { rows: data, count: total } = await Credito.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
      include: [
        { model: Devedor, 
          include:[{model:User, attributes:['id','primeiro_nome', 'segundo_nome']}]
        },
       
      ],
    });

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
      { error: "Erro ao buscar pedidos." },
      { status: 500 }
    );
  }
}

// devedor - Permite iniciar um pedido de crédito
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const usuario: any = {};
    const devedor = await Devedor.findOne({ where: { user_id: userId } });
    if (devedor) {
      usuario.devedor_id = devedor.id;
    }

    const [result, iscreated] = await Credito.findOrCreate({
      where: {
        valor: await converterString(body.valor),
        prazo: body.prazo,
        prestacao: await converterString(body.prestacao),
        devedor_id: usuario.devedor_id,
        juro: await converterString(body.juro),
        tipo: body.duracao,
      },
      defaults: {
        valor: await converterString(body.valor),
        prazo: body.prazo,
        prestacao: await converterString(body.prestacao),
        devedor_id: usuario.devedor_id,
        juro: await converterString(body.juro),
        tipo: body.duracao,
      },
    });

    if (body.guardiao === "on" || body.guardiao === true) {
      const solidarios = await Solidario.findAll({
        where: { user_id: userId, estado: false },
      });
      if (solidarios.length > 0) {
        solidarios.forEach(async (aval) => {
          await CreditoSolidario.create({
            credito_id: result.id,
            solidario_id: aval.id,
          });
          aval.estado = false; // alterar quando o guardião aceitar o convite
          aval.save();
        });
      }
    }

    return NextResponse.json(
      { message: "credito registrado registrado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
