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
} from "sequelize-typescript";

@Table({ tableName: "conta_vinculadas" })
export default class ContaVinculada extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.INTEGER)
  proponente_id!: number;

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
