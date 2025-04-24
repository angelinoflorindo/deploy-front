import { setupAssociations } from "@/lib/associations";
import { sequelize } from "@/lib/sequelize";
import Pessoa from "@/models/Pessoa";
import Solidario from "@/models/Solidario";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";



// buscar todos os pedidos de guardião Proponente e Devedor

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const user = await User.findOne({
      where: { email: email },
      attributes: ["id"],
      include: [{ model: Pessoa, attributes: ["id"] }],
    });

    //console.log('testar as pessoas', user?.toJSON().Pessoa.id)
    const result = await Solidario.findOne({
      where: {
        estado: false,
        pessoa_id:user?.toJSON().Pessoa.id
      },
      include:[{model:User, attributes:['id', 'primeiro_nome', 'segundo_nome', 'email', 'telemovel']}]
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const result = await Solidario.create(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
