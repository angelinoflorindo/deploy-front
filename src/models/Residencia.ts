// models/Residencia.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'residencias' })
export default class Residencia extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.ENUM('PROPRIA', 'RENDA'))
  tipo!: 'PROPRIA' | 'RENDA';

  @Column(DataType.DATE)
  data_inicio!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;
}
