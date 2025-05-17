import { Credito } from "@/models/Credito";
import { CreditoSolidario } from "@/models/CreditoSolidario";
import Credora from "@/models/Credora";
import { Devedor } from "@/models/Devedor";
import { Solidario } from "@/models/Solidario";

export function setCreditoAssociation() {
  Credito.belongsTo(Devedor, { as:"Devedor", foreignKey: "devedor_id",  });
  Credito.hasMany(CreditoSolidario, {as:"CreditoSolidarios", foreignKey: "credito_id" });
  Credito.hasMany(Credora, {
    as: "Credoras",
    foreignKey: "credito_id",
  });
  CreditoSolidario.belongsTo(Credito, { as:"Credito", foreignKey: "credito_id" });
  Devedor.hasMany(Credito, {as:"Credito", foreignKey: "devedor_id",  });

  Solidario.hasMany(CreditoSolidario, {as:"CreditoSolidarios", foreignKey: "solidario_id" });
  CreditoSolidario.belongsTo(Solidario, {as:"Solidario", foreignKey: "solidario_id" });
  Credora.belongsTo(Credito, {
    as: "Credito",
    foreignKey: "credito_id",
  });
}
