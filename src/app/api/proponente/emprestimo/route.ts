export const dynamic = 'force-dynamic';
import { converterString, validarEstado } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import Proponente from "@/models/Proponente";
import {Solidario} from "@/models/Solidario";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/User";
import {Op} from 'sequelize'

/**
 * 
 * @param req 
 * Permite buscar todos 
 * os pedidos de emprestimos 
 * aplicando determinadas condições 
 * @returns 
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = (await converterString(searchParams.get("page"))) || 1;
  const limit = (await converterString(searchParams.get("limit"))) || 5;
  const status = await validarEstado(searchParams.get("status"));
  const pendencia = await validarEstado(searchParams.get("pendencia"))
  const proponenteId = await converterString(searchParams.get('proponente'))
  const progresso = searchParams.get('progresso')
  const orderBy = searchParams.get("order") || "created_at";
  const offset = (Number(page) - 1) * Number(limit);
  const where: any = {};
  // para definir as condições de listagem apartir do client

  //console.log('p', pendencia)
  if (status) {
    where.estado = true
  }

  if (pendencia) {
    where.pendencia =true // passando a pendencia como false
  }

  if(proponenteId){
    where.proponente_id = {[Op.ne]:proponenteId}
  }

  //conditions specials

  if(progresso){
    where.progresso = 'CONCLUIDO'
  }
  
 // console.log('conditions',  where)
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const { rows: data, count: total } = await Emprestimo.findAndCountAll({
      where:where,
      offset,
      limit: Number(limit),
      order: [[`${orderBy}`, "DESC"]],
      include: [
        { model: Proponente,
          as:"Proponente",
          include:[{model:User, as:"User", attributes:['id','primeiro_nome', 'segundo_nome']}]
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

// Proponente - Permite iniciar um pedido de emprestimo
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = await converterString(body.user_id);
  //console.log('body', body)

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const usuario:any = {}
    const proponente = await Proponente.findOne({ where: { user_id: userId } });
    if(proponente){
      usuario.proponente_id = proponente.id
    }

    //console.log( 'proponente', proponente)
    
    const result = await Emprestimo.create({
      valor: await converterString(body.valor),
      prazo: body.prazo,
      prestacao: await converterString(body.prestacao),
      proponente_id: usuario.proponente_id,
      juro: await converterString(body.juro),
      progresso: body.progresso,
    });

    // parte reservada para confirmar o convite enviado pelo proponente
    if (body.guardiao === "on" || body.guardiao === true) {
      const solidarios = await Solidario.findAll({
        where: { user_id: userId, estado: false },
      });
      if (solidarios.length > 0) {
        solidarios.forEach(async (aval) => {
          await EmprestimoSolidario.create({
            emprestimo_id: result.id,
            solidario_id: aval.id,
          });
          aval.estado = false; // só passará true quando o guardião aceitar o convite
          aval.save();
        });
      }
    }

    return NextResponse.json(
      { message: "emprestimo registrado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
