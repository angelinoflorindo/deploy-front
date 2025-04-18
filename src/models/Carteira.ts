// models/Carteira.ts
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

@Table({ tableName: "carteiras" })
export default class Carteira extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.BIGINT)
  saldo!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.BIGINT, unique: true })
  numero!: number;

  @Column({ type: DataType.INTEGER, unique: true })
  codigo!: number;

  @Column({ type: DataType.INTEGER, unique: true })
  user_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
