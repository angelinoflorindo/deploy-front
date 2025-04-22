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
import Proponente from "@/models/Proponente";
import Papel from "@/models/Papel";
import Emprestimo from "@/models/Emprestimo";

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
        {model:Proponente, include:[{model:Emprestimo, attributes:['id']}]},
        { model: Investidor },
        { model: Devedor },
        { model: Deposito },
        { model: Saque },
        { model: Carteira },
        { model: Reclamacao },
        { model: Documento },
        {model:Papel, 
          attributes:['id', 'perfil']
        },
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

 
    const user = await findOrCreateUser({ 
      primeiro_nome: data.primeiro_nome,
      password: data.password,
      genero: data.genero,
      email: data.email,
      bilhete: data.bilhete,
      segundo_nome: data.segundo_nome,
      telemovel: data.telemovel,
    });

    return NextResponse.json({email:user.email, id:user.id});
  } catch (error) {
    //console.error(error); // Ajuda a depurar
    return NextResponse.json(
      { isSqlError:true, message: "Erro ao criar usuário", error },
      { status: 500 }
    );
  }
}

async function findOrCreateUser(data: any) {
  const [user] = await User.findOrCreate({
    where: {   
      primeiro_nome: data.primeiro_nome,
      password: data.password,
      genero: data.genero,
      email: data.email,
      bilhete: data.bilhete,
      segundo_nome: data.segundo_nome,
      telemovel: data.telemovel,
    },
    defaults:{
      primeiro_nome: data.primeiro_nome,
      password: data.password,
      genero: data.genero,
      email: data.email,
      bilhete: data.bilhete,
      segundo_nome: data.segundo_nome,
      telemovel: data.telemovel,
    }
  });
  return user;
}