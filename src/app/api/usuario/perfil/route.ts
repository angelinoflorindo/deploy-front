export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/User";
import {Papel} from "@/models/Papel";

// Rota para buscar informações limitadas
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const user = await User.findOne({
    where: { email: email },
    attributes: { exclude: ["password"] },
  });

  const papel = await Papel.findOne({
    where: { user_id: user?.id },
  });
  

  console.log("validar perfil", papel);
  return NextResponse.json({user:user, papel:papel}, { status: 200 });

  /*
  try {
  
  
    
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }*/
}
