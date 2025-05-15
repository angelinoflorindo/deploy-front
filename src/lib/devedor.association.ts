import { Devedor } from "@/models/Devedor";
import Movel from "@/models/Movel";
import Pagamento from "@/models/Pagamento";

export function setDevedorAssociation(): void {
  Devedor.hasMany(Movel, { as: "Movel", foreignKey: "devedor_id" });
  Devedor.hasMany(Pagamento, { as: "Pagamentos", foreignKey: "devedor_id" });

  Movel.belongsTo(Devedor, {
    as: "Devedor",
    foreignKey: "devedor_id",
  });

  Pagamento.belongsTo(Devedor, {
    as: "Devedor",
    foreignKey: "devedor_id",
  });
}
