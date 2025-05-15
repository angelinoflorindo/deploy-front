export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { Pessoa } from "@/models/Pessoa";
import { Conta } from "@/models/Conta";
import { Emprego } from "@/models/Emprego";
import { Conjugue } from "@/models/Conjugue";
import { Residencia } from "@/models/Residencia";
import { Solidario } from "@/models/Solidario";
import { User } from "@/models/User";
import { sequelize } from "@/lib/sequelize";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid =Number(id);
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    const pessoa = await Pessoa.findOne({
      where: { id: uuid },
      include: [
        { model: Conta, as:"Conta" },
        { model: Emprego, as:"Emprego"},
        { model: Conjugue, as:"Conjugue" },
        { model: Residencia, as:"Residencia" },
        { model: Solidario, as:"Solidario" },
        { model: User, as:"User", attributes: ["id", "email"] },
      ],
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

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = Number(id);
  let body = await req.json();

  const userId = Number(body.pessoa.user_id);

  const infoResidencia = {
    id: Number(body.residencia.id),
    tipo: body.residencia.tipo,
    data_inicio: new Date(body.residencia.data_inicio),
  };

  const infoEmprego = {
    id: Number(body.emprego.id),
    area: body.emprego.area,
    cargo: body.emprego.cargo,
    sector: body.emprego.sector,
    data_inicio: new Date(body.emprego.data_inicio),
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await sequelize.transaction(async (t) => {
      await Residencia.update(infoResidencia, {
        where: { id: infoResidencia.id },
        transaction: t,
      });
      await Emprego.update(infoEmprego, {
        where: { id: infoEmprego.id },
        transaction: t,
      });

      const pessoaInfo = {
        profissao: body.pessoa.profissao,
        data_nascimento: new Date(body.pessoa.data_nascimento),
        estado_civil: body.pessoa.estado_civil,
        municipio: body.pessoa.municipio,
        nivel_instrucao: body.pessoa.nivel_instrucao,
        provincia: body.pessoa.provincia,
        user_id: userId,
        emprego_id: infoEmprego.id,
        residencia_id: infoResidencia.id,
      };

      await Pessoa.update(pessoaInfo, { where: { id: uuid }, transaction: t });
    });

    return NextResponse.json(
      { message: "Atualização bem sucedida" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
