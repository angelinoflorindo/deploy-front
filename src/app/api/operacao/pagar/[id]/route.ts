export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import Pagamento from "@/models/Pagamento";
import { NextRequest, NextResponse } from "next/server";


/**
 * 
 * @param req 
 * @param context 
 * @returns 
 * 
 * Página dedicada a informações de reembolso
 */

// Pelo devedor Consultar o registro de pagamentos  de créditos

export async function GET(
  req: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;
  const uuid = await converterString(id);

  try {

    const result = await Pagamento.findOne({ where: {devedor_id: id, estado:true}});

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}