import {
  converterString,
  gerarCodigoCartao,
  gerarNumeroCartao,
} from "@/app/actions/auth";
import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Carteira from "@/models/Carteira";
import Deposito from "@/models/Deposito";
import Emprestimo from "@/models/Emprestimo";
import Saque from "@/models/Saque";
import { NextRequest, NextResponse } from "next/server";

// Investir por emprstimos ao proponente

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
    setupAssociations();

    const carteira = await Carteira.findOne({ where: { user_id: userId } });
    const emprestimo = await Emprestimo.findByPk(emprestimoId);
    const propCarteira = await Carteira.findOne({
      where: { user_id: propUserId },
    });

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
      const dessconto = await Carteira.update(
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

      if (valor === emprestimo!.valor) {
        income.emprestimoResolvido = await Emprestimo.update(
          { pendencia: false },
          { where: { id: emprestimoId }, transaction: t }
        );
      }

      const emprestimoResolvido = income.emprestimoResolvido;

      return {
        historicoDeposito,
        historicoSaque,
        dessconto,
        bonus,
        emprestimoResolvido,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
