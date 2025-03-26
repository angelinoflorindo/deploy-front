import 'server-only'
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";


const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey)
const serverUm = process.env.SERVER_UM

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

export async function createSession(sessionId:any, nome:any) {

    const expiresAt = new Date(Date.now() + 60 * 60 * 24)

    const cookieStore = await cookies()
    const session = await encrypt({ sessionId, expiresAt })

    cookieStore.set(nome, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite:'lax',
        path:'/'

    })
}

export async function restoreSession(nome:any){
    const cookieStore = await cookies()
    const session = cookieStore.get(nome)?.value
    const playload = await decrypt(session)

    if (!session || !playload) {
        return null
    }

    return playload
}

export async function updateSession(nome:any) {

    const cookieStore = await cookies()
    const expires = new Date(Date.now() + 60 * 60 * 24)
    const session = cookieStore.get(nome)?.value
    const playload = await decrypt(session)

    if (!session || !playload) {
        return null
    }

    cookieStore.set(nome, session, {
        httpOnly: true,
        secure: true,
        expires: expires,

    })
}


export async function deleteSession(nome:any) {
    const cookieStore = await cookies()
    cookieStore.delete(nome)

}


export async function getSession(nome:any) {
    const cookieStore = await cookies()
    const session = cookieStore.get(nome)
    return session

}


