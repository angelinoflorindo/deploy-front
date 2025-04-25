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
} from "sequelize-typescript";

export enum TipoCredito {
  PENDENTE = "30_DIAS",
  CONCLUIDO = "60_DIAS",
  CANCELADO = "90_DIAS",
}

@Table({ tableName: "creditos" })
export default class Credito extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.ENUM(...Object.values(TipoCredito)),
    allowNull: false,
  })
  tipo!: TipoCredito;

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
    type: DataType.ENUM(...Object.values(TipoCredito)),
    allowNull: false,
    defaultValue: "PENDENTE",
  })
  progresso!: TipoCredito;

  @Column(DataType.INTEGER)
  devedor_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
