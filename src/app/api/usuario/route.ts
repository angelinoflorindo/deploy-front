import { UserProps } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Investidor from "@/models/Investidor";
import Devedor from "@/models/Devedor";
import Deposito from "@/models/Deposito";
import Saque from "@/models/Saque";
import Carteira from "@/models/Carteira";
import Reclamacao from "@/models/Reclamacao";
import Documento from "@/models/Documento";
import Pessoa from "@/models/Pessoa";
import Emprego from "@/models/Emprego";
import Residencia from "@/models/Residencia";
import Conjugue from "@/models/Conjugue";
import Conta from "@/models/Conta";
import {sequelize} from '@/lib/sequelize'
import {setupAssociations} from '@/lib/associations'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    const users = await User.findAll();
    return NextResponse.json(users);
  }

  try {
        
    await sequelize.authenticate()
    await sequelize.sync()
    setupAssociations()
    const userInfo = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
      include: [
        { model: Investidor },
        { model: Devedor },
        { model: Deposito },
        { model: Saque },
        { model: Carteira },
        { model: Reclamacao },
        { model: Documento },
        {
          model: Pessoa,
          include: [
            {
              model: Emprego,
            },
            { model: Residencia },
            { model: Conjugue },
            { model: Conta },
          ],
        },
      ],
    });

    if (!userInfo) {
      return NextResponse.json(
        { message: "Usuário não existe" },
        { status: 404 }
      );
    }

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    await sequelize.authenticate()
    await sequelize.sync()
    setupAssociations()
    const user = await User.create(data);
    const result = {
      id:user.id,
      email:user.email
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error(error); // Ajuda a depurar
    return NextResponse.json(
      { message: "Erro ao criar usuário", error },
      { status: 500 }
    );
  }
}
