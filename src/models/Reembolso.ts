// models/Reembolso.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import Proponente from './Proponente';

@Table({ tableName: 'reembolsos' })
export default class Reembolso extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  valor!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  prestacao!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  detalhe!: string;

  @ForeignKey(() => Proponente)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  proponente_id!: number;
}
