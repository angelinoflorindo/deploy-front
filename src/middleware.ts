


import { getSession, restoreSession } from '@/app/lib/session'
import {NextRequest, NextResponse} from  'next/server'


const rotasProtegidas = [
    '/dashboard',
    '/dashboard/credito',
    '/dashboard/credito/garantia',
    '/dashboard/credito/garantia?id',
    '/dashboard/credito/tipo-credito',
    '/dashboard/credito/tipo-credito?id',
    '/dashboard/historico',
    '/dashboard/historico?id',
    '/dashboard/historico/relatorio',
    '/dashboard/historico/saques',
    '/dashboard/proponente',
    '/dashboard/proponente?id',
    '/dashboard/proponente/avaliacao',
    '/dashboard/proponente/protecao',
    '/ferramenta', 
    '/ferramenta/detalhes',
    '/ferramenta/detalhes?id', 
    '/ferramenta/investidor', 
    '/ferramenta/reclamacao', 
    '/ferramenta/usuario',  
    '/ferramenta/usuario?id', 
]
const rotasPublicas = ['/', '/auth']

export default async function middleware(request:NextRequest){

    const path = request.nextUrl.pathname
    const isProtegida = rotasProtegidas.includes(path)
    const isPublica = rotasPublicas.includes(path)
    const session = await getSession('user_email')

    //console.log("session", session)

    if(isProtegida && !session?.value){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(
        isPublica &&
        session?.value &&
        !request.nextUrl.pathname.startsWith('/dashboard') &&
        !request.nextUrl.pathname.startsWith('/ferramenta')
    ){
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
   // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],

    matcher:rotasProtegidas,
}