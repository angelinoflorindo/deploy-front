import Carteira from "@/models/Carteira";
import { DebitoVinculado } from "@/models/DebitoVinculado";
import { Deposito } from "@/models/Deposito";
import { Devedor } from "@/models/Devedor";
import { Documento } from "@/models/Documento";
import Investidor from "@/models/Investidor";
import { Papel } from "@/models/Papel";
import { Pessoa } from "@/models/Pessoa";
import Proponente from "@/models/Proponente";
import Reclamacao from "@/models/Reclamacao";
import Saque from "@/models/Saque";
import { Solidario } from "@/models/Solidario";
import { User } from "@/models/User";

export function setUserAssociation(): void {
  User.hasOne(Pessoa, { foreignKey: "user_id", as: "Pessoa" }); // tomado
  User.hasMany(Documento, { as: "Documentos", foreignKey: "user_id" });
  User.hasOne(Papel, { as: "Papel", foreignKey: "user_id" });
  User.hasMany(Solidario, { as: "Solidario", foreignKey: "user_id" });
  User.hasOne(Devedor, { as: "Devedor", foreignKey: "user_id" });
  User.hasMany(Deposito, { as: "Depositos", foreignKey: "user_id" });
  User.hasOne(Investidor, { as:"Investidor", foreignKey: "user_id" });
  User.hasMany(Reclamacao, {as:"Reclamacaos", foreignKey: "user_id" });
  User.hasOne(Proponente, {as:"Proponente", foreignKey: "user_id" });
  User.hasMany(Saque, { as:"Saque",foreignKey: "user_id" });
  User.hasOne(Carteira, {as:"Carteira", foreignKey: "user_id" });

  Pessoa.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Documento.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Papel.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Solidario.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Devedor.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Deposito.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Investidor.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Reclamacao.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Proponente.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Saque.belongsTo(User, { as: "User", foreignKey: "user_id" });
  Carteira.belongsTo(User, { as: "User", foreignKey: "user_id" });

  DebitoVinculado.belongsTo(Devedor, {
    foreignKey: "devedor_id",
    as: "Devedor",
  });

  Devedor.hasMany(DebitoVinculado, {
    as: "DebitoVinculados",
    foreignKey: "devedor_id",
  });
}
