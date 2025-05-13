export const dynamic = 'force-dynamic';
import {
  converterString,
} from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import Deposito from "@/models/Deposito";
import Diversificacao from "@/models/Diversificacao";
import Emprestimo from "@/models/Emprestimo";
import Investidor from "@/models/Investidor";
import Proponente from "@/models/Proponente";
import Saque from "@/models/Saque";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// proponente : buscar emprestimo validado | que ja tenha investidores
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const result = await User.findOne({
      where: { email: email },
      attributes: ["id", "primeiro_nome", "segundo_nome", "email", "bilhete", "telemovel"],
      include: [
        {
          model: Proponente,
          include: [
            {
              model: Emprestimo,
              where: { estado: true, progresso: "CONCLUIDO" },
              include: [
                {
                  model: Diversificacao,
                  include: [
                    {
                      model: Investidor,
                      include: [
                        {
                          model: User,
                          attributes: [
                            "id",
                            "primeiro_nome",
                            "segundo_nome",
                            "email",
                            "bilhete",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
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

// Investir por emprestimos ao proponente

export async function POST(req: NextRequest) {
  const body = await req.json();

  const valor = await converterString(body.valor);
  const userId = await converterString(body.userId);
  const emprestimoId = await converterString(body.emprestimoId);
  const propUserId = await converterString(body.propUserId);
  const income: any = {};

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations();

    const carteira = await Carteira.findOne({ where: { user_id: userId } }); // carteira do  investidor

    const emprestimo = await Emprestimo.findOne({where:{id:emprestimoId, valor:valor}});
    const propCarteira = await Carteira.findOne({
      where: { user_id: propUserId },
    }); // carteira do  proponente

    if (valor > carteira!.saldo) {
      console.log("investimento maior que a carteira!");
      return NextResponse.json(false, { status: 200 });
    }

    income.saqueado = carteira!.saldo - valor;
    income.bonificado = propCarteira!.saldo + valor;

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
        { where: { user_id: propUserId }, transaction: t }
      );

      if(emprestimo){
        income.emprestimoResolvido = await Emprestimo.update(
          { pendencia: false, progresso: "CONCLUIDO" },
          { where: { id: emprestimoId }, transaction: t }
        );
      }
      const emprestimoResolvido = income.emprestimoResolvido

      return {
        historicoDeposito,
        historicoSaque,
        desconto,
        bonus,
        emprestimoResolvido,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
