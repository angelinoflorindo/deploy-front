import {
  converterString,
} from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import Credito from "@/models/Credito";
import Deposito from "@/models/Deposito";
import Devedor from "@/models/Devedor";
import Diversificacao from "@/models/Diversificacao";
import Investidor from "@/models/Investidor";
import Proponente from "@/models/Proponente";
import Saque from "@/models/Saque";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// proponente : buscar credito validado | que ja tenha investidores
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const result = await User.findOne({
      where: { email: email },
      attributes: ["id", "primeiro_nome", "segundo_nome", "email", "bilhete", "telemovel"],
      include: [
        {
          model: Devedor,
          include: [
            {
              model: Credito,
              where: { estado: true, progresso: "CONCLUIDO" },
            
            },
          ],
        },
      ],
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// Investir por creditos  ao devedor

export async function POST(req: NextRequest) {
  const body = await req.json();

  const valor = await converterString(body.valor);
  const userId = await converterString(body.userId);
  const creditoId = await converterString(body.creditoId);
  const devUserId = await converterString(body.devUserId);
  const income: any = {};

  
  
  
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();
  
    const carteira = await Carteira.findOne({ where: { user_id: userId } }); // carteira do  investidor
  
    const credito = await Credito.findOne({where:{id:creditoId, valor:valor}});
    const devCarteira = await Carteira.findOne({
      where: { user_id: devUserId },
    }); // carteira do  proponente
  
    if (valor > carteira!.saldo) {
      console.log("investimento maior que a carteira!");
      return NextResponse.json(false, { status: 200 });
    }
  
    income.saqueado = carteira!.saldo - valor;
    income.bonificado = devCarteira!.saldo + valor;
  
    const result = await sequelize.transaction(async (t) => {
      // Parte do investidor
      const historicoSaque = await Saque.create(
        { valor: valor, taxa: 0, user_id: userId, pendencia: true },
        { transaction: t }
      );
      const desconto = await Carteira.update(
        { saldo: income.saqueado },
        { where: { user_id: userId }, transaction: t }
      );
  
      // Parte do proponente
      const historicoDeposito = await Deposito.create(
        { valor: valor, estado: true, pendencia: false, user_id: userId },
        { transaction: t }
      );
      const bonus = await Carteira.update(
        { saldo: income.bonificado },
        { where: { user_id: devUserId }, transaction: t }
      );
  
      if(credito){
        income.creditoResolvido = await Credito.update(
          { pendencia: false, progresso: "CONCLUIDO" },
          { where: { id: creditoId }, transaction: t }
        );
      }
      const creditoResolvido = income.creditoResolvido
  
      return {
        historicoDeposito,
        historicoSaque,
        desconto,
        bonus,
        creditoResolvido,
      };
    });
  
    return NextResponse.json(result,{status:200});
    
  
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
