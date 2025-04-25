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
import Credito from "./Credito";

@Table({ tableName: "credoras" })
export default class Credora extends Model {
  @PrimaryKey
  @ForeignKey(() => Investidor)
  @Column(DataType.INTEGER)
  investidor_id!: number;

  @PrimaryKey
  @ForeignKey(() => Credito)
  @Column(DataType.INTEGER)
  credito_id!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  corrente!: boolean; // Trocar para protecao

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
