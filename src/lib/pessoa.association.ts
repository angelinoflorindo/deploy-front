import { Conjugue } from "@/models/Conjugue";
import { Conta } from "@/models/Conta";
import { Emprego } from "@/models/Emprego";
import { Pessoa } from "@/models/Pessoa";
import { Residencia } from "@/models/Residencia";
import { Solidario } from "@/models/Solidario";




export function setPessoaAssociation():void{
  Pessoa.belongsTo(Emprego, { as:"Emprego", foreignKey: "emprego_id" });
  Pessoa.belongsTo(Residencia, {as:"Residencia" ,foreignKey: "residencia_id" });
  Pessoa.hasOne(Conjugue, {as:"Conjugue", foreignKey: "pessoa_id" });
  Pessoa.hasOne(Solidario, {as:"Solidario", foreignKey: "pessoa_id" });
  Pessoa.hasOne(Conta, {as:"Conta" ,foreignKey: "pessoa_id" });


  Emprego.hasMany(Pessoa, {as:"Pessoa", foreignKey: "emprego_id" });
  Residencia.hasMany(Pessoa, {as:"Pessoa",foreignKey: "residencia_id" });
  Conjugue.belongsTo(Pessoa, {as:"Pessoa",foreignKey: "pessoa_id",  });
  Solidario.belongsTo(Pessoa, {as:"Pessoa", foreignKey: "pessoa_id",  });
  Conta.belongsTo(Pessoa, {as:"Pessoa", foreignKey: "pessoa_id",  });


  
}