import { converterString } from "@/app/actions/auth";
import { NextRequest, NextResponse } from "next/server";
import {sequelize} from "@/lib/sequelize"
import {setupAssociations} from "@/lib/associations"
import Pessoa from "@/models/Pessoa";
import Conta from "@/models/Conta";
import Emprego from "@/models/Emprego";
import Conjugue from "@/models/Conjugue";
import Residencia from "@/models/Residencia";
import Solidario from "@/models/Solidario";


export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    const pessoa = await Pessoa.findOne({
      where: { id: uuid },
      include: [
        {model:Conta},
        {model:Emprego},
        {model:Conjugue},
        {model:Residencia},
        {model:Solidario}
      ]
    });
    
    if (!pessoa) {
      return NextResponse.json(
        { message: "Dados não encontrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(pessoa, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error },
      { status: 500 }
    );
  }
}
