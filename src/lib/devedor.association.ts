import { Devedor } from "@/models/Devedor";
import Pagamento from "@/models/Pagamento";

export function setDevedorAssociation(): void {
  Devedor.hasMany(Pagamento, { as: "Pagamentos", foreignKey: "devedor_id" });



  Pagamento.belongsTo(Devedor, {
    as: "Devedor",
    foreignKey: "devedor_id",
  });
}
