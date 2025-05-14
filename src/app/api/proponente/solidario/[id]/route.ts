export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import {Pessoa} from "@/models/Pessoa";
import {Solidario} from "@/models/Solidario";
import {User} from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


// consulta auxiliar para convidar para classe de guarnição
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {

    const resp = await Solidario.findAll({
      where: { user_id: uuid, estado: false },
      include: [
        {
          model: Pessoa,
          include: [
            {
              model: User,
              attributes: ["primeiro_nome", "segundo_nome", "id", "email"],
            },
          ],
        },
      ],
    });

    const total = await Solidario.sum("taxa",{
      where:{estado:false,  user_id: uuid}
    }) 

    if (!resp) {
      return NextResponse.json(
        { message: "Dados não encontrados" },
        { status: 404 }
      );
    }

    const result = {
      data: resp,
      total: total,
    };
   // console.log("Dados solicitados", result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error },
      { status: 500 }
    );
  }
}
