// models/Deposito.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'depositos' })
export default class Deposito extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.FLOAT)
  valor!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true})
  estado!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  pendencia!: boolean;

  @Column(DataType.INTEGER)
  user_id!: number;
}
