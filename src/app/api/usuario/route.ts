
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {

        const users = await prisma.user.findMany();
        return NextResponse.json(users);

    }
    

    try {
        const user = await prisma.user.findUnique({
            where: { email:email},
        });
        if (!user) {
            return NextResponse.json({ message: "Usuário não existe" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao buscar usuário", error }, { status: 500 });
    }


}

export async function POST(req: NextRequest) {

    const user = await req.json();

    const result = await prisma.user.create({ data: user });
    return NextResponse.json(result);

}

// GET - Buscar usuário por ID
export async function BuscarUser(req: NextRequest, { params }: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: { id: Number(params.id) },
    });

    if (!user) {
        return NextResponse.json(user);
    }

    return NextResponse.json(user);
}

// PUT - Atualizar usuário por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.body; // Pega os dados do corpo da requisição

    try {
    
    } catch (error) {
        return NextResponse.json(error);
    }
}


// DELETE - Remover usuário por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.user.delete({
            where: { id: Number(params.id) },
        });

        return NextResponse.json('Dados eliminado');
    } catch (error) {
        return NextResponse.json(error);
    }
}



