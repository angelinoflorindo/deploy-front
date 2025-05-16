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
  ForeignKey,
} from "sequelize-typescript";
import { Devedor } from "./Devedor";

@Table({ tableName: "debitos_vinculado" })
export  class DebitoVinculado extends Model{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  
  @ForeignKey(() => Devedor)
  @Column(DataType.INTEGER)
  devedor_id!: number;

  @Column(DataType.BIGINT)
  valor_retido!: number;

  @Column(DataType.DATE)
  data_desbloqueio!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
