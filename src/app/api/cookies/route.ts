
//import { PrismaClient } from '@prisma/client';
import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

//const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    // const cookies = req.headers.get('user_email') || ""

    const { searchParams } = new URL(req.url);
    const nome: any = searchParams.get("nome");
    
   // console.log("nome",nome)
    
    const cookieStore = await cookies()
    const session = cookieStore.get(nome)?.value
    
//  console.log("session",session)
    const playload = await decrypt(session)

    if (!session || !playload || !nome) {
        return null
    }
    
  //  console.log("session",playload)


    return NextResponse.json({session:playload })

}

