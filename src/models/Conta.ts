// models/Conta.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'contas' })
export default class Conta extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.INTEGER)
  salario!: number;

  @Column(DataType.STRING)
  iban!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column(DataType.INTEGER)
  pessoa_id!: number;
}
