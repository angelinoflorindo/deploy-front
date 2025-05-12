// associations.ts
import User from "../models/User";
import Pessoa from "../models/Pessoa";
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
import DebitoVinculado from "../models/DebitoVinculado"
import NegocearEmprestimo from "../models/NegocearEmprestimo";
import Credora from "@/models/Credora";

export function setupAssociations() {
  User.hasOne(Pessoa, { foreignKey: "user_id" });
  User.hasMany(Documento, { foreignKey: "user_id" });
  User.hasOne(Investidor, { foreignKey: "user_id" });
  User.hasMany(Reclamacao, { foreignKey: "user_id" });
  User.hasOne(Proponente, { foreignKey: "user_id" });
  User.hasOne(Devedor, { foreignKey: "user_id" });
  User.hasMany(Saque, { foreignKey: "user_id" });
  User.hasMany(Deposito, { foreignKey: "user_id" });
  User.hasOne(Carteira, { foreignKey: "user_id" });
  User.hasOne(Papel, {  foreignKey: "user_id"});
  User.hasMany(Solidario, { foreignKey: "user_id" });

//  Carteira.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  // Relacionamento
  Conjugue.belongsTo(Pessoa, { foreignKey: "pessoa_id", onDelete: "CASCADE" });

  // Relacionamento
  Conta.belongsTo(Pessoa, { foreignKey: "pessoa_id", onDelete: "CASCADE" });

  // Associações
  Credito.belongsTo(Devedor, { foreignKey: "devedor_id", onDelete: "CASCADE" });

  // Relacionamento
  Deposito.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Devedor.hasMany(Credito, { foreignKey: "devedor_id", onDelete: "CASCADE" });
  Devedor.hasMany(Movel, { foreignKey: "devedor_id", onDelete: "CASCADE" });
  Devedor.hasMany(Pagamento, { foreignKey: "devedor_id", onDelete: "CASCADE" });

  // Relacionamento
  Documento.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  // Define o relacionamento
  Emprego.hasMany(Pessoa, { foreignKey: "emprego_id" });

  Proponente.hasMany(Emprestimo, { foreignKey: "proponente_id" });
 // Emprestimo.belongsTo(Proponente, { foreignKey: "proponente_id" });

  Proponente.hasMany(Movel, { foreignKey: "proponente_id" });
  Proponente.hasMany(Reembolso, { foreignKey: "proponente_id" });

  // Relacionamento
 // Investidor.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  Movel.belongsTo(Proponente, {
    foreignKey: "proponente_id",
    onDelete: "CASCADE",
  });

  Pagamento.belongsTo(Devedor, {
    foreignKey: "devedor_id",
    onDelete: "CASCADE",
  });
  Devedor.hasMany(Pagamento, { foreignKey: "devedor_id" });

  // Define os relacionamentos
 // Pessoa.belongsTo(User, { foreignKey: "user_id" });
  Pessoa.belongsTo(Emprego, { foreignKey: "emprego_id" });
  Pessoa.belongsTo(Residencia, { foreignKey: "residencia_id" });
  Pessoa.hasOne(Conjugue, { foreignKey: "pessoa_id" });
  Pessoa.hasOne(Solidario, { foreignKey: "pessoa_id" });
  Pessoa.hasOne(Conta, { foreignKey: "pessoa_id" });

  Proponente.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Devedor.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  Reclamacao.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  Reembolso.belongsTo(Proponente, {
    foreignKey: "proponente_id",
    onDelete: "CASCADE",
  });

  Residencia.hasMany(Pessoa, { foreignKey: "residencia_id" });

  Saque.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  Solidario.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Solidario.belongsTo(Pessoa, { foreignKey: "pessoa_id", onDelete: "CASCADE" });

  // Associações complexas
  Emprestimo.hasMany(EmprestimoSolidario, { foreignKey: "emprestimo_id" });
  EmprestimoSolidario.belongsTo(Emprestimo, { foreignKey: "emprestimo_id" });

  Solidario.hasMany(EmprestimoSolidario, { foreignKey: "solidario_id" });
  EmprestimoSolidario.belongsTo(Solidario, { foreignKey: "solidario_id" });
  
  Solidario.hasMany(CreditoSolidario, { foreignKey: "solidario_id" });
  CreditoSolidario.belongsTo(Solidario, { foreignKey: "solidario_id" });


  Investidor.hasMany(Diversificacao, {
    foreignKey: "investidor_id",
    onDelete: "CASCADE",
  });

  Diversificacao.belongsTo(Investidor, {
    foreignKey: "investidor_id",
    onDelete: "CASCADE",
  });

  
  Investidor.hasMany(Credora, {
    foreignKey: "investidor_id",
    onDelete: "CASCADE",
  });

  Credora.belongsTo(Investidor, {
    foreignKey: "investidor_id",
    onDelete: "CASCADE",
  });

  
  Investidor.hasMany(NegocearEmprestimo, {
    foreignKey: "investidor_id",
    onDelete: "CASCADE",
  });

  NegocearEmprestimo.belongsTo(Investidor, {
    foreignKey: "investidor_id",
    onDelete: "CASCADE",
  });

  Emprestimo.hasMany(Diversificacao, {
    foreignKey: "emprestimo_id",
    onDelete: "CASCADE",
  });

  
  Diversificacao.belongsTo(Emprestimo, {
    foreignKey: "emprestimo_id",
    onDelete: "CASCADE",
  });

  Credito.hasMany(Credora, {
    foreignKey: "credito_id",
    onDelete: "CASCADE",
  });

  
  Credora.belongsTo(Credito, {
    foreignKey: "credito_id",
    onDelete: "CASCADE",
  });


  Emprestimo.hasMany(NegocearEmprestimo, {
    foreignKey: "emprestimo_id",
    onDelete: "CASCADE",
  });

  
  NegocearEmprestimo.belongsTo(Emprestimo, {
    foreignKey: "emprestimo_id",
    onDelete: "CASCADE",
  });

  ContaVinculada.belongsTo(Proponente, {
    foreignKey: "proponente_id",
    onDelete: "CASCADE",
  });

  Proponente.hasMany(ContaVinculada, {
    foreignKey: "proponente_id",
    onDelete: "CASCADE",
  });
  
  
  
  DebitoVinculado.belongsTo(Devedor, {
    foreignKey: "devedor_id",
    onDelete: "CASCADE",
  });

  Devedor.hasMany(DebitoVinculado, {
    foreignKey: "devedor_id",
    onDelete: "CASCADE",
  });
  
  Credito.hasMany(CreditoSolidario, { foreignKey: "credito_id" });
  CreditoSolidario.belongsTo(Credito, { foreignKey: "credito_id" });

}
