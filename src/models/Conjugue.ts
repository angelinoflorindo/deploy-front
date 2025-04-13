// models/Conjugue.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'conjugues' })
export default class Conjugue extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  nome_completo!: string;

  @Column(DataType.INTEGER)
  dependentes!: number;

  @Column(DataType.STRING)
  nivel_instrucao!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column(DataType.DATE)
  data_nascimento!: Date;

  @Column({ type: DataType.INTEGER, unique: true })
  pessoa_id!: number;
}
