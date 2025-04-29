
import dotenv from 'dotenv'

dotenv.config()

export const options = {
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    dialect:'mysql',
    loggin:process.env.NODE_ENV === "development" ?  console.log : false,
    migrationStorageTableName:'migrations'
}

if(process.env.NODE_ENV === 'production'){
 if(process.env.DB_SSL === 'true'){
    options.dialectOptions = {
        ssl:{
            rejectUnauthorized:true
        }
    }
 }
}

export default {
    development:options,
    test:options,
    production:options
}