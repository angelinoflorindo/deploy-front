// models/Emprego.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'empregos' })
export default class Emprego extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.DATE)
  data_inicio!: Date;

  @Column(DataType.ENUM('PUBLICO', 'PRIVADO'))
  sector!: 'PUBLICO' | 'PRIVADO';

  @Column(DataType.STRING)
  cargo!: string;

  @Column(DataType.STRING)
  area!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;
}
