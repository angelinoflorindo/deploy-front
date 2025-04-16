// models/Diversificacao.ts
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import Investidor from "./Investidor";
import Emprestimo from "./Emprestimo";

@Table({ tableName: "diversificacaos" })
export default class Diversificacao extends Model {
  @PrimaryKey
  @ForeignKey(() => Investidor)
  @Column(DataType.INTEGER)
  investidor_id!: number;

  @PrimaryKey
  @ForeignKey(() => Emprestimo)
  @Column(DataType.INTEGER)
  emprestimo_id!: number;

  @Column(DataType.INTEGER)
  taxa!: number;

  @Column(DataType.BOOLEAN)
  protencao!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
