import ContaVinculada from "@/models/ContaVinculada";
import Emprestimo from "@/models/Emprestimo";
import Movel from "@/models/Movel";
import Proponente from "@/models/Proponente";
import Reembolso from "@/models/Reembolso";

export function setProponenteAssociation(): void {
  Proponente.hasMany(Emprestimo, {
    as: "Emprestimos",
    foreignKey: "proponente_id",
  });
  Proponente.hasMany(Reembolso, {
    as: "Reembolsos",
    foreignKey: "proponente_id",
  });
  Proponente.hasMany(Movel, { as: "Movel", foreignKey: "proponente_id" });
  Proponente.hasMany(ContaVinculada, {
    as: "ContaVinculadas",
    foreignKey: "proponente_id",
  });

  Emprestimo.belongsTo(Proponente, {
    as: "Proponente",
    foreignKey: "proponente_id",
  });

  Reembolso.belongsTo(Proponente, {
    as: "Proponente",
    foreignKey: "proponente_id",
  });

  Movel.belongsTo(Proponente, {
    as: "Proponente",
    foreignKey: "proponente_id",
  });

  ContaVinculada.belongsTo(Proponente, {
    as: "Proponente",
    foreignKey: "proponente_id",
  });
}
