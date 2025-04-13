// models/Credito.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'creditos' })
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
  termino!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column(DataType.BOOLEAN)
  pendencia!: boolean;

  @Column(DataType.STRING)
  progresso!: string;

  @Column(DataType.INTEGER)
  devedor_id!: number;
}
