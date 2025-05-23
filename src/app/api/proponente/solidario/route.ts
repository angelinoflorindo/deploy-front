export const dynamic = "force-dynamic";
import { sequelize } from "@/lib/sequelize";
import { Pessoa } from "@/models/Pessoa";
import Proponente from "@/models/Proponente";
import { Solidario } from "@/models/Solidario";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// buscar todos os pedidos de guardião

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const user = await User.findOne({
      where: { email: email },
      attributes: ["id"],
      include: [{ model: Pessoa, as: "Pessoa", attributes: ["id"] }],
    });

    //console.log('testar as pessoas', user?.toJSON())
    const result = await Solidario.findOne({
      where: {
        estado: false,
        pessoa_id: user?.toJSON().Pessoa.id,
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "primeiro_nome",
            "segundo_nome",
            "email",
            "telemovel",
          ],
        },
      ],
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}

// Cria um proponente ao convidar o guardião
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = Number(body.user_id);

  const info = {
    solicitacao: 0,
    reembolsar: 0,
    satisfeitos: 0,
    insatisfeitos: 0,
    user_id: userId,
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await Proponente.findOrCreate({
      where: { user_id: userId },
      defaults: info,
    });

    return NextResponse.json(
      { message: "registrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
