// models/EmprestimoSolidario.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import Emprestimo from "./Emprestimo";
import Solidario from "./Solidario";

@Table({ tableName: "emprestimos_solidarios" })
export default class EmprestimoSolidario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Emprestimo)
  @Column({ type: DataType.INTEGER, allowNull: false })
  emprestimo_id!: number;

  @ForeignKey(() => Solidario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  solidario_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
