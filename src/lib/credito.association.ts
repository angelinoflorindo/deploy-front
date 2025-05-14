import { Credito } from "@/models/Credito";
import { CreditoSolidario } from "@/models/CreditoSolidario";
import { Devedor } from "@/models/Devedor";
import { Solidario } from "@/models/Solidario";



export function setCreditoAssociation(){
  Credito.belongsTo(Devedor, { foreignKey: "devedor_id", onDelete: "CASCADE" });
  Credito.hasMany(CreditoSolidario, { foreignKey: "credito_id" });

  CreditoSolidario.belongsTo(Credito, { foreignKey: "credito_id" });
  Devedor.hasMany(Credito, { foreignKey: "devedor_id", onDelete: "CASCADE" });

  Solidario.hasMany(CreditoSolidario, { foreignKey: "solidario_id" });
  CreditoSolidario.belongsTo(Solidario, { foreignKey: "solidario_id" });

}