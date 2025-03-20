import 'server-only'
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import api from '../api/route';

const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey)

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

export async function createSession(userID: any) {

    const cookieStore = await cookies()
    const expiresAt = new Date(Date.now() + 10 * 1000)
    const session = await encrypt({ userID, expiresAt })

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,

    })

    return session
}

export async function updateSession() {

    const cookieStore = await cookies()
    const expires = new Date(Date.now() + 10 * 1000)
    const session = cookieStore.get('session')?.value
    const playload = await decrypt(session)

    if (!session || !playload) {
        return null
    }

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,

    })
}


export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')

}


export async function getSession() {
    const cookieStore = await cookies()
    const session =  cookieStore.get('session')
    return session

}

export async function getCsrfToken() {
    const res = await fetch(`${api()}/api/csrf/`, {
        credentials:'include'
    })
   // console.log("csrf", res)
    const data = await res.json()
    //console.log("csrf", data.csrfToken)
    return data.csrfToken

}
