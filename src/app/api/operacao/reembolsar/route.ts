import {
  converterString,
  gerarCodigoCartao,
  gerarNumeroCartao,
} from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";

import Carteira from "@/models/Carteira";
import Reembolso from "@/models/Reembolso";
import { NextRequest, NextResponse } from "next/server";

// Proponente:  Registro de reembolso
export async function POST(req: NextRequest) {
  const body = await req.json();

  const info = {
    investidorId: await converterString(body.investidorId),
    investUserId: await converterString(body.investUserId),
    emprestimoId: await converterString(body.emprestimoId),
    propUserId: await converterString(body.propUserId),
    proponenteId: await converterString(body.proponenteId),
    detalhe: body.detalhe,
    prestacao: await converterString(body.prestacao),
    valor: await converterString(body.valor),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const propCarteira = await Carteira.findOne({where:{user_id:info.propUserId}})
    const investCarteira = await Carteira.findOne({where:{user_id:info.investUserId}})
    if(info.valor > propCarteira!.saldo){
      return NextResponse.json({message:"Não disponhe de fundos suficiente"}, {status:404})
    }

    const result = await sequelize.transaction(async (t) => {
      const [reembolso, iscreated] = await Reembolso.findOrCreate({
        where: {
          proponente_id: info.proponenteId,
          estado: true,
        },
        defaults: {
          valor: info.valor,
          prestacao: info.prestacao,
          detalhe: info.detalhe,
          proponente_id: info.proponenteId,
        },
        transaction:t,
      });
      if (!iscreated) {
        await Reembolso.update(
          { estado: false },
          {
            where: {
              proponente_id: info.proponenteId,
              estado: true,
            },
            transaction: t,
          }
        );

        await Reembolso.create(
          {
            valor: info.valor,
            prestacao: info.prestacao,
            detalhe: info.detalhe,
            proponente_id: info.proponenteId,
          },
          { transaction: t }
        );
      }

      const valorSaqueado = propCarteira!.saldo - info.valor
      const saque = await Carteira.update({saldo:valorSaqueado}, {where:{
        user_id:info.propUserId
      }, transaction:t})

      const valorBonificado = investCarteira!.saldo + info.valor
      const bonus = await Carteira.update({saldo:valorBonificado}, {where:{
        user_id:info.investUserId
      }, transaction:t}) 

      return {saque, bonus, reembolso}
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
