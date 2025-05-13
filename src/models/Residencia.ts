// models/Residencia.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import Pessoa from "./Pessoa";

@Table({ tableName: "residencias" })
export default class Residencia extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.ENUM("PROPRIA", "RENDA"))
  tipo!: "PROPRIA" | "RENDA";

  @Column(DataType.DATE)
  data_inicio!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @HasMany(() => Pessoa, { as: "Pessoa" })
  pessoa!: Pessoa;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
