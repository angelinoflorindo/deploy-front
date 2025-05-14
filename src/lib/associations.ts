
// associations.ts

/*


export function setupAssociations() {
 
  User.hasOne(Investidor, { foreignKey: "user_id" });
  User.hasMany(Reclamacao, { foreignKey: "user_id" });
  User.hasOne(Proponente, { foreignKey: "user_id" });
  User.hasMany(Saque, { foreignKey: "user_id" });
  User.hasOne(Carteira, { foreignKey: "user_id" });

  //Carteira.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  // Relacionamento

  // Relacionamento

  // Associações

  // Relacionamento
  Devedor.hasMany(Movel, { foreignKey: "devedor_id", onDelete: "CASCADE" });
  Devedor.hasMany(Pagamento, { foreignKey: "devedor_id", onDelete: "CASCADE" });

  // Relacionamento

  // Define o relacionamento

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
 // 

  Proponente.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
  Devedor.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  Reclamacao.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  Reembolso.belongsTo(Proponente, {
    foreignKey: "proponente_id",
    onDelete: "CASCADE",
  });


  Saque.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });


  // Associações complexas
  Emprestimo.hasMany(EmprestimoSolidario, { foreignKey: "emprestimo_id" });
  EmprestimoSolidario.belongsTo(Emprestimo, { foreignKey: "emprestimo_id" });

  Solidario.hasMany(EmprestimoSolidario, { foreignKey: "solidario_id" });
  EmprestimoSolidario.belongsTo(Solidario, { foreignKey: "solidario_id" });
  


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
  
  

  
}
*/