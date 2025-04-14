import { converterString, hashPassword } from "@/app/actions/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Pessoa from "@/models/Pessoa";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const query = id;

  // Verifica se é email ou telemóvel
  const isEmail = query.includes("@");
  let user = null;

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    if (isEmail) {
      user = await User.findOne({
        where: { email: query },
        attributes: [
          "id",
          "primeiro_nome",
          "segundo_nome",
          "telemovel",
          "email",
        ],
        include: {
          model: Pessoa,
          attributes: ["id"],
        },
      });
    } else {
      user = await User.findOne({
        where: { telemovel: query },
        attributes: [
          "id",
          "primeiro_nome",
          "segundo_nome",
          "telemovel",
          "email",
        ],
        include: {
          model: Pessoa,
          attributes: ["id"],
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 404 }
    );
  }
}

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = await converterString(id);
  let body = await req.json();

  //console.log("testar userId", useid)
  //console.log("user info", body)
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    setupAssociations();

    let userInfo = {
      primeiro_nome: body.primeiro_nome,
      segundo_nome: body.segundo_nome,
      email: body.email,
      bilhete: body.bilhete,
      telemovel: body.telemovel,
      genero: body.genero,
    };

    let bodyInfo = {
      primeiro_nome: body.primeiro_nome,
      segundo_nome: body.segundo_nome,
      email: body.email,
      bilhete: body.bilhete,
      telemovel: body.telemovel,
      genero: body.genero,
      password: body.password,
    };

    if (body.password) {
      const hashPass = await hashPassword(body.password);
      bodyInfo.password = hashPass;

      const userResponse = await User.update(
        {
          bodyInfo,
        },
        { where: { id: uuid } }
      );

      if (!userResponse) {
        return NextResponse.json(
          { message: "Operação mal sucedida" },
          { status: 404 }
        );
      }
      console.log("from client", userResponse);
      return NextResponse.json(userResponse, { status: 200 });
    }

    const userResponse = await User.update(
      {
        userInfo,
      },
      { where: { id: uuid } }
    );

    if (!userResponse) {
      return NextResponse.json(
        { message: "Operação mal sucedida" },
        { status: 404 }
      );
    }

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// DELETE - Remover usuário por ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {

  const {id} = context.params
  try {
    await User.destroy({where:{where: { id: id }}});

    return NextResponse.json("Dados eliminado");
  } catch (error) {     
    return NextResponse.json(
    { message:error },
    { status: 404 }
  );
  }
}
