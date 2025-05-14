// models/Deposito.ts
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
import { User } from "./User";

@Table({ tableName: "depositos" })
export class Deposito extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.BIGINT)
  valor!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  pendencia!: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
