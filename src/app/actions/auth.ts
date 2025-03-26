'use server'

import { createSession} from "@/app/lib/session";
import { redirect } from "next/navigation";
import { deleteSession } from '@/app/lib/session'
import bcrypt from "bcryptjs"




const web_domain = 'http://localhost:3000'
const userApi = `${web_domain}/${process.env.SERVER_DOIS}/usuario`

export async function buscarUser(email: any) {
    
    const response = await fetch(`${userApi}?email=${email}`);
    if (!response.ok) {console.log("Usuário não encontrado"); return redirect('/')}
    return response.json();
}

export async function hashPassword(password: string) {
    const saltRounds = 12; // Definir número de rounds (quanto maior, mais seguro, mas mais lento)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function login(data:FormData) {

    const email = JSON.stringify(data.get('email')).replace(/"/g,'')
    const password = JSON.stringify(data.get('password')).replace(/"/g,'')
    

    const user = await buscarUser(email)

    const isValid = await bcrypt.compare(password, user.password, )

    if(!isValid){
        console.log('Senha incorreta!')
        return redirect('/')
    }
    // guardando dados em tokens
   // createSession(user.primeiro_nome, 'primeiro_nome')
    createSession(user.email, 'user_email')
    return redirect('/dashboard')

}

export async function logout() {

    deleteSession('user_email')
    // deleteSession('primeiro_nome')
   // deleteSession('segundo_nome')
    console.log("Session deleted!")
    redirect('/')
}

export async function registrar(formData: any) {
    const picture: File[] = formData.profilePicture
    const hashPass = await hashPassword(formData.password)

    const usuario = {
        primeiro_nome: formData.primeiro_nome,
        password: hashPass,
        genero: formData.genero,
        email: formData.email,
        bilhete: formData.bilhete,
        segundo_nome: formData.segundo_nome,
        telemovel: formData.telemovel,
    }

    const res = await fetch(userApi, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            //  "X-CSRFToken": csrf
        },
        body: JSON.stringify(usuario)
    })

    if (!res.ok) {
        console.log("Erro ao registro")
        return redirect('/auth/registrar')
    }
    
    // Criar session
    //createSession(usuario.primeiro_nome, 'primeiro_nome')
   // createSession(usuario.segundo_nome, 'segundo_nome')
    createSession(usuario.email, 'user_email')
    
    redirect('/dashboard')
}