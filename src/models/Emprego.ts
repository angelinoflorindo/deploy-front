// models/Emprego.ts
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

@Table({ tableName: "empregos" })
export default class Emprego extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.DATE)
  data_inicio!: Date;

  @Column(DataType.ENUM("PUBLICO", "PRIVADO"))
  sector!: "PUBLICO" | "PRIVADO";

  @Column(DataType.STRING)
  cargo!: string;

  @Column(DataType.STRING)
  area!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @HasMany(()=>Pessoa, {as:"Pessoa"})
  pessoa!:Pessoa

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
