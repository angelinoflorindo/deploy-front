import { DebitoVinculado } from "@/models/DebitoVinculado";
import { Deposito } from "@/models/Deposito";
import { Devedor } from "@/models/Devedor";
import { Documento } from "@/models/Documento";
import { Papel } from "@/models/Papel";
import { Pessoa } from "@/models/Pessoa";
import { Solidario } from "@/models/Solidario";
import { User } from "@/models/User";

export function setUserAssociation():void{
  User.hasOne(Pessoa, {  foreignKey: "user_id", as:"Pessoa"}); // tomado
  User.hasMany(Documento, { as:"Documento", foreignKey: "user_id" });
  User.hasOne(Papel, {as:"Papel",foreignKey: "user_id" });
  User.hasMany(Solidario, {as:"Solidario", foreignKey: "user_id" });
  User.hasOne(Devedor, {as:"Devedor", foreignKey: "user_id" });
  User.hasMany(Deposito, { as:"Deposito",foreignKey: "user_id" });
  
  Pessoa.belongsTo(User, {as:"User",foreignKey: "user_id", });
  Documento.belongsTo(User, {as:"User",foreignKey: "user_id",  });
  Papel.belongsTo(User, {as:"User", foreignKey: "user_id",  });
  Solidario.belongsTo(User, { as:"User",foreignKey: "user_id",  });
  Devedor.belongsTo(User, {as:"User", foreignKey: "user_id",  });
  Deposito.belongsTo(User, {as:"User",foreignKey: "user_id",  });

   DebitoVinculado.belongsTo(Devedor, {
    foreignKey: "devedor_id",
    as:"Devedor"
  });

  Devedor.hasMany(DebitoVinculado, {
    as:"DebitoVinculados",
    foreignKey: "devedor_id",
  });
  
}
