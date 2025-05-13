// models/User.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from "sequelize-typescript";
import Papel from "./Papel";
 
@Table({
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @Column(DataType.STRING)
  primeiro_nome!: string;

  @Column(DataType.STRING)
  segundo_nome!: string;

  @Unique
  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.ENUM("MASCULINO", "FEMININO"))
  genero!: "MASCULINO" | "FEMININO";

  @Unique
  @Column(DataType.STRING)
  bilhete!: string;

  @Unique
  @Column(DataType.STRING)
  telemovel!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;

  @HasOne(()=>Papel,  {as:"papel"})
  papel!:Papel
}
