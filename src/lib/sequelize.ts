// lib/sequelize.ts
//import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import path from 'path'
import User from "@/models/User";
import Pessoa from "@/models/Pessoa";
import Documento from "../models/Documento";
import Devedor from "../models/Devedor";
import Investidor from "../models/Investidor";
import Reclamacao from "../models/Reclamacao";
import Proponente from "../models/Proponente";
import Saque from "../models/Saque";
import Deposito from "../models/Deposito";
import Carteira from "../models/Carteira";
import Papel from "../models/Papel";
import Solidario from "../models/Solidario";
import Conjugue from "../models/Conjugue";
import Conta from "../models/Conta";
import Credito from "../models/Credito";
import Diversificacao from "../models/Diversificacao";
import Pagamento from "../models/Pagamento";
import Movel from "../models/Movel";
import Emprestimo from "../models/Emprestimo";
import EmprestimoSolidario from "../models/EmprestimoSolidario";
import Reembolso from "../models/Reembolso";
import Residencia from "../models/Residencia";
import Emprego from "../models/Emprego";
import CreditoSolidario from "../models/CreditoSolidario";
import ContaVinculada from "../models/ContaVinculada";
import {config} from 'dotenv'


config(); 


 export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectModule: require("mysql2"),
  //benchmark: true,
 
  models: [
    User,
    Pessoa,
    Emprego,
    Emprestimo,
    EmprestimoSolidario,
    Residencia,
    Credito,
    CreditoSolidario,
    Conjugue,
    Conta,
    Reclamacao,
    Reembolso,
    Documento,
    Devedor,
    Investidor,
    Proponente,
    Movel,
    Saque,
    Deposito,
    Carteira,
    Papel,
    Solidario,
    Diversificacao,
    Pagamento,
    ContaVinculada
  ],
  logging:false,

  //models:[path.resolve(__dirname, '..', 'models')],

});
/*
(async () => {
  try {
    sequelize.addModels([User])
    await sequelize.authenticate();
    console.log("Connection stablished successfully");

    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("unable to connect to the database ", error);
  }
})();
*/

//export default sequelize;
