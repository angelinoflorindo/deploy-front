import Credora from "@/models/Credora";
import Diversificacao from "@/models/Diversificacao";
import Investidor from "@/models/Investidor";
import NegocearEmprestimo from "@/models/NegocearEmprestimo";

export function setInvestidorAssociation(): void {
  Investidor.hasMany(Diversificacao, {
    as: "Diversificacaos",
    foreignKey: "investidor_id",
  });
  Investidor.hasMany(NegocearEmprestimo, {
    as: "NegocearEmprestimos",
    foreignKey: "investidor_id",
  });

  Investidor.hasMany(Credora, {
    as: "Credoras",
    foreignKey: "investidor_id",
  });

  Diversificacao.belongsTo(Investidor, {
    as: "Investidor",
    foreignKey: "investidor_id",
  });
  NegocearEmprestimo.belongsTo(Investidor, {
    as: "Investidor",
    foreignKey: "investidor_id",
  });

  Credora.belongsTo(Investidor, {
    as: "Investidor",
    foreignKey: "investidor_id",
  });
}
