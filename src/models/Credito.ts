// models/Credito.ts
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

export enum TipoCredito {
  DECIMA = "30_DIAS",
  MESNSAL = "60_DIAS",
  VIGESIMA ="90_DIAS",
}
export enum TipoProgresso {
  PENDENTE ="PENDENTE",
  CONCLUIDO ="CONCLUIDO",
  CANCELADO = "CANCELADO",
}

@Table({ tableName: "creditos" })
export class Credito extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.ENUM(...Object.values(TipoCredito)),
    allowNull: false,
  })
  tipo_credito!: TipoCredito;

  @Column(DataType.BIGINT)
  valor!: number;

  @Column(DataType.INTEGER)
  prestacao!: number;

  @Column(DataType.INTEGER)
  juro!: number;

  @Column(DataType.DATE)
  prazo!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  pendencia!: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(TipoProgresso)),
    allowNull: false,
    defaultValue: "PENDENTE",
  })
  progresso!: TipoCredito;

  @ForeignKey(() => Devedor)
  @Column(DataType.INTEGER)
  devedor_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
