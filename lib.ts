"use server"

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey)
const Cookie = await cookies()

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2 min')
        .sign(key)

}


export async function decrypt(session: string | undefined = "") {
    try {

        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256']
        })

        return payload

    } catch (error) {
        console.log("Failed to decrypt")
    }

}

export async function login(formData: FormData) {
    const user = { numero: formData.get('numero'), password: formData.get('password') }

    const expires = new Date(Date.now() + 10 * 1000)
    const session = await encrypt({ user, expires })

    Cookie.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires
    })

    NextResponse.redirect('/dashboard')
    // redirect()

}




export async function logout() {
    
     Cookie.delete('session')
     redirect('/')

}



export async function getSession() {
   
    const session = Cookie.get('session')?.value
    if (!session) return null

    return await decrypt(session)

}

