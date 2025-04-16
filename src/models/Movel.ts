// models/Movel.ts
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

@Table({ tableName: "moveis" })
export default class Movel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  nome!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  valor!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  estado!: string;

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
