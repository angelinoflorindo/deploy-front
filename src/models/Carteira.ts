// models/Carteira.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'carteiras' })
export default class Carteira extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.FLOAT)
  saldo!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.INTEGER, unique: true })
  numero!: number;

  @Column({ type: DataType.INTEGER, unique: true })
  codigo!: number;

  @Column({ type: DataType.INTEGER, unique: true })
  user_id!: number;
}
