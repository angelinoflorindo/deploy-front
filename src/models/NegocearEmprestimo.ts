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

@Table({ tableName: "negocear_emprestimos" })
export default class NegocearEmprestimos extends Model {
  @PrimaryKey
  @ForeignKey(() => Investidor)
  @Column(DataType.INTEGER)
  investidor_id!: number;

  @PrimaryKey
  @ForeignKey(() => Emprestimo)
  @Column(DataType.INTEGER)
  emprestimo_id!: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  valor!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  juro!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  prestacao!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  prazo!: Date;

  
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  pendencia!: boolean;

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
