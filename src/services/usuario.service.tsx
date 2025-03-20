
import api from "@/app/api/route"
import { getSession, login } from "../../lib"
import { redirect } from "next/navigation"



export interface Pessoa {
    nome_completo: string,
    genero: string,
    email: string,
    bilhete: string,
    estado_civil: string,
    data_nascimento: string,
    provincia: string,
    municipio: string,
    profissao: string,
    nivel_instrucao: string,
    csrfmiddlewaretoken:string
}


function userApi() {
    const url = `${api()}/usuario`
    return url
}


export async function loginUsuario(formData: FormData) {
    const user = {numero:formData.get('numero'), password:formData.get('password')}
    const session = await getSession()

    if(user.numero== 'angeldev773@gmail.com' && user.password =='4r4r4r4r' ){
       /* fetch(`${userApi()}/`,
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formData)
        })

        */
       console.log(`session ${session}`)
        login(formData)


    } else{
        console.log('Acesso negado')
        redirect('/')
    }
    


}



export async function registrar(formData: FormData) {
    const csrf = formData.get('csrfmiddlewaretoken')
    const nome = formData.get('nome_completo')
    console.log(`csrf ${csrf}`)
    console.log(`nome ${nome}`)
    
}