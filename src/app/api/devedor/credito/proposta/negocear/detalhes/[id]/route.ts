export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import Diversificacao from "@/models/Diversificacao";
import Emprestimo from "@/models/Emprestimo";
import NegocearEmprestimos from "@/models/NegocearEmprestimo";
import { NegociarEmprestimoProps } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

// Confirmar se o emprestimo tem no mínimo uma negociação

export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = context.params;
  const uuid = Number(id);
  try {
   ////setupAssociations()();
    await sequelize.authenticate();
    await sequelize.sync();
    

    const emprestimo = await Diversificacao.findOne({
      where: { emprestimo_id: uuid, protencao: true },
    });
    //console.log('testando', emprestimo)
    return NextResponse.json({ emprestimo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// PUT - confirmar  a proposta do primeiro investidor
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } =  context.params;
  const emprestimoId = Number(id)

  const body: NegociarEmprestimoProps = await req.json();


  const investidorId = await converterString(body.investidor_id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    //setupAssociations()();

    const result = await sequelize.transaction(async (t) => {
      const negociacao = await NegocearEmprestimos.update(
        { pendencia: false },
        {
          where: {
            emprestimo_id: emprestimoId,
            investidor_id: investidorId,
          },
          transaction: t,
        }
      );
      const diversificacao = await Diversificacao.update(
        { protencao: true },
        {
          where: {
            investidor_id: investidorId,
            emprestimo_id: emprestimoId,
          },

          transaction: t,
        }
      );

      const emprestimo = await Emprestimo.update(
        {
          valor: body.valor,
          juro: body.juro,
          prestacao: body.prestacao,
          prazo: body.prazo,
        },
        {
          where: {
            id: emprestimoId,
          },

          transaction: t,
        }
      );
      return { negociacao, diversificacao, emprestimo };
    });
    // console.log('server response', result)
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// REJEITAR a proposta do investidor
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } =  context.params;
  const investidorId = Number(id);
  
  const body = await req.json();
  const emprestimoId = body.emprestimoId;

  try {
    ////setupAssociations()();
    await sequelize.authenticate();
    await sequelize.sync();
    

    await NegocearEmprestimos.update(
      { estado: false, pendencia: false },
      { where: { investidor_id: investidorId, emprestimo_id: emprestimoId } }
    );

    return NextResponse.json("Proposta de investimento rejeitado!");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
