// models/Conta.ts
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
import { Pessoa } from "./Pessoa";

@Table({ tableName: "contas" })
export  class Conta extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.BIGINT)
  salario!: number;

  @Column(DataType.STRING)
  iban!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  
  @ForeignKey(() => Pessoa)
  @Column(DataType.INTEGER)
  pessoa_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
