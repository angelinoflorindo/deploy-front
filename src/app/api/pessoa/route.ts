
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {

        const pessoas = await prisma.pessoa.findMany();
        return NextResponse.json(pessoas);
    }

    try {
        const id = Number(userId)
        const pessoa = await prisma.pessoa.findUnique({
            where: { user_id:id},
        });
        if (!pessoa) {
            return NextResponse.json({ message: "Dados não encontrados" }, { status: 404 });
        }

        return NextResponse.json(pessoa, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao buscar os dados", error }, { status: 500 });
    }


}

export async function POST(req: NextRequest) {

    const pessoa = await req.json();

    const result = await prisma.pessoa.create({ data: pessoa });
    return NextResponse.json(result);

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



