

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


export interface userResponse{
    users:UserProps[]
}
