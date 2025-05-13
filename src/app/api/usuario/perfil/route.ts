export const dynamic = "force-dynamic";
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
import { sequelize } from "@/lib/sequelize";
import { setupAssociations } from "@/lib/associations";
import Proponente from "@/models/Proponente";
import Papel from "@/models/Papel";
import Emprestimo from "@/models/Emprestimo";


// Rota para buscar informações limitadas
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
    
    //setupAssociations();
    await sequelize.authenticate();
    await sequelize.sync();

    const userInfo = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
      include: [
        { model: Papel, as:"papel", attributes: ["id", "perfil"] },
      ],
    });
    console.log("validar perfil", userInfo)
    return NextResponse.json(userInfo, { status: 200 });

  /*
  try {
  
  
    
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }*/
}
