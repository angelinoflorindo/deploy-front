import { Credito } from "@/models/Credito";
import Credora from "@/models/Credora";
import Diversificacao from "@/models/Diversificacao";
import Emprestimo from "@/models/Emprestimo";
import EmprestimoSolidario from "@/models/EmprestimoSolidario";
import NegocearEmprestimo from "@/models/NegocearEmprestimo";
import { Solidario } from "@/models/Solidario";

export function setDinheiroAssociation(): void {
  Emprestimo.hasMany(EmprestimoSolidario, {
    as: "EmprestimoSolidarios",
    foreignKey: "emprestimo_id",
  });
  Emprestimo.hasMany(NegocearEmprestimo, {
    as: "NegocearEmprestimos",
    foreignKey: "emprestimo_id",
  });
  Emprestimo.hasMany(Diversificacao, {
    as: "Diversificacaos",
    foreignKey: "emprestimo_id",
  });

  Solidario.hasMany(EmprestimoSolidario, {
    as: "EmprestimoSolidarios",
    foreignKey: "solidario_id",
  });
  Credito.hasMany(Credora, {
    as: "Credoras",
    foreignKey: "credito_id",
  });

  EmprestimoSolidario.belongsTo(Emprestimo, {
    as: "Emprestimo",
    foreignKey: "emprestimo_id",
  });
  EmprestimoSolidario.belongsTo(Solidario, {
    as: "Solidario",
    foreignKey: "solidario_id",
  });
  NegocearEmprestimo.belongsTo(Emprestimo, {
    as: "Emprestimo",
    foreignKey: "emprestimo_id",
  });
  Diversificacao.belongsTo(Emprestimo, {
    as: "Emprestimo",
    foreignKey: "emprestimo_id",
  });

  Credora.belongsTo(Credito, {
    as: "Credito",
    foreignKey: "credito_id",
  });
}
