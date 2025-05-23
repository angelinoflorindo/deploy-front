export const dynamic = "force-dynamic";
import { sequelize } from "@/lib/sequelize";
import Diversificacao from "@/models/Diversificacao";
import Emprestimo from "@/models/Emprestimo";
import Investidor from "@/models/Investidor";
import { Pessoa } from "@/models/Pessoa";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// Buscar informações do investidor, incluido os investimentos(credito e emprestimo)
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const investidorId = Number(id);

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const result = await Investidor.findOne({
      where: { id: investidorId },
      include: [
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "primeiro_nome",
            "segundo_nome",
            "email",
            "bilhete",
            "telemovel",
          ],
          include: [{ model: Pessoa, as: "Pessoa" }],
        },
        {
          model: Diversificacao,
          as: "Diversificacaos",
          include: [{ model: Emprestimo, as: "Emprestimos" }],
        },
      ],
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error },
      { status: 500 }
    );
  }
}

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = Number(id);
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const result = await Investidor.update(body, { where: { id: uuid } });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
