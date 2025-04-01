

export  interface UserProps{
    id:number,
    primeiro_nome:String,
    segundo_nome:String,
    password:String,
    genero:String, 
    bilhete:String,
    telemovel:String,
    email:String
}


export  interface PessoaProps{
    id:number,
    estado_civil:String,
    provincia:String,
    municipio:String,
    profissao:String, 
    nivel_instrucao:String,
    data_nascimento:Date,
    user_id:number
}


export interface userResponse{
    users:UserProps[]
}
