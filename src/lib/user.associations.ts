import { DebitoVinculado } from "@/models/DebitoVinculado";
import { Deposito } from "@/models/Deposito";
import { Devedor } from "@/models/Devedor";
import { Documento } from "@/models/Documento";
import { Papel } from "@/models/Papel";
import { Pessoa } from "@/models/Pessoa";
import { Solidario } from "@/models/Solidario";
import { User } from "@/models/User";

export function setUserAssociation() {
  User.hasOne(Pessoa, { foreignKey: "user_id" }); // tomado
  User.hasMany(Documento, { foreignKey: "user_id" });
  User.hasOne(Papel, {foreignKey: "user_id" });
  User.hasMany(Solidario, { foreignKey: "user_id" });
  User.hasOne(Devedor, { foreignKey: "user_id" });
  User.hasMany(Deposito, { foreignKey: "user_id" });
  
  Pessoa.belongsTo(User, { foreignKey: "user_id" });
  Documento.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Papel.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Solidario.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Devedor.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Deposito.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

   DebitoVinculado.belongsTo(Devedor, {
    foreignKey: "devedor_id",
    onDelete: "CASCADE",
  });

  Devedor.hasMany(DebitoVinculado, {
    foreignKey: "devedor_id",
    onDelete: "CASCADE",
  });
  
}
