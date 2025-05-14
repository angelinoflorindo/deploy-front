// models/Investidor.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  Unique,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import {User} from "./User";

@Table({ tableName: "investidores" })
export default class Investidor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  maior_risco!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  maior_seguranca!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  saque_antecipado!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  fundo_protegido!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  partilhar_emprestimo!: boolean;

  @Unique
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
