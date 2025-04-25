// models/Emprestimo.ts
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
import Proponente from "./Proponente";

export enum ProgressoEmprestimo {
  PENDENTE = "PENDENTE",
  CONCLUIDO = "CONCLUIDO",
  CANCELADO = "CANCELADO",
}

@Table({ tableName: "emprestimos" })
export default class Emprestimo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  valor!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  juro!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  prestacao!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  prazo!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  pendencia!: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(ProgressoEmprestimo)),
    allowNull: false,
    defaultValue: "PENDENTE",
  })
  progresso!: ProgressoEmprestimo;

  @ForeignKey(() => Proponente)
  @Column({ type: DataType.INTEGER, allowNull: false })
  proponente_id!: number;
  

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
