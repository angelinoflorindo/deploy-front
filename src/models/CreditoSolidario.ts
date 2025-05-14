// models/CreditoSolidario.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Credito } from "./Credito";
import { Solidario } from "./Solidario";

@Table({ tableName: "creditos_solidarios" })
export class CreditoSolidario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Credito)
  @Column(DataType.INTEGER)
  credito_id!: number;

  @ForeignKey(() => Solidario)
  @Column(DataType.INTEGER)
  solidario_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
