// models/Pessoa.ts
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
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import User from "./User";
import Emprego from "./Emprego";
import Residencia from "./Residencia";
import Conjugue from "./Conjugue";
import Conta from "./Conta";

@Table({ tableName: "pessoas" })
export default class Pessoa extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.ENUM("SOLTEIRO", "CASADO"))
  estado_civil!: "SOLTEIRO" | "CASADO";

  @Column(DataType.STRING)
  provincia!: string;

  @Column(DataType.STRING)
  municipio!: string;

  @Column(DataType.STRING)
  profissao!: string;

  @Column(DataType.STRING)
  nivel_instrucao!: string;

  @Column(DataType.DATE)
  data_nascimento!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @ForeignKey(() => Emprego)
  @Column(DataType.INTEGER)
  emprego_id!: number;

  @ForeignKey(() => Residencia)
  @Column(DataType.INTEGER)
  residencia_id!: number;

  @BelongsTo(()=>User)
  user!:User

  @BelongsTo(()=>Emprego)
  emprego!:Emprego

  @BelongsTo(()=>Residencia, {as:"Residencia"})
  residencia!:Residencia

  @HasOne(()=> Conjugue, {as:'Conjugue'})
  conjugue!:Conjugue

  @HasOne(()=>Conta, {as:"Conta"})
  conta!:Conta

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
