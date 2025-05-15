export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import Investidor from "@/models/Investidor";
import { Devedor } from "@/models/Devedor";
import { Deposito } from "@/models/Deposito";
import Saque from "@/models/Saque";
import Carteira from "@/models/Carteira";
import Reclamacao from "@/models/Reclamacao";
import { Documento } from "@/models/Documento";
import Proponente from "@/models/Proponente";
import Emprestimo from "@/models/Emprestimo";
import { sequelize } from "@/lib/sequelize";
import { Pessoa } from "@/models/Pessoa";
import { Emprego } from "@/models/Emprego";
import { Conta } from "@/models/Conta";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const userInfo = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Proponente,
          as: "Proponente",
          include: [
            { model: Emprestimo, as: "Emprestimos", attributes: ["id"] },
          ],
        },
        {
          model: Pessoa,
          as: "Pessoa",
          include: [
            { model: Emprego, as: "Emprego" },
            { model: Conta, as: "Conta" },
          ],
        },
        { model: Investidor, as: "Investidor" },
        { model: Devedor, as: "Devedor" },
        { model: Deposito, as: "Depositos" },
        { model: Saque, as: "Saque" },
        { model: Carteira, as: "Carteira" },
        { model: Reclamacao, as: "Reclamacaos" },
        { model: Documento, as: "Documentos" },
      ],
    });
    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}

// registrar usuários

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const user = await findOrCreateUser({
      primeiro_nome: data.primeiro_nome,
      password: data.password,
      genero: data.genero,
      email: data.email,
      bilhete: data.bilhete,
      segundo_nome: data.segundo_nome,
      telemovel: data.telemovel,
    });

    return NextResponse.json({ email: user.email, id: user.id });
  } catch (error) {
    return NextResponse.json(
      { isSqlError: true, message: "Erro ao criar usuário", error },
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
    defaults: {
      primeiro_nome: data.primeiro_nome,
      password: data.password,
      genero: data.genero,
      email: data.email,
      bilhete: data.bilhete,
      segundo_nome: data.segundo_nome,
      telemovel: data.telemovel,
    },
  });
  return user;
}
