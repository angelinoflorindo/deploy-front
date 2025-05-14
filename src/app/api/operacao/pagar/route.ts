export const dynamic = 'force-dynamic';
import {
  converterString,
} from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";

import Carteira from "@/models/Carteira";
import Pagamento from "@/models/Pagamento";
import { NextRequest, NextResponse } from "next/server";

// Devedor:  Registro de pagamento
export async function POST(req: NextRequest) {
  const body = await req.json();

  const info = {
    investidorId: await converterString(body.investidorId),
    investUserId: await converterString(body.investUserId),
    creditoId: await converterString(body.creditoId),
    devUserId: await converterString(body.devUserId),
    devedorId: await converterString(body.devedorId),
    detalhe: body.detalhe,
    prestacao: await converterString(body.prestacao),
    valor: await converterString(body.valor),
  };

  try {

    const devCarteira = await Carteira.findOne({where:{user_id:info.devUserId}})
    const investCarteira = await Carteira.findOne({where:{user_id:info.investUserId}})
    
    if(info.valor > devCarteira!.saldo){
      return NextResponse.json({message:"Não disponhe de fundos suficiente"}, {status:404})
    }

    const result = await sequelize.transaction(async (t) => {
      const [pagamento, iscreated] = await Pagamento.findOrCreate({
        where: {
          devedor_id: info.devedorId,
          estado: true,
        },
        defaults: {
          valor: info.valor,
          prestacao: info.prestacao,
          detalhe: info.detalhe,
          devedor_id: info.devedorId,
        },
        transaction:t,
      });
      if (!iscreated) {
        await Pagamento.update(
          { estado: false },
          {
            where: {
              devedor_id: info.devedorId,
              estado: true,
            },
            transaction: t,
          }
        );

        await Pagamento.create(
          {
            valor: info.valor,
            prestacao: info.prestacao,
            detalhe: info.detalhe,
            devedor_id: info.devedorId,
          },
          { transaction: t }
        );
      }

      const valorSaqueado = devCarteira!.saldo - info.valor
      const saque = await Carteira.update({saldo:valorSaqueado}, {where:{
        user_id:info.devUserId
      }, transaction:t})

      const valorBonificado = investCarteira!.saldo + info.valor
      const bonus = await Carteira.update({saldo:valorBonificado}, {where:{
        user_id:info.investUserId
      }, transaction:t}) 

      return {saque, bonus, pagamento}
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
