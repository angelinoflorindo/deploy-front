'use server'

import { createSession, getCsrfToken } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { deleteSession } from '@/app/lib/session'
import api from "../api/route";



function userApi() {
    const url = `${api()}/usuario`
    return url
}


export async function signup(formData: FormData) {

    const user = { id: formData.get('userId'), password: formData.get('password') }
    await createSession(user.id)
    redirect('/dashboard')
}

export async function logout(formData: FormData) {

    deleteSession()
    redirect('/')
}

export async function login(formData: FormData) {
    console.log(formData)
}

export async function registrar(formData: any) {

    const picture: File[] = formData.profilePicture

    const csrf = await getCsrfToken()

    // console.log('picture ',picture )

    const usuario = {
        nome_completo: formData.nome_completo,
        password: formData.password,
        genero: formData.genero,
        email: formData.email,
        bilhete: formData.bilhete,
        estado_civil: formData.estado_civil,
        scanner: formData.scanner,
        telemovel: formData.telemovel,
    }
    //console.log('usuario', usuario)
    // const hashedpassword = await bcrypt.
    
    const res = await fetch(`${userApi()}/registrar/`, {
        method: "POST",
        credentials:'include',
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrf
        },
        body: JSON.stringify(usuario)
    })

    if (!res.ok) {
        alert('Erro no servidor')
        redirect('/auth/registrar')
    }

    return redirect('/dashboard')
}