import { Conjugue } from "@/models/Conjugue";
import { Conta } from "@/models/Conta";
import { Emprego } from "@/models/Emprego";
import { Pessoa } from "@/models/Pessoa";
import { Residencia } from "@/models/Residencia";
import { Solidario } from "@/models/Solidario";




export function setPessoaAssociation(){
  Pessoa.belongsTo(Emprego, { foreignKey: "emprego_id" });
  Pessoa.belongsTo(Residencia, { foreignKey: "residencia_id" });
  Pessoa.hasOne(Conjugue, { foreignKey: "pessoa_id" });
  Pessoa.hasOne(Solidario, { foreignKey: "pessoa_id" });
  Pessoa.hasOne(Conta, { foreignKey: "pessoa_id" });


  Emprego.hasMany(Pessoa, { foreignKey: "emprego_id" });
  Residencia.hasMany(Pessoa, { foreignKey: "residencia_id" });
  Conjugue.belongsTo(Pessoa, { foreignKey: "pessoa_id", onDelete: "CASCADE" });
  Solidario.belongsTo(Pessoa, { foreignKey: "pessoa_id", onDelete: "CASCADE" });
  Conta.belongsTo(Pessoa, { foreignKey: "pessoa_id", onDelete: "CASCADE" });


  
}