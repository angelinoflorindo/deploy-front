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

@Table({ tableName: "creditos" })
export default class Credito extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  tipo!: string;

  @Column(DataType.FLOAT)
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

  @Column(DataType.STRING)
  progresso!: string;

  @Column(DataType.INTEGER)
  devedor_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
